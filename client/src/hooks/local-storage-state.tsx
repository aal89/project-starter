import { useEffect, useState } from 'react';

type LocalStorageStateReturnType = [string, (value: string) => void];

export const useLocalStorageState = (
  key: string,
  defaultValue: string = '',
): LocalStorageStateReturnType => {
  const [innerState, setInnerState] = useState(defaultValue);
  const localValue = localStorage.getItem(key);

  const setValue = (value: string) => {
    localStorage.setItem(key, value);
    setInnerState(value);
  };

  useEffect(() => {
    if (innerState !== localValue) {
      setValue(localValue ?? '');
    }
  }, [localValue]);

  return [innerState, setValue];
};
