import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SwitchReaction from './SwitchReaction';

export default function ReactionCard(props) {

    return (
        <View style={styles.body}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{props.item.name}</Text>
                {props.item.reaction_allow.map(reac => {
                    if (props.item.reaction.includes(reac))
                        return (
                            <View key={reac} style={styles.alignSwitch}>
                                <Text style={styles.cardreac}>{reac}</Text>
                                <View style={styles.switchStatus}>
                                    <SwitchReaction state={true} action={props.item.name} reaction={reac}/>
                                </View>
                            </View>
                        )
                    return (
                        <View key={reac} style={styles.alignSwitch}>
                            <Text style={styles.cardTxt}>{reac}</Text>
                            <View style={styles.switchStatus}>
                                <SwitchReaction state={false} action={props.item.name} reaction={reac}/>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    alignSwitch: {
        flexDirection:'row',
    },

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
    cardreac: {
        color: "white",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 14,
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