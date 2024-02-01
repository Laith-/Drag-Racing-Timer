import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { register, reset } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

import DismissKeyboard from '../components/DismissKeyboard';

 

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)


  const dispatch = useDispatch()

  const [notification, setNotification] = useState("")

  useEffect(() => {
    if (isError) {
      setNotification(message)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message]);


  const handleRegister = () => {
    if(password !== password2) {
      setNotification("Passwords do not match")
      } else {
        const userData = {
            name,
            email,
            password
        }
  
        dispatch(register(userData))
      }
  };

  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {notification ? 
        <View style={styles.notificationContainer}>

          <Text style={styles.statusText}>{notification}</Text> 

        </View> : null}
      <TextInput
        placeholder="Name"
        placeholderTextColor="gray"
        value={name}
        onChangeText={(value) => setFormData({ ...formData, name: value })}
        style={[styles.input, styles.textColor]}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(value) => setFormData({ ...formData, email: value })}
        style={[styles.input, styles.textColor]}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        value={password}
        onChangeText={(value) => setFormData({ ...formData, password: value })}
        secureTextEntry
        style={[styles.input, styles.textColor]}
      />
      <TextInput
        placeholder="Re-enter Password"
        placeholderTextColor="gray"
        value={password2}
        onChangeText={(value) => setFormData({ ...formData, password2: value })}
        secureTextEntry
        style={[styles.input, styles.textColor]}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

    </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  textColor: {
    color: 'white',
  },
  statusText: {
    color: 'red',
    textAlign: 'center',
  },
  notificationContainer: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    marginBottom: 25,
    marginTop: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Register;
