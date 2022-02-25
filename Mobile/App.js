import { StatusBar } from 'expo-status-bar';
import Connection from './components/connection/Connection'
import Register from './components/connection/Register';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './components/appPage/HomePage';
import Tabs from './navigation/Navigation';
import React, { useState } from "react";
import AppLoading from 'expo-app-loading';


const Stack = createNativeStackNavigator();

export default function App() {
  const [connect, setConnected] = useState(true);
  if (connect == true)
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
        <Stack.Screen name="Connection" options={connect} component={Connection} />
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