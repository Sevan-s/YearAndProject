import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';
import React from 'react';
import AppLoading from 'expo-app-loading';
import Footer from './footer';
import Card from './Card';

export default function Homepage() {
    return (
        <View>
           <Card Title="Title of the A/R" 
            Txt="Brief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief description" 
            Status="Status"
            style={styles.card}/>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 200,
        width: 295,
        backgroundColor: 'black',
        borderRadius: 10,
    },
});