import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/appNavigation';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';

import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
