import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopTabsNavigator from './TopTabsNavigator';
import NewPostScreen from '../../screens/NewPostScreen/screens/NewPostScreen';
// import MyCommentsScreen from '../../screens/MyCommentsScreen/screens/MyCommentsScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'New Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'My Comments') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={TopTabsNavigator} />
      <Tab.Screen name="New Post" component={NewPostScreen} />
      {/* <Tab.Screen
        name="My Comments"
        component={MyCommentsScreen}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen name="Profile" component={ProfileStackNavigator} 
        
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
