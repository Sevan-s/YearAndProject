import { authorize } from 'react-native-app-auth'
import { View, StyleSheet, Pressable, Text } from 'react-native';
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
const servCom = require('./../../communicateServer');

WebBrowser.maybeCompleteAuthSession();
export default function DiscordLogin() {
    const config = {
        clientId: '948601629056315423',
        clientSecret: 'KIjjlpfteqmwtns-yBiSiFRqDWqlxRXC',
        redirectUrl: 'http://localhost:8081/settings',
        scopes: ['email', 'identify'],
        serviceConfiguration: {
            authorizationEndpoint: 'https://discordapp.com/api/oauth2/authorize',
            tokenEndpoint: 'https://discordapp.com/api/oauth2/token',
            revocationEndpoint: 'https://discordapp.com/api/oauth2/token/revoke'
        }
    };
    async function _onLoginDiscord() {
        try {
            const authResult = await authorize(config)
            servCom.setToken("Discord", authResult.accessToken)
        } catch (error) {
            console.log("Discord Error")
        };
    }
    return (
        <View>
            <Pressable style={styles.buttonAction}
                disabled={!request}
                title="Login"
                onPress={() => {
                    _onLoginDiscord();
                }}>
                <Text style={styles.buttonTxt}>CONTINUE WITH DISCORD</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonAction: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
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
})
