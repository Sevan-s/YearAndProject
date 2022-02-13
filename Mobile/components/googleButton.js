import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';

function GoogleButton() { 
    return (
        <View>
            <Pressable 
                style={styles.buttonAction}
                onPress={() => alert('Simple Button pressed')}
            >
                <Text style={styles.buttonTxt}>CONTINUE WITH GOOGLE</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonAction: {
        marginTop: 15,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 5,
        paddingRight: 5,
    },
  
    buttonTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default GoogleButton;