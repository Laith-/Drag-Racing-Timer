import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import MenuDropdown from '../components/MenuDropdown';

import { createCar , reset} from '../features/cars/carSlice';


function AddCar() {
  const [carData, setCarData] = useState({
    // if no fields are filled, it ruturns success but doesnt write to db
    // need to fix
    //
    //

    //
    //
    //
    
    // Add more variables here
  })

  const dispatch = useDispatch()
  const navigation = useNavigation()


  
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.cars);

  const handleChange = (value, field) => {
    setCarData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  

  const handleAddToGarage = () => {
    // Implement logic to add the car details to the garage
    // For example, you can make an API call or save the data in a database
    // You can also display a success message after adding the car to the garage

   //console.log(carData)

    dispatch(createCar(carData))

    if (isSuccess) {
      Alert.alert("success", "u got da car");
      navigation.navigate('HomePage');
      dispatch(reset)
    }
    
     else if (isError) {
      Alert.alert("fail", message);
    }
    
  };


  const { year, make, model, trim, color } = carData;

  return (
    <View style={styles.container}>
      <MenuDropdown />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          style={styles.input}
          placeholder="Make"
          placeholderTextColor="white"
          value={make}
          onChangeText={(text) => handleChange(text, 'make')}
        />
        <TextInput
          style={styles.input}
          placeholder="Model"
          placeholderTextColor="white"
          value={model}
          onChangeText={(text) => handleChange(text, 'model')}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          placeholderTextColor="white"
          value={year}
          onChangeText={(text) => handleChange(text, 'year')}
        />
        <TextInput
          style={styles.input}
          placeholder="Trim"
          placeholderTextColor="white"
          value={trim}
          onChangeText={(text) => handleChange(text, 'trim')}
        />
        <TextInput
          style={styles.input}
          placeholder="Color"
          placeholderTextColor="white"
          value={color}
          onChangeText={(text) => handleChange(text, 'color')}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddToGarage}>
          <Text style={styles.addButtonLabel}>Add Car to Garage</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollViewContent: {
    padding: 16,
    marginTop: 50,
  },
  input: {
    color: 'white',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCar;
