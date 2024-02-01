import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Countdown = ({ length, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(length);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(length);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      onFinish();
      setIsRunning(false);
      setTimeLeft(length); // Reset timeLeft to its initial value
    }
  }, [timeLeft, onFinish, length]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleStartStop}
          style={[styles.button, { backgroundColor: isRunning ? 'red' : 'green' }]}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <Text style={styles.countdownText}>{timeLeft}</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Set the background color to black
  },
  buttonContainer: {
    flexDirection: 'row', // Align elements horizontally
    alignItems: 'center', // Center elements vertically in the row
  },
  countdownText: {
    fontSize: 24,
    color: 'white', // Set the text color to white
    marginLeft: 10, // Add some space between the button and the countdown text
  },
  messageText: {
    color: 'white', // Set the text color to white
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Countdown;

