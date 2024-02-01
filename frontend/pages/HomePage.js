import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import AppHorizontalScrollBar  from '../components/AppHorizontalScrollBar';
import CarHorizontalScrollBar  from '../components/CarHorizontalScrollBar';
import CarManagerHorizontalComponent from "../components/CarManagerHorizontalComponent"
import MenuDropdown from '../components/MenuDropdown';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  const userName = user ? user.name : '';


  return (
    <View style={styles.container}>

      <MenuDropdown />

      <Text style={styles.title}>Welcome, {userName || "user"}!</Text>

      <View style={styles.horizontalScrollContainer}>
        <AppHorizontalScrollBar />
        <CarHorizontalScrollBar />
        
      </View>

      <CarManagerHorizontalComponent />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 15,
    right: -57,
  },
  horizontalScrollContainer: {
    //flexDirection: 'row', // Horizontal layout
    //justifyContent: 'space-between', // Distribute the elements evenly along the row
    paddingHorizontal: 12, // Add some horizontal padding if needed
  },
});

export default HomePage;
