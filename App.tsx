import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import MainNavigation from './src/navigators/MainNavigation';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';
import { AuthProvider } from './src/Backend/AuthContent';
import AddService from './src/Screens/Private/Home/AddService';
import AddBank from './src/Screens/Private/Account/AddBank';

const App = () => {
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
