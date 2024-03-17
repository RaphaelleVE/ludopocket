import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import BottomBarNavigator from './BottomBarNavigator';

const Stack = createNativeStackNavigator();

//navigation for login and sign up
const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="BottomBarNavigator" component={BottomBarNavigator} />
  </Stack.Navigator>
);

export default AppNavigator;
