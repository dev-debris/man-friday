interface StorageItem {
  key: string;
  value: any;
}

export const saveToLocalStorage = ({ key, value }: StorageItem) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
