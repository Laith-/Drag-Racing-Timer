import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import HomePage from "./pages/HomePage";
import Register from "./pages/Register"
import AddCar from "./pages/AddCar"
import EditPage from "./pages/EditPage"
import Dragster from "./applets/dragster/Dragster"




const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useSelector((state) => state.auth);
  

  return (
    
    
        
      <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'black' } }}>
        {!user ? (
          <>
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : ( <>
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Dragster" component={Dragster} />
          <Stack.Screen name="AddCar" component={AddCar} />
          <Stack.Screen name="EditPage" component={EditPage} />
          </>
        )}
      </Stack.Navigator>
      
      
    
    
    
    
  );
};

export default AppNavigator;
