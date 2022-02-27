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
import axios from 'axios';

const Stack = createNativeStackNavigator();

async function getConnectVal() {
  var connect = 0
  await axios.get("http://10.0.0.2:8080/user/connected/")
    .then(res => {
      const data = res.data;
      connect = data.isConnected;
  })
  return (connect);
}

export default function App() {
  const [connect, setConnected] = useState(0);
  getConnectVal().then(data => setConnected(1))
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Connection" component={Connection} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Global" component={Tabs} />
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