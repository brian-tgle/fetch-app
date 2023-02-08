import { useCallback, useState } from 'react'

function useToggle(
  defaultValue?: boolean,
) {
  const [isExpanded, setIsExpanded] = useState<boolean>(!!defaultValue)

  const toggle = useCallback(() => setIsExpanded(x => !x), [])

  return {
    isExpanded,
    toggle,
    setIsExpanded
  }
}

export default useToggle
