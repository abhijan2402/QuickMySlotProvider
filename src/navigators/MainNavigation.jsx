import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {AuthContext} from '../Backend/AuthContent'; // 👈 confirm this path!
import RootNavigation from './RootNavigation';
import AuthStack from './AuthNavigation';
import {ToastProvider, useToast} from '../Constants/ToastContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const isAuth = useSelector(store => store.isAuth);  

  if (!auth) {
    console.error('AuthContext not found');
    return null;
  }

  const {token, loading} = auth;
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ToastProvider>
        {!isAuth ? <RootNavigation /> : <AuthStack />}
      </ToastProvider>
    </SafeAreaView>
  );
};

export default MainNavigation;
