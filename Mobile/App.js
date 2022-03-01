import Connection from './components/connection/Connection'
import Register from './components/connection/Register';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/Navigation';
import axios from 'axios';

const Stack = createNativeStackNavigator();

async function getConnectVal() {
  var connect = 0
  await axios.get("http://10.15.189.199:8080/user/connected/")
    .then(res => {
      const data = res.data;
      connect = data.isConnected;
  })
  return (connect);
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Connection" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Connection" component={Connection} initialParams={{'conn': getConnectVal()}}/>
      <Stack.Screen name="Register" component={Register} initialParams={{'conn': getConnectVal()}}/>
      <Stack.Screen name="Global" component={Tabs} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}