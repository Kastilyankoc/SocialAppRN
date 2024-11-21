import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BottomTabsNavigator from './components/BottomTabsNavigator';

const MainContainer = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
};

export default MainContainer;

const styles = StyleSheet.create({});
