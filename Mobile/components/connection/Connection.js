import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';
import AppLoading from 'expo-app-loading';
import LoginButton from '../assets/LogInButton';
import ConnectionInput from '../assets/ConnectionInput';
import Footer from '../assets/footer';
import Header from '../assets/Header';
import GoogleConnexion from '../Oauth/Google';
import React, { useState } from "react";

function Connection({navigation}) {

    let [fontsLoaded] = useFonts({
        Prata_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <View style={styles.body}>
                <View style={styles.bodyTop}>
                    <View style={styles.connectionBody}>
                        <View style={styles.Title}>
                            <Text style={styles.text}>Digital</Text>
                            <Text style={styles.text}>Widget</Text>
                            <Text style={styles.text}>Services</Text>
                            <ConnectionInput/>
                        </View>
                        <View style={styles.button}>
                            <LoginButton />
                            <Text style={styles.or}>or</Text>
                            <GoogleConnexion />
                        </View>
                    </View>
                    <View style={styles.createAccountRedirection}>
                        <Text style={styles.CreateAccountTxt}>Don't have an account?</Text>
                        <Text style={styles.CreateAccountTxt} onPress={() => navigation.navigate('Register')}>
                        Register now</Text>
                    </View>
                </View>
                <Footer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: '100%',
    },

    connectionBody: {
        backgroundColor: 'black',
        marginTop: 60,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 40,
        borderRadius: 10,
        paddingBottom: 20,
    },
    createAccountRedirection: {
        backgroundColor: 'black',
        borderRadius:10,
        alignItems: 'center',
        justifyContent:'center',
        marginLeft: 40,
        marginRight: 40,
        paddingBottom: 10,
        paddingTop: 10,
    },

    Title: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: 'white',
        fontSize: 36,
        fontFamily: 'Prata_400Regular',
    },

    button: {
        marginTop: 20,
        alignItems: 'center',
    },
    or: {
        color: 'white',
        fontSize: 18,
        marginTop: 20,
        fontFamily: 'Prata_400Regular',
    },

    CreateAccountTxt : {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default Connection;