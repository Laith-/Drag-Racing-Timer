import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import carService from "./carService"



const initialState = {
    cars: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// create new inventory
export const createCar = createAsyncThunk("inventory/create", async(carData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await carService.createCar(carData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// get all dealer inventory
export const getCars = createAsyncThunk("inventory/getAll", async (carId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await carService.getCars(carId, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// get car public api
export const getPublishedCar = createAsyncThunk("inventory/getPublushed", async (carId, thunkAPI) => {
    try {
      return await carService.getPublishedCar(carId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  })


// update car data
export const editCar = createAsyncThunk("inventory/updateInventory", async ({ carId, editedFields }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.updateInventory(carId, editedFields, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  })

// delete inventory
export const deleteCar = createAsyncThunk("inventory/deleteCar", async(id, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await carService.deleteCar(id, token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

      return thunkAPI.rejectWithValue(message)
  }
})
  

export const carSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCar.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCar.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cars.push(action.payload)
            })
            .addCase(createCar.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getCars.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getCars.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cars = action.payload
            })
            .addCase(getCars.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                
            })
            .addCase(getPublishedCar.pending, (state) => {
                state.isLoading = true
              })
            .addCase(getPublishedCar.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cars = action.payload;
              })
            .addCase(getPublishedCar.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload;
              })
            .addCase(editCar.pending, (state) => {
                state.isLoading = true
              })
            .addCase(editCar.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                //const carIndex = state.cars.findIndex(car => car._id === action.payload._id)
                //state.cars = action.payload 
                if (!Array.isArray(state.cars)) {
                  state.cars = action.payload;
                } else {
                  const updatedCars = state.cars.map((car) => {
                    if (car._id === action.payload._id) {
                      return action.payload; // Replace the car with the same _id
                    }
                    return car; // Keep the car unchanged
                  });
              
                  state.cars = updatedCars;
                }
                
              })
            .addCase(editCar.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload;
              })
            .addCase(deleteCar.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cars = state.cars.filter((car) => car._id !== action.payload.id)
            })
            .addCase(deleteCar.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            
    }
})


export const {reset} = carSlice.actions
export default carSlice.reducer