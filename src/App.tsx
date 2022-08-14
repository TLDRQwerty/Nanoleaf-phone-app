import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import { useDeviceContext } from 'twrnc';
import { Platform, AppState } from 'react-native';
import Navigations from '~/Navigations';
import tw from '~/tailwind';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  useDeviceContext(tw);
  React.useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });

    const subscription = AppState.addEventListener('change', (status) => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    });

    return () => {
      subscription.remove();
    };
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Navigations />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
