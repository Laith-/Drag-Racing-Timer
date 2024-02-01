import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Logo from '../assets/logo.png';
import { useNavigation } from '@react-navigation/native'

const LandingPage = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Navigate to the login page
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    // Navigate to the login page
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: "-10%"
  },
  logo: {
    width: '80%',
    height: undefined,
    aspectRatio: 1, // Maintain the aspect ratio of the image
    resizeMode: 'contain',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: "-80%"
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "yellow",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandingPage;
