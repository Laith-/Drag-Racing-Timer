import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { login, reset, bypassLogin } from '../features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';


import DismissKeyboard from '../components/DismissKeyboard';



const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [bypassLoginMode, setBypassLoginMode] = useState(false); // Flag to indicate bypass login mode
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigation = useNavigation()

  const { isLoading, isError, isSuccess, user, message } = useSelector((state) => state.auth);

  const handleLogin = () => {
    const userData = {
      email,
      password
    };
    dispatch(login(userData));
  };

  const handleBypassLogin = () => {
    setBypassLoginMode(true);
    const mockUserData = {
      email: 'testuser@example.com',
      password: 'testpassword',
    };
    dispatch(bypassLogin(mockUserData));
  };

  const [notification, setNotification] = useState("")

  useEffect(() => {
    if (isError) {
      setNotification(message)
    }


    if (isSuccess || user) {
      setNotification("")
      navigation.navigate('HomePage')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigation]);

  const handleEmailChange = (text) => {
    setFormData({ ...formData, email: text });
  };

  const handlePasswordChange = (text) => {
    setFormData({ ...formData, password: text });
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {notification ? 
        <View style={styles.notificationContainer}>

          <Text style={styles.statusText}>{notification}</Text> 

        </View> : null}
          
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          keyboardType="email-address"
          autoCompleteType="email"
          onChangeText={handleEmailChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          autoCompleteType="password"
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
  statusText: {
    color: 'red',
    textAlign: 'center',
  },
  notificationContainer: {
    borderWidth: 1,
    borderColor: 'red', // You can change the color of the border here
    padding: 10,
    marginBottom: 25,
    marginTop: 10,
  },
});

export default Login;
