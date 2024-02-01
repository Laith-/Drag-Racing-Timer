import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CarManagerHorizontalComponent() {
  const navigation = useNavigation();
  const [showOptions, setShowOptions] = useState(false);

  const handleIconClick = () => {
    
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    navigation.navigate(`${option}`)
    // Add your logic here for each option's functionality
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleIconClick}>
        <View>
          <Text style={styles.buttonText}>Manage Garage</Text>
        </View>
      </TouchableOpacity>

      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionClick('AddCar')}
          >
            <Text style={styles.optionText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionClick('EditPage')}
          >
            <Text style={styles.optionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionClick('View')}
          >
            <Text style={styles.optionText}>View</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  optionsContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Distribute items with equal space between them
    marginTop: 10,
  },
  optionButton: {
    flex: 1, // Each button takes equal space
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5, // Add a little gap between buttons
  },
  optionText: {
    fontSize: 18,
    color: 'white',
  },
});

export default CarManagerHorizontalComponent;
