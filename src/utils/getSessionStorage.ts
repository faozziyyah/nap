// utils/getSessionStorageItem.ts
export const getSessionStorageItem = (key: string): string | null => {
  return sessionStorage.getItem(key);
};
