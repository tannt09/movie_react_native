// LIB
import {createStackNavigator} from '@react-navigation/stack';

// IMPORT
import LoginScreen from '@/screens/Auth/LoginScreen';
import SplashScreen from '@/screens/Splash/SplashScreen';
import BottomTabs from '@/screens/BottomNavigation/BottomNavigation';
import WellcomeScreen from '@/screens/Wellcome/WellcomeScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import ExploreScreen from '@/screens/Explore/ExploreScreen';
import MyListScreen from '@/screens/MyList/HomeScreen';
import DownloadScreen from '@/screens/Downloads/DownloadScreen';
import ProfileScreen from '@/screens/Profile/ProfileScreen';

const Stack = createStackNavigator();

const Navigate = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WellcomeScreen" component={WellcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="MyListScreen" component={MyListScreen} />
      <Stack.Screen name="DownloadScreen" component={DownloadScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Navigate;
