import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewPostScreen from '../../screens/NewPostScreen/screens/NewPostScreen';
import CameraDetails from '../../screens/NewPostScreen/components/CameraDetails';

const Stack = createStackNavigator();
const NewPostStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="New Post Details" component={NewPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Camera Details" component={CameraDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default NewPostStackNavigator

