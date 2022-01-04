import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';

export const useDebounce = (obj: any = null, wait: number = 400) => {
  const [state, setState] = useState(obj);

  const debounceCb = useCallback(
    debounce((_prop: string) => {
      console.log('updating search');
      setState(_prop);
    }, wait),
    [],
  );

  const setDebouncedState = (_val: any) => {
    debounceCb(_val);
  };

  return [state, setDebouncedState];
};
