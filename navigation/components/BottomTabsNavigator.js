import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopTabsNavigator from './TopTabsNavigator';
import NewPostScreen from '../../screens/NewPostScreen/screens/NewPostScreen';
import MyCommentsScreen from '../../screens/MyCommentsScreen/screens/MyCommentsScreen';
import ProfileScreen from '../../screens/ProfileScreen/screens/ProfileScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
const Tab = createBottomTabNavigator();
const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TopTabsNavigator} />
      <Tab.Screen name="New Post" component={NewPostScreen} />
      <Tab.Screen name="My Comments" component={MyCommentsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
