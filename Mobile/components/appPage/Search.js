import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchHeader from '../assets/SearchHeader';

export default function Search () {
    return (
        <View>
            <SearchHeader/>
            <View style={styles.p}>
                <Text>Search</Text>
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