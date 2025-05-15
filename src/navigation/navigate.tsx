// LIB
import {createStackNavigator} from '@react-navigation/stack';

// IMPORT
import HomeScreen from '@/screens/Home/HomeScreen';
import LoginScreen from '@/screens/Auth/LoginScreen';
import SplashScreen from '@/screens/Splash/SplashScreen';

const Stack = createStackNavigator();

const Navigate = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default Navigate;
