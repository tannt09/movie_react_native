import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={'transparent'}/>
      
    </GestureHandlerRootView>
  );
}

export default App;
