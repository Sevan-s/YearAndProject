import React from 'react';
import {StyleSheet} from 'react-native';
import { Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import Homepage from '../components/appPage/HomePage';
import ADD from '../components/appPage/Add';
import Search from '../components/appPage/Search';
import Profile from '../components/appPage/Profile';
import Settings from '../components/appPage/Settings';


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
            <Tab.Screen name="Home" component={Homepage}
             options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={25} />
                ),
              }}
            />
            <Tab.Screen name="Search" component={Search}
            options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="search" color={color} size={25} />
                ),
              }}
            />
            <Tab.Screen name="ADD" component={ADD}
            options={{
                tabBarLabel: 'ADD',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="add-circle-outline" size={25} color={color} />
                ),
              }}
            />
            <Tab.Screen name="Settings" component={Settings}
            options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" color={color} size={25} />
                ),
              }}
            />
            <Tab.Screen name="Profile" component={Profile}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="user" size={25} color={color} />
                ),
              }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;