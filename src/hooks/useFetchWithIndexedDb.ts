import { useCallback, useEffect, useReducer, useRef } from 'react'
import useDb from './useDb'

interface State<T> {
  data?: T
  error?: Error,
  isLoading?: boolean;
}

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

function useFetchWithIndexedDb<T = unknown>(url: string, options?: RequestInit): State<T> {
  const { cacheDb } = useDb();

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    isLoading: false
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState }
      case 'fetched':
        return { ...initialState, data: action.payload }
      case 'error':
        return { ...initialState, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  const fetchData = useCallback(async () => {
    dispatch({ type: 'loading' })

    // If a cache exists for this url, return it
    const cacheData = await cacheDb.getItem(url) as T;
    if (cacheData) {
      dispatch({ type: 'fetched', payload: cacheData })
      return
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = (await response.json()) as T
      await cacheDb.setItem(url, data);
      if (cancelRequest.current) return

      dispatch({ type: 'fetched', payload: data })
    } catch (error) {
      if (cancelRequest.current) return

      dispatch({ type: 'error', payload: error as Error })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    // Do nothing if the url is not given
    if (url) {
      cancelRequest.current = false
      fetchData();
    }

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true
    }
  }, [fetchData, url])

  return state
}

export default useFetchWithIndexedDb