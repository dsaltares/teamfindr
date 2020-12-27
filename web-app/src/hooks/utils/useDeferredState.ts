import { useState, useEffect, useCallback } from 'react';

const useDeferredState = <T>(
  defaultValue: T,
  data: T,
  isLoading: boolean
): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(defaultValue);
  const [initialized, setInitialized] = useState(false);
  const wrappedSetValue = useCallback(
    (newValue: T) => {
      setInitialized(true);
      return setValue(newValue);
    },
    [setValue, setInitialized]
  );

  useEffect(() => {
    if (!initialized && !isLoading) {
      wrappedSetValue(data);
    }
  }, [wrappedSetValue, data, isLoading, initialized]);

  return [value, wrappedSetValue];
};

export default useDeferredState;
