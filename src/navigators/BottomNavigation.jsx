import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Account from '../Screens/Private/Account/Account';
import {COLOR} from '../Constants/Colors';
import MainHome from '../Screens/Private/Home/MainHome';
import Notification from '../Screens/Private/Home/Notification';
import VendorAppointments from '../Screens/Private/AppointmentSection/Appointment';
import {Font} from '../Constants/Font';
import {images} from '../Components/UI/images';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const insets = useSafeAreaInsets();
  const image = {
    Dashboard: images.dashboard,
    Appointment: images.document,
    Notification: images.notification,
    Profile: images.user,
  };

  const imageFocused = {
    Dashboard: images.dashboardFocused,
    Appointment: images.documentFocused,
    Notification: images.notificationFocused,
    Profile: images.userFocused,
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
          height: 60, // Add safe area bottom inset for Android/iOS
        },
        tabBarIcon: ({focused}) => {
          const imageOutline = image[route.name];
          const imageFocus = imageFocused[route.name];

          return (
            <Image
              source={focused ? imageFocus : imageOutline}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? COLOR.primary : 'gray',
                marginTop:5
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
              style={{
                color,
                fontSize: 10,
                marginTop: 8,
                textAlign: 'center',
                fontFamily: Font.medium,
              }}>
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
