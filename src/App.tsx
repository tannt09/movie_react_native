// LIB
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';

// IMPORT
import {navigationRef} from './navigation/navigationService';
import Navigate from './navigation/navigate';
import store from './redux/store';

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
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}
          onStateChange={handleStateChange}>
          <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <Navigate />
          </GestureHandlerRootView>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
