import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import MainNavigation from './src/navigators/MainNavigation';
import {AuthProvider} from './src/Backend/AuthContent';

const App = () => {
  return (
    <AuthProvider>
      <View style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </View>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
