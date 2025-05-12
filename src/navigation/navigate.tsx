// LIB
import {createStackNavigator} from '@react-navigation/stack';

// IMPORT
import HomeScreen from '@/screens/Home/HomeScreen';
import LoginScreen from '@/screens/Auth/LoginScreen';

const Stack = createStackNavigator();

const Navigate = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default Navigate;
