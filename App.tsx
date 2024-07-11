import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from './src/navigation';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer />
      <Toast />
    </PaperProvider>
  );
}

export default App;
