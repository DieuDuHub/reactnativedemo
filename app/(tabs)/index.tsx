
import React, { useState,useEffect,useRef } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './homescreen';
import DetailScreen from './detailscreen';

const Stack = createNativeStackNavigator();

export default function MainScreen() {

 // return HomeScreen();

  return (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Welcome'}}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{title: 'Welcome'}}
    />
   
  </Stack.Navigator> );

}