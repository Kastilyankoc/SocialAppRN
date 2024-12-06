import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewPostScreen from '../../screens/NewPostScreen/screens/NewPostScreen';
import CameraDetails from '../../screens/NewPostScreen/components/CameraDetails';
import LaunchImagePicker from '../../screens/NewPostScreen/components/LaunchImagePicker';
import Map from '../../screens/NewPostScreen/screens/Map';

const Stack = createStackNavigator();
const NewPostStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="New Post Details"
        component={NewPostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Camera Details" component={CameraDetails} />
      <Stack.Screen name="Launch Image Picker" component={LaunchImagePicker} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default NewPostStackNavigator;
