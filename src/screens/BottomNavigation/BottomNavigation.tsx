// LIB
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// IMPORT
import HomeScreen from '../Home/HomeScreen';
import ExploreScreen from '../Explore/ExploreScreen';
import MyListScreen from '../MyList/HomeScreen';
import DownloadScreen from '../Downloads/DownloadScreen';
import ProfileScreen from '../Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = 'home';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Settings') iconName = 'settings';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="My List" component={MyListScreen} />
      <Tab.Screen name="Download" component={DownloadScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
