import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreScreen from '../../screens/ExploreScreen/screens/ExploreScreen';
import TrendsScreen from '../../screens/TrendsScreen/screens/TrendsScreen';
// import PopularScreen from '../../screens/PopulerScreen/screens/PopularScreen';

const Tab = createMaterialTopTabNavigator();

export default function TopTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'lightblue' },
        tabBarIndicatorStyle: { backgroundColor: 'blue' },
      }}
    >
      <Tab.Screen name="Expolere" component={ExploreScreen} />
      <Tab.Screen name="Trends" component={TrendsScreen} />
      {/* <Tab.Screen name="Popular" component={PopularScreen} /> */}
    </Tab.Navigator>
  );
}
