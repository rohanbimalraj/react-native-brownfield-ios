import { useEffect } from 'react';
import NativeUserModule from '../../specs/NativeUserModule';

export function useUserNativeEvent<T = any>(name: string, handler: (data: T) => void) {
  useEffect(() => {
    const subscription = NativeUserModule?.onNativeEvent((event) => {
      if (event.name === name) {
        handler(event.data as T);
      }
    });
    return () => {
      subscription?.remove();
    };
  }, [name]);
}
