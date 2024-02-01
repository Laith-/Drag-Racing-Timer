import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'


const API_URL = "https://cruise-buddy-backend.onrender.com/api/inventory/"

//Create to inventory
const createCar = async (carData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, carData, config)

    //console.log(response.data)

    if(response.data) {
        await AsyncStorage.setItem("cars", JSON.stringify(response.data))
    }

    return response.data
}

// Get inventory
const getCars = async (carId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let url = API_URL
    if (carId) {
        url += `${carId}`;
    }
    const response = await axios.get(url, config)

    return response.data
}

// get one car
const getPublishedCar = async (carId) => {
    let url = '/api/inventory/getPublicInventory';
    if (carId) {
        url += `/${carId}`;
    }
    const response = await axios.get(url);
    return response.data
}

// update inv info
const updateInventory = async (carId, updatedFields, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}${carId}`, updatedFields, config)


    return response.data
}

// delete from inventory
const deleteCar = async (carId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}${carId}`, config)


    return response.data
}




const carService = {
    createCar,
    getCars,
    getPublishedCar,
    updateInventory,
    deleteCar
}

export default carService