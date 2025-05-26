// LIB
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// IMPORT
import HomeScreen from '../Home/HomeScreen';
import ExploreScreen from '../Explore/ExploreScreen';
import MyListScreen from '../MyList/HomeScreen';
import DownloadScreen from '../Downloads/DownloadScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import HomeIcon from '@assets/icons/ic_tab_home.svg';
import SelectedHomeIcon from '@assets/icons/ic_tab_selected_home.svg';
import ExploreIcon from '@assets/icons/ic_tab_explore.svg';
import SelectedExploreIcon from '@assets/icons/ic_tab_selected_explore.svg';
import MyListIcon from '@assets/icons/ic_tab_my_list.svg';
import SelectedMyListIcon from '@assets/icons/ic_tab_selected_my_list.svg';
import DownloadIcon from '@assets/icons/ic_tab_download.svg';
import SelectedDownloadIcon from '@assets/icons/ic_tab_selected_download.svg';
import ProfileIcon from '@assets/icons/ic_tab_profile.svg';
import SelectedProfileIcon from '@assets/icons/ic_tab_selected_profile.svg';
import { COLORS } from '@constants/colors';

const Tab = createBottomTabNavigator();

type TabRouteName = 'Home' | 'Explore' | 'My List' | 'Download' | 'Profile';

const iconMap: Record<
  TabRouteName,
  {active: React.ReactNode; inactive: React.ReactNode}
> = {
  Home: {
    active: <SelectedHomeIcon />,
    inactive: <HomeIcon />,
  },
  Explore: {
    active: <SelectedExploreIcon />,
    inactive: <ExploreIcon />,
  },
  'My List': {
    active: <SelectedMyListIcon />,
    inactive: <MyListIcon />,
  },
  Download: {
    active: <SelectedDownloadIcon />,
    inactive: <DownloadIcon />,
  },
  Profile: {
    active: <SelectedProfileIcon />,
    inactive: <ProfileIcon />,
  },
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size, focused}) => {
          const iconName = focused
            ? iconMap[route.name as TabRouteName].active
            : iconMap[route.name as TabRouteName].inactive;
          return iconName;
        },
        tabBarActiveTintColor: COLORS.RED,
        tabBarInactiveTintColor: COLORS.GRAY,
        headerShown: false
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
