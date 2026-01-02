import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/appNavigation';
import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';

import { PersistGate } from 'redux-persist/integration/react';

// export default function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppNavigator />
//     </SafeAreaProvider>
//   );
// }

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
