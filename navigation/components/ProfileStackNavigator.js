import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen/screens/ProfileScreen';


const Stack = createStackNavigator();
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile Settings" component={ProfileScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
