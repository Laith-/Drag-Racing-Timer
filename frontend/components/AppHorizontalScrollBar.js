import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import dragsterIcon from '../assets/dragster-icon.jpg'; // Import the image from the assets folder
import { useNavigation } from '@react-navigation/native';

function AppHorizontalScrollBar() {

    const navigation = useNavigation()

    const handleIconClick = (pageName) => {
        // You can add functionality here to handle the click event for each icon
        navigation.navigate(`${pageName}`)
        console.log(`Clicked on ${pageName} icon`);
      };


  return (
    <View>
      <Text style={styles.title}>Applets</Text>
    
    <ScrollView
        horizontal
        contentContainerStyle={styles.iconContainer}
        showsHorizontalScrollIndicator={false}
      >
        
        <View style={styles.iconWrapper}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleIconClick('Dragster')}
          >
            <Image source={dragsterIcon} style={styles.iconImage} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>Dragster</Text>
        </View>


        
          
          
        {/* Add more TouchableOpacity components for other icons as needed */}
      </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
    iconContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    iconWrapper: {
      alignItems: 'center', // Center the image and title horizontally
      marginRight: 20, // Adjust the spacing between icons
    },
    icon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'white', // Set the background color to white
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    iconTitle: {
      marginTop: 5,
      fontSize: 14,
      fontWeight: 'bold',
      color: 'white', // Set the text color to white
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'grey',
      marginTop: 14
       // Center the title text
    },
  
  });

export default AppHorizontalScrollBar