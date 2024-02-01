import React, { useEffect } from 'react';
import {  StyleSheet, SafeAreaView } from 'react-native';
import {StatusBar} from "react-native"
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppNavigator from './AppNavigator';

import { NavigationContainer } from '@react-navigation/native';

import { getUserFromStorage } from './features/auth/authSlice';

export default function App() {
  useEffect(() => {
    // Dispatch the getUserFromStorage action to check for a token during app initialization

    store.dispatch(getUserFromStorage());
  }, []);

  
  return (
    
    <NavigationContainer>
      
      <Provider store={store}>
        <StatusBar/>
        
        <SafeAreaView style={styles.container}>
          <AppNavigator />
        </SafeAreaView>
        
    
      </Provider>
      
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight, // Ensure content is below the StatusBar
    backgroundColor: 'black',
  },
});
