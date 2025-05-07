// LIB
import {createStackNavigator} from '@react-navigation/stack';

// IMPORT
import HomeScreen from '../screens/Home/HomeScreen';

const Stack = createStackNavigator();

const Navigate = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default Navigate;