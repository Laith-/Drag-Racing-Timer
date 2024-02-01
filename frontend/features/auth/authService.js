import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_URL = "https://cruise-buddy-backend.onrender.com/api/users/"

// register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        await AsyncStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

// login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)

    if(response.data) {
        await AsyncStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
} 

// login google user
const loginGoogle = async (userData) => {
    const response = await axios.post(API_URL + "loginGoogle", userData)

    if(response.data) {
        await AsyncStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
} 

// logout user
const logout = () => {
    AsyncStorage.removeItem("user")
}

const authService = {
    register,
    logout,
    login,
    loginGoogle
}

export default authService