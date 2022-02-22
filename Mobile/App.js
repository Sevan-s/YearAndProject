import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import Connection from './components/connection/Connection'
import Register from './components/connection/Register';
import { StyleSheet, Text, View, useState} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './components/appPage/HomePage';
import Tabs from './navigation/Navigation';

const Stack = createNativeStackNavigator();
let connected = true;

export default function App() {
  if (connected == true)
    return (
      <NavigationContainer>
        <Tabs/>
      </NavigationContainer>
    )
  else
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Connection" component={Connection} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    height: 200,
    width: 295,
    backgroundColor: 'black',
  }
});