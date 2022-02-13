import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import Connection from './components/Connection'
import Register from './components/Register';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Card from './components/Card';
import Homepage from './components/HomePage';

const Stack = createNativeStackNavigator();

export default function App() {
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