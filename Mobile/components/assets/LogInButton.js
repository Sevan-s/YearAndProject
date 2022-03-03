import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
const servCom = require('./../../communicateServer');

function LoginButton(props) { 
    return (
        <View>
            <Pressable 
                style={styles.buttonAction}
                onPress={() => {
                    servCom.connect(props.user, props.pass);
                    setTimeout(() => {
                        props.navigation.navigate({
                            name: 'Connection',
                            params: {conn: servCom.getConnectVal()},
                            merge: true,
                        });
                    }, 1000)
                }}
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