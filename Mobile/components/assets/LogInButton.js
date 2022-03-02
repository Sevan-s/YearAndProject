import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import axios from 'axios';

function sendData(props) {
    axios.post("http://localhost:8080/user/connect/", {
        "username": props.user,
        "password": props.pass, "OAUTH": false
    });
}

function LoginButton(props) { 
    return (
        <View>
            <Pressable 
                style={styles.buttonAction}
                onPress={() => sendData(props.user, props.pass)}
            >
                <Text style={styles.buttonTxt}>Log in</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonAction: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        paddingLeft: 42,
        paddingRight: 42,
        paddingTop: 2,
        paddingBottom: 3,
    },
  
    buttonTxt: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    }
});

export default LoginButton;