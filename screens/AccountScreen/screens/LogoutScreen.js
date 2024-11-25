import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Redux store'dan kullanıcıyı çıkar
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default ProfileScreen;
