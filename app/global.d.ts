import type { RootState } from 'app/store/createRootReducer';
import type Config from '../config/Config';

declare global {
  const __DEV__: boolean;
  const __CLIENT__: boolean;

  interface Window {
    __CONFIG__?: Config;
    __PRELOADED_STATE__?: RootState | Record<string, never>;
    __IS_SSR__?: boolean;
  }
}

export {};
