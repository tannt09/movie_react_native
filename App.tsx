// LIB
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// IMPORT
import {navigationRef} from './src/navigation/navigationService';
import Navigate from './src/navigation/navigate';

function App(): React.JSX.Element {
  const handleStateChange = (state: Readonly<NavigationState> | undefined) => {
    if (!state) {
      return;
    }
    const currentScreen = state.routes[state.index]?.name;
    console.log(
      '================Current screen================',
      currentScreen,
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={handleStateChange}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <Navigate />
        </GestureHandlerRootView>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
