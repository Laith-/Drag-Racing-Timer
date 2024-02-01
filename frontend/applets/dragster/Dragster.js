import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Changed import for TouchableOpacity
import { useState, useEffect } from 'react';
import MenuDropdown from '../../components/MenuDropdown';

import { DeviceMotionComponent } from './middleware/DeviceMotion';
import { useLocation } from "./middleware/locationService"

import {processAccelerationData, processLocationData, processData} from "./middleware/Processing"

const Dragster = () => {
  const { location } = useLocation() || null
  const { acceleration } = DeviceMotionComponent() || null

  const [isLogging, setIsLogging] = useState(false);
  const [accelerationLogs, setAccelerationLogs] = useState([]);
  const [locationLogs, setLocationLogs] = useState([]);

  const [runStats , setRunStats] = useState(null)

  // Start logging acceleration and location
  const startLogging = () => {
    setIsLogging(true);
    setRunStats(null)
  };

  // Stop logging acceleration and location
  const stopLogging = () => {
    setIsLogging(false);
  };

  // Log location when changes
  useEffect(() => {
    if (isLogging && location) {
      setLocationLogs((prevLogs) => [...prevLogs, location]);
    }
  }, [isLogging, location]);

  // Log acceleration when changes
  useEffect(() => {
    if (isLogging && acceleration) {
      setAccelerationLogs((prevLogs) => [...prevLogs, acceleration]);
    }
  }, [isLogging, acceleration]);


  const handleDataTransfer = () => {
      setRunStats(processData(locationLogs, accelerationLogs)) // returns {runDuration, runDistance, topSpeed} seconds, feet, mp/h
      
      setLocationLogs([])
      setAccelerationLogs([])
    };


  return (
    <View style={styles.container}>
      <MenuDropdown />

      <Text style={styles.title}>Dragster</Text>

      <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'green' }]}
                onPress={startLogging}
                disabled={isLogging}
              >
                <Text style={styles.buttonText}>START</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'yellow' }]}
                onPress={stopLogging}
                disabled={!isLogging}
              >
                <Text style={styles.buttonText}>END</Text>
              </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: 'red' }]}
                onPress={handleDataTransfer}
              >
                <Text style={styles.buttonText}>PROCESS</Text>
            </TouchableOpacity>

        </View>

        {location ? (
        <Text style={styles.text}>Location loaded</Text>
      ) : (
        <Text style={styles.text}>Waiting for location...</Text>
      )}

      {isLogging ? (
        <Text style={styles.text}>Logging in progress...</Text>
      ) : (
        <Text style={styles.instructionText}>
          1. Come to a complete stop and get ready to launch.
          {"\n"}
          2. App will detect your motion when you take off.
          {"\n"}
          3. At any point during or after your run you can end data logging.
          {"\n"}
          4. Press Process to see your stats
        </Text>
      )}


      {/*<Text style={styles.text}>STATS{"\n"}</Text>*/}
      {runStats ? (
        
        <Text style={styles.text}>
        {"\n"}
        Run Duration: {runStats.runDuration} Seconds
        {"\n"}
        Run Distance: {runStats.runDistance} Feet
        {"\n"}
        Top Speed: {runStats.topSpeedMPH} MPH
        {"\n"}
        1/4 Mile Time: {runStats.quarterMileTime} Seconds
        {"\n"}
        {"\n"}
        Top Speed: {runStats.topSpeedKMH } kmh for tests right now
  
        </Text>
        
      ) : (
        null
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 15,
    left: 55,
  },
  text: {
      color: 'white',
      fontSize: 18,
  },
  instructionText: {
    color: 'white',
    fontSize: 15,
  },
  buttonsContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'center', // Add space between buttons
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    width: 80, // Reduced width to make it smaller
    height: 80, // Reduced height to make it smaller
    
    borderRadius: 40, // Half of the width and height to keep it circular
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10, 
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default Dragster;
