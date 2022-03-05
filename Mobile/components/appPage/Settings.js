import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../assets/Header';
import DisconnectButton from '../assets/disconnect';
import FacebookLogin from '../Oauth/Facebook';
import GoogleConnexion from '../Oauth/Google';
import MicrosoftLogin from '../Oauth/Microsoft';

export default function Settings({ navigation }) {
    return (
        <View>
            <Header/>
            <View style={styles.p}>
                <FacebookLogin/>
                <GoogleConnexion />
                <MicrosoftLogin />
                <DisconnectButton navigation={navigation}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    p: {
        height: '90%',
    }
  });