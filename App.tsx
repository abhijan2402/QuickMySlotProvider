import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PermissionsAndroid, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import MainNavigation from './src/navigators/MainNavigation';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';
import { AuthProvider } from './src/Backend/AuthContent';
import 'react-native-get-random-values';
import SplashScreen from 'react-native-splash-screen';
import { fcmService } from './src/Notification/FMCService';
import { localNotificationService } from './src/Notification/LocalNotificationService';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';


const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const requestNotificationPermissions = async () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      }
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    }
  };

  useEffect(() => {
    setTimeout(() => {
      requestNotificationPermissions();
      requestUserPermission();
      fcmService.register();
      localNotificationService.cancelAllLocalNotifications();
      localNotificationService.clearNotificationBadge();
      return () => {
        localNotificationService.unRegister();
      };
    }, 2000);
  }, []);
  return (
    <Provider store={store}>
      <AuthProvider>
        <View style={styles.safeArea}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </View>
      </AuthProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
