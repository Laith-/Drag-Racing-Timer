import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCars , reset} from '../features/cars/carSlice';


function CarHorizontalScrollBar() {

    const navigation = useNavigation()
    const dispatch = useDispatch();

    const cars = useSelector(state => state.cars.cars);


    // Call the getCars function from the carSlice
    useEffect(() => {
      dispatch(getCars());
      //console.log(cars)
    }, []);


    const handleIconClick = (pageName) => {
        // You can add functionality here to handle the click event for each icon
        navigation.navigate(`${pageName}`)
        console.log(`Clicked on ${pageName} icon`);
      };

    


      return (
        <View>
          <Text style={styles.title}>Your Cars</Text>
          <ScrollView
            horizontal
            contentContainerStyle={styles.iconContainer}
            showsHorizontalScrollIndicator={false}
          >
            {cars.map((car) => (
              <View style={styles.iconWrapper} key={car._id}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => handleIconClick(`${car._id}`)}
                >
                  {/* Render your circle */}
                  <View style={styles.iconCircle} />
                </TouchableOpacity>
                <Text style={styles.iconTitle}>{`${car.year} ${car.make} ${car.model}`}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      iconContainer: {
        flexDirection: 'row',
        marginTop: 20,
      },
      iconWrapper: {
        alignItems: 'center',
        marginRight: 20,
      },
      icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconCircle: {
        width: 50, // Customize the circle's width
        height: 50, // Customize the circle's height
        borderRadius: 25, // Make it a circle
        backgroundColor: 'gray', // Or any other color you want
      },
      iconTitle: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
        marginTop: 14,
      },
    });
    

export default CarHorizontalScrollBar