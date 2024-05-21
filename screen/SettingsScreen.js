import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { removeUserID } from '../server/userName';

const SettingScreen = () => {
  const navigation = useNavigation();
  
  const handleLoginPress = () => {
    navigation.navigate('Login'); 
    removeUserID();
  }

  const handleFavoritePress = () => {
    // Xử lý khi nút "Yêu thích" được nhấn
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFavoritePress}>
        <Text style={styles.buttonText}>Yêu thích</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingScreen;
