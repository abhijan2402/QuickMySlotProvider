import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Account from '../Screens/Private/Account/Account';
import {COLOR} from '../Constants/Colors';
import MainHome from '../Screens/Private/Home/MainHome';
import Notification from '../Screens/Private/Home/Notification';
import VendorAppointments from '../Screens/Private/AppointmentSection/Appointment';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const insets = useSafeAreaInsets();

  const icons = {
    Dashboard: 'https://cdn-icons-png.flaticon.com/128/1828/1828765.png',
    Appointment: 'https://cdn-icons-png.flaticon.com/128/1250/1250680.png',
    Notification: 'https://cdn-icons-png.flaticon.com/128/10502/10502974.png',
    // [strings.analytics]:
    //   'https://cdn-icons-png.flaticon.com/128/2099/2099058.png',
    Profile: 'https://cdn-icons-png.flaticon.com/128/9308/9308008.png',
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: COLOR.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
        tabBarStyle: {
          paddingVertical: 8,
          height: 60 , // Add safe area bottom inset for Android/iOS
        },
        tabBarIcon: ({focused}) => {
          const iconUri = icons[route.name];

          return (
            <Image
              source={{uri: iconUri}}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLOR.primary : 'gray',
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarLabel: ({color}) => {
          let label = route.name;
          if (route.name === 'MyBids') label = 'My Bids'; // Fix label spacing

          return (
            <Text
              style={{color, fontSize: 12, marginTop: 4, textAlign: 'center'}}>
              {label}
            </Text>
          );
        },
      })}>
      <Tab.Screen name={'Dashboard'} component={MainHome} />
      <Tab.Screen name={'Appointment'} component={VendorAppointments} />

      {/* <Tab.Screen name={'Properties'} component={Properties} />
      <Tab.Screen name={'Wishlist'} component={Wishlist} /> */}
      <Tab.Screen name={'Notification'} component={Notification} />
      <Tab.Screen name={'Profile'} component={Account} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
