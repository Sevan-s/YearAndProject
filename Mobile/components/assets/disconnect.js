import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
const servCom = require('./../../communicateServer');

export default function DisconnectButton(props) {
    return (
        <View>
            <Pressable 
                style={styles.buttonAction}
                onPress={() => {
                    servCom.disconnect()
                    setTimeout(() => {
                        props.navigation.navigate({
                            name: 'Connection',
                            params: {conn: servCom.getConnectVal(), isdeco: true},
                            merge: true,
                        });
                    }, 1000)
                }}
            >
                <Text style={styles.buttonTxt}>Log out</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonAction: {
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 2,
        paddingBottom: 3,
        backgroundColor: 'black',
    },
  
    buttonTxt: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    }
});
