import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable, Switch, useState} from 'react-native';
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import SwitchButton from './Switch';

export default function Card(props) {

    return (
        <View style={styles.body}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{props.Title}</Text>
                <Text style={styles.cardTxt}>{props.Txt}</Text>
                <View style={styles.switchStatus}>
                    <SwitchButton/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    switchStatus: {
        marginRight: 20,
        paddingBottom: 20,
        marginTop:10
    },

    body: {
        alignItems: 'center',
        justifyContent:'center'
    },
    card: {
        marginTop:10,
        marginBottom:20,
        marginRight: 40,
        marginLeft: 40,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    cardTitle: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },

    cardTxt: {
        color: "white",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 14,
    },

    cardStatus: {
        color: "white",
        fontSize: 36,
        fontWeight: 'bold',
        marginLeft: 169,
        marginRight:20,
    },
});