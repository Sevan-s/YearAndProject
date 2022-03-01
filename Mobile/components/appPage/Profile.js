import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Header from '../assets/Header';

export default function Profile () {
    return (
        <View>
            <Header/>
            <View style={styles.p}>
                <Text>Profile</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    p: {
        alignItems: 'center',
        justifyContent:'center',
        height: '90%'
    }
  });