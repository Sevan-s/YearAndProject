import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Header from '../Header';

export default function ADD () {
    return (
        <View>
            <Header/>
            <View style={styles.p}>
                <Text>ADD</Text>
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