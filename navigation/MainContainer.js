import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/AccountScreen/screens/LoginScreen';

import React from 'react';
import BottomTabsNavigator from './components/BottomTabsNavigator';

const MainContainer = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <NavigationContainer>
      {user ? <BottomTabsNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default MainContainer;
