import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';
import React from 'react';
import AppLoading from 'expo-app-loading';
import CreateAccount from '../assets/CreateAccountInput';
import RegisterButton from '../assets/RegisterButton';
import Footer from '../assets/footer';
import Header from '../assets/Header';
import GoogleConnexion from '../Oauth/Google';



function Register({ navigation }) {

    let [fontsLoaded] = useFonts({
        Prata_400Regular,
    });
    return (
        <View style={styles.body}>
            <View style={styles.bodyTop}>
                <View style={styles.RegisterBody}>
                    <View style={styles.Title}>
                        <Text style={styles.text}>Digital</Text>
                        <Text style={styles.text}>Widget</Text>
                        <Text style={styles.text}>Services</Text>
                        <CreateAccount />
                        <View style={styles.button}>
                            <RegisterButton />
                            <Text style={styles.or}>or</Text>
                            <GoogleConnexion />
                        </View>
                    </View>
                </View>
                <View style={styles.connect}>
                    <Text style={styles.CreateAccountTxt}>Have an account?</Text>
                    <Text style={styles.CreateAccountTxt} onPress={() => navigation.navigate('Connection')}>
                    Log in now</Text>
                </View>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        height: '100%',
    },
    bodyTop: {
        height: '95%',
    },
    RegisterBody: {
        backgroundColor: 'black',
        marginTop: 60,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 10,
        paddingBottom: 20,
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
        alignItems: 'center',
    },
    or: {
        color: 'white',
        fontSize: 18,
        marginTop: 20,
        fontFamily: 'Prata_400Regular',
    },
    connect: {
        backgroundColor: 'black',
        marginTop: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 40,
        marginRight: 40,
        paddingBottom: 10,
        paddingTop: 10,
    },
    CreateAccountTxt: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
export default Register;
