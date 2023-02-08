import * as localForage from 'localforage';

const useDb = () => {
  const cacheDb = localForage.createInstance({
    name: 'fetch-app-db',
    storeName: 'cache',
    driver: localForage.INDEXEDDB
  });

  return {
    cacheDb
  }
};

export default useDb;
