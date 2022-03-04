import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../assets/Header';
import DisconnectButton from '../assets/disconnect';

export default function Settings({ navigation }) {
    return (
        <View>
            <Header/>
            <View style={styles.p}>
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