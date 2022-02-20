import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable, Switch } from 'react-native';
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { useState } from 'react';

export default function Details(props) {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.body}>
            <View style={styles.details}>
                <Text style={styles.cardTitle}>{props.Title}</Text>
                <Text style={styles.cardTxt}>{props.Txt}</Text>
                <Text style={styles.cardStatus}>{props.Status}</Text>
                <Switch
                    trackColor={{ false: "#FF0000", true: "#FF0000" }}
                    thumbColor={isEnabled ? "#000000" : "#FFFFFF"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
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
    details: {
        height: 646,
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