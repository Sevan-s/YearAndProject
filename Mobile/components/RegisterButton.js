import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';

function RegisterButton() { 
    return (
        <View>
            <Pressable 
                style={styles.buttonAction}
                onPress={() => alert('Simple Button pressed')}
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