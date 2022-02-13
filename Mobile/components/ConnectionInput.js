import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

function ConnectionInput() {
    return (
        <View style={styles.txtInput}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput style={styles.inputTxt}
                style={{height: 34, backgroundColor: 'white',
                width: 275, 
                borderRadius: 10,
                fontSize:20,
                marginBottom:25,}}
                placeholder="My@mail.here"
            />
            <Text style={styles.inputTitle2}>Password</Text>
            <TextInput style={styles.inputTxt}
                style={{height: 34, backgroundColor: 'white',
                width: 275, 
                borderRadius: 10,
                fontSize:20,}}
                placeholder="my_$ecr3t!/p4ssW0rd"
            />
        </View>
    )
}

const styles = StyleSheet.create({
  
    txtInput: {
        marginTop: 34,
        width:275,
        height: 34,
    },
  
    inputTitle: {
      color: 'white',
      fontSize: 16,
      marginLeft: 10,
      marginRight: 10,
    },

    inputTitle2: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
    },
  
    inputTxt: {
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'left',
        color: 'white',
    },
});
  
export default ConnectionInput;