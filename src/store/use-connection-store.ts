import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export enum INTEGRATIONS {
  NANOLEAF = 'nanoleaf',
  PHILIPS = 'philips',
}
interface Integration {
  ip: string | null;
  authToken: string | null;
}

export type Integrations<K> = {
  [key in INTEGRATIONS]: K;
};

interface State extends Integrations<Integration> {
  setPhilips: (philips: Integrations<Integration>['philips']) => void;
  setNanoleaf: (nanoleaf: Integrations<Integration>['nanoleaf']) => void;
}

const useConnectionStore = create<State>()(
  persist(
    (set) => ({
      philips: {
        ip: null,
        authToken: null,
      },
      nanoleaf: {
        ip: null,
        authToken: null,
      },
      setPhilips: (philips) => set((prev) => ({ ...prev, philips })),
      setNanoleaf: (nanoleaf) =>
        set((prev) => ({
          ...prev,
          nanoleaf,
        })),
    }),
    {
      name: 'connections',
      getStorage: () => AsyncStorage,
      serialize: (data) => base64.encode(JSON.stringify(data)),
      deserialize: (data) => JSON.parse(base64.decode(data)),
    },
  ),
);

export default useConnectionStore;
