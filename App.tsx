// LIB
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// IMPORT
import {navigationRef} from './src/navigation/navigationService';
import Navigate from './src/navigation/navigate';

function App(): React.JSX.Element {
  return (
    <NavigationContainer ref={navigationRef}>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Navigate />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default App;
