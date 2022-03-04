import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SwitchButton from './Switch';

export default function Card(props) {

    return (
        <View style={styles.body}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{props.item.name}</Text>
                <Text style={styles.cardTxt}>{props.item.desc}</Text>
                <View style={styles.switchStatus}>
                    <SwitchButton state={props.item.activate} name={props.item.name}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    switchStatus: {
        marginRight: 20,
        paddingBottom: 20,
        marginTop:10
    },

    body: {
        alignItems: 'center',
        justifyContent:'center'
    },
    card: {
        marginTop:10,
        marginBottom:20,
        marginRight: 40,
        marginLeft: 40,
        backgroundColor: 'black',
        borderRadius: 10,
        width:'80%'
    },
    cardTitle: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },

    cardTxt: {
        color: "white",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 14,
    },

    cardStatus: {
        color: "white",
        fontSize: 36,
        fontWeight: 'bold',
        marginLeft: 169,
        marginRight:20,
    },
});