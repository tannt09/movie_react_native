// LIB
import {createStackNavigator} from '@react-navigation/stack';

// IMPORT
import LoginScreen from '@/screens/Auth/LoginScreen';
import SplashScreen from '@/screens/Splash/SplashScreen';
import BottomTabs from '@/screens/BottomNavigation/BottomNavigation';
import WellcomeScreen from '@/screens/Wellcome/WellcomeScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import ExploreScreen from '@/screens/Explore/ExploreScreen';
import MyListScreen from '@/screens/MyList/MyListScreen';
import DownloadScreen from '@/screens/Downloads/DownloadScreen';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import SeeAllScreen from '@/screens/SeeAll/SeeAllScreen';
import WatchTrailersScreen from '@/screens/WatchTrailers/WatchTrailersScreen';
import PaymentScreen from '@/screens/Payment/PaymentScreen';
import PaymentMethodScreen from '@/screens/Payment/PaymentMethodScreen';
import ReviewSumaryScreen from '@/screens/Payment/ReviewSumaryScreen';
import PaymentCard from '@/screens/Payment/PaymentCard';
import {StripeProvider} from '@stripe/stripe-react-native';
import MovieDetailsScreen from '@/screens/MovieDetails/MovieDetailScreen';

const Stack = createStackNavigator();

const Navigate = () => {
  return (
    <StripeProvider publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
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
        <Stack.Screen name="SeeAllScreen" component={SeeAllScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="PaymentCard" component={PaymentCard} />
        <Stack.Screen
          name="MovieDetailsScreen"
          component={MovieDetailsScreen}
        />
        <Stack.Screen
          name="ReviewSumaryScreen"
          component={ReviewSumaryScreen}
        />
        <Stack.Screen
          name="PaymentMethodScreen"
          component={PaymentMethodScreen}
        />
        <Stack.Screen
          name="WatchTrailersScreen"
          component={WatchTrailersScreen}
        />
      </Stack.Navigator>
    </StripeProvider>
  );
};

export default Navigate;
