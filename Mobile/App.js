import Connection from './components/connection/Connection'
import Register from './components/connection/Register';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/Navigation';
const servCom = require('./communicateServer');

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Connection" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Connection" component={Connection} initialParams={{'conn': servCom.getConnectVal()}}/>
      <Stack.Screen name="Register" component={Register} initialParams={{'conn': servCom.getConnectVal()}}/>
      <Stack.Screen name="Global" component={Tabs} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}