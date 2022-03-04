import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Header from '../assets/Header';
import Card from '../assets/Card';

export default function ADD () {
    return (
        <View style={styles.body}>
            <Header/>
            <ScrollView>
                <Card Title="Title of the A/R" 
                    Txt="Brief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief description" 
                    Status="Status"
                    style={styles.card}/>
                <Card Title="Title of the A/R" 
                    Txt="Brief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief description" 
                    Status="Status"
                    style={styles.card}/>
                <Card Title="Title of the A/R" 
                    Txt="Brief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief description" 
                    Status="Status"
                    style={styles.card}/>
                <Card Title="Title of the A/R" 
                    Txt="Brief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief description" 
                    Status="Status"
                    style={styles.card}/>
                <Card Title="Title of the A/R" 
                    Txt="Brief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief descriptionBrief description" 
                    Status="Status"
                    style={styles.card}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        height: '100%',
    },
    
    p: {
        alignItems: 'center',
        justifyContent:'center',
        height: '90%'
    }
  });