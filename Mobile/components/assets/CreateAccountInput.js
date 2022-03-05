import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react'
import RegisterButton from './RegisterButton';
import GoogleConnexion from '../Oauth/Google';

function CreateAccount(props) {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    return (
        <View style={styles.txtInput}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput style={styles.inputTxt}
                value={mail}
                onChangeText={text => setMail(text)}
                placeholder="My@mail.here"
            />
            <Text style={styles.inputTitle2}>Password</Text>
            <TextInput style={styles.inputTxt}
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="my_$ecr3t!/p4ssW0rd"
            />
            <Text style={styles.inputTitle3}>Verify password</Text>
            <TextInput style={styles.inputTxt}
                secureTextEntry={true}
                value={verifyPassword}
                onChangeText={text => setVerifyPassword(text)}
                placeholder="my_$ecr3t!/p4ssW0rd"
            />
            <View style={styles.button}>
                <RegisterButton 
                user={mail}
                pass={password}
                verifyPassword={verifyPassword}
                navigation={props.navigation}
                />
                <Text style={styles.or}>or</Text>
                <GoogleConnexion navigation={props.navigation}/>
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
        height: 34, 
        backgroundColor: 'white',
        width: 275,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 20,
        marginBottom: 25,
    },
});

export default CreateAccount;