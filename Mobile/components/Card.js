import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function Card(props) {
    return (
        <View style={styles.body}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{props.Title}</Text>
                <Text style={styles.cardTxt}>{props.Txt}</Text>
                <Text style={styles.cardStatus}>{props.Status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        marginTop:50,
        alignItems: 'center',
        justifyContent:'center'
    },
    card: {
        height: 200,
        width: 295,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    cardTitle: {
        marginTop: 20,
        marginLeft: 20,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },

    cardTxt: {
        color: "white",
        marginTop: 20,
        marginLeft: 20,
        fontSize: 14,
    },

    cardStatus: {
        color: "white",
        fontSize: 36,
        fontWeight: 'bold',
        marginLeft: 169,
    },
});