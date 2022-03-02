import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import axios from 'axios';

function sendData(props) {
    axios.post("http://localhost:8080/user/create/", {
        "username": props.user,
        "password": props.pass, "OAUTH": false,
        "verifyPassword": props.verifyPassword
    });
}

function RegisterButton(props) {
    return (
        <View>
            <Pressable 
                style={styles.buttonAction}
                onPress={() => sendData(props.user, props.pass, props.verifyPassword)}
            >
                <Text style={styles.buttonTxt}>Register</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonAction: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 2,
        paddingBottom: 3,
    },
  
    buttonTxt: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    }
});

export default RegisterButton;