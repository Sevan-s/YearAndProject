import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
const servCom = require('./../../communicateServer');

function RegisterButton(props) {
    return (
        <View>
            <Pressable 
                style={styles.buttonAction}
                onPress={() => {
                    servCom.createUser(props.user, props.pass)
                    setTimeout(() => {
                        props.navigation.navigate({
                            name: 'Register',
                            params: {conn: servCom.getConnectVal()},
                            merge: true,
                        });
                    }, 1000)
                }}
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