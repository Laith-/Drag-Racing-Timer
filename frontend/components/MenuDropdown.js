import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native'; // Import SafeAreaView


const MenuDropdown = () => {
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
  };

  const handleSettings = () => {
    console.log("Settings")
  };

  if (!user) {
    return null; // Don't render the component if user is not logged in
  }

  return (
    
    <View style={styles.container}>

      <TouchableOpacity style={styles.menuButton} onPress={handleMenuToggle}>
        <View style={styles.menuIcon} />
      </TouchableOpacity>
      {isMenuOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuItemText}>Log out</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
          {/* Add more menu items here */}
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 999, // Make sure the component appears on top
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure the button is clickable
  },
  menuIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 43, // Adjust the position to avoid overlapping with the button
    left: 0, // Adjust the position to align with the button
    width: 120,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 999, // Ensure the menu appears on top
  },
  menuItem: {
    paddingVertical: 5,
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default MenuDropdown;
