import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Homepage from '../components/appPage/HomePage';
import ADD from '../components/appPage/Add';
import Settings from '../components/appPage/Settings';
const servCom = require('./../communicateServer');


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: Platform.OS === 'ios' ? 100 : 60,
                backgroundColor: 'black',
            },
          }}
          tabBarOptions={{
            activeTintColor: '#fff',
            inactiveTintColor: 'lightgray',
            activeBackgroundColor: 'black',
            inactiveBackgroundColor: 'black',
         }}
        >
            <Tab.Screen name="Home" children={() => <Homepage api={servCom.getAction()}/>}
             options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={25} />
                ),
                unmountOnBlur: true
              }}
            />
            <Tab.Screen name="ADD" children={() => <ADD api={servCom.getAction()}/>}
            options={{
                tabBarLabel: 'Config',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="add-circle-outline" size={25} color={color} />
                ),
                unmountOnBlur: true
              }}
            />
            <Tab.Screen name="Settings" component={Settings}
            options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" color={color} size={25} />
                ),
                unmountOnBlur: true
              }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;