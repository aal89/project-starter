import { useEffect, useState } from 'react';

type LocalStorageStateReturnType = [string, (value: string) => void];

export const useStorageState = (
  key: string,
  defaultValue: string = '',
  storage: Storage = localStorage,
): LocalStorageStateReturnType => {
  const [innerState, setInnerState] = useState(defaultValue);
  const localValue = storage.getItem(key);

  const setValue = (value: string) => {
    storage.setItem(key, value);
    setInnerState(value);
  };

  useEffect(() => {
    if (innerState !== localValue) {
      setValue(localValue ?? '');
    }
  }, [localValue]);

  return [innerState, setValue];
};
