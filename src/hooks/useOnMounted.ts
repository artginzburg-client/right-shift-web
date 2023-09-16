import { useEffect, useState } from 'react';

export function useOnMounted(callback: CallableFunction) {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    if (isMounted) {
      callback();
    } else {
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);
}
