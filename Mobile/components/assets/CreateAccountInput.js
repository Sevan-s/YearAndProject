import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import RegisterButton from './RegisterButton';
import GoogleConnexion from '../Oauth/Google';

function CreateAccount() {

    return (
        <View style={styles.txtInput}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput style={styles.inputTxt}
                onChangeText={(text) => { this.setState({ mail: text }) }}
                style={{
                    height: 34, backgroundColor: 'white',
                    width: 275,
                    borderRadius: 10,
                    fontSize: 20,
                    paddingLeft: 10,
                    marginBottom: 25,
                }}
                placeholder="My@mail.here"
            />
            <Text style={styles.inputTitle2}>Password</Text>
            <TextInput style={styles.inputTxt}
                onChangeText={(text) => { this.setState({ password: text }) }}
                style={{
                    height: 34, backgroundColor: 'white',
                    width: 275,
                    borderRadius: 10,
                    paddingLeft: 10,
                    fontSize: 20,
                    marginBottom: 25,
                }}
                placeholder="my_$ecr3t!/p4ssW0rd"
            />
            <Text style={styles.inputTitle3}>Verify password</Text>
            <TextInput style={styles.inputTxt}
                onChangeText={(text) => { this.setState({ verifyPassword: text }) }}
                style={{
                    height: 34, backgroundColor: 'white',
                    width: 275,
                    paddingLeft: 10,
                    borderRadius: 10,
                    fontSize: 20,
                }}
                placeholder="my_$ecr3t!/p4ssW0rd"
            />
            <View style={styles.button}>
                <RegisterButton />
                <Text style={styles.or}>or</Text>
                <GoogleConnexion />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    button: {
        marginTop: 20,
        alignItems: 'center',
    },
    or: {
        color: 'white',
        fontSize: 18,
        marginTop: 20,
        fontFamily: 'Prata_400Regular',
    },
    txtInput: {
        marginTop: 34,
        marginBottom: 40,
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
    inputTitle3: {
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

export default CreateAccount;