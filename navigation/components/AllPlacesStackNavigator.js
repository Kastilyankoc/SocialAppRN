import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllPlaces from '../../screens/MyCommentsScreen/screens/MyCommentsScreen';
import PlaceDetails from '../../screens/MyCommentsScreen/screens/CommentsDetailsScreen';
import Map from '../../screens/NewPostScreen/screens/Map';

const Stack = createStackNavigator();

const AllPlacesStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="My All Places" component={AllPlaces} options={{ headerShown: false }}/>
        <Stack.Screen name ="PlacesDetails" component={PlaceDetails} options={{ headerShown: false }}/>
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    );
  };
  
  export default AllPlacesStackNavigator;