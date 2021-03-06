import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';
import React, { useState } from 'react';
import CreateAccount from '../assets/CreateAccountInput';
import Footer from '../assets/footer';

function Register({ route, navigation }) {
    /////////////////// SWITCH IF USER CONNECTED
    const [connect, setConnected] = useState(0);
    const {conn, isdeco} = route.params
    conn.then(data => setConnected(data))
    if (!isdeco && connect === 1)
        navigation.navigate('Global')
    ////////////////////////////////////////////

    let [fontsLoaded] = useFonts({
        Prata_400Regular,
    });
    return (
        <View style={styles.body}>
            <ScrollView>
            <View style={styles.bodyTop}>
                <View style={styles.RegisterBody}>
                    <View style={styles.Title}>
                        <Text style={styles.text}>Digital</Text>
                        <Text style={styles.text}>Widget</Text>
                        <Text style={styles.text}>Services</Text>
                        <CreateAccount navigation={navigation}/>
                        
                    </View>
                </View>
                <View style={styles.connect}>
                    <Text style={styles.CreateAccountTxt} onPress={() => navigation.navigate('Connection')}>Have an account?</Text>
                    <Text style={styles.CreateAccountTxt} onPress={() => navigation.navigate('Connection')}>
                    Log in now</Text>
                </View>
            </View>
            <View style={styles.blank}></View>
            <Footer/>
            </ScrollView>
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
    blank: {
        height: 40
    }
});
export default Register;
