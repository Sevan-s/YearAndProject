import react from "react";
import {Text, View, StyleSheet, Platform} from "react-native";
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';

export default function Header () {

    let [fontsLoaded] = useFonts({
        Prata_400Regular,
    });

    return (
    <View>
        <View style={styles.header}>
            <Text style={styles.head}>
                DWS
            </Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: Platform.OS === 'ios' ? 100 : 80,
        backgroundColor: 'black',
        justifyContent:'center',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        borderWidth: 1,
        borderBottomColor: 'white',
    },
    head: {
        marginTop: Platform.OS === 'ios' ? 25 : 0,
        fontSize: 16,
        color: 'white',
        fontSize: 24,
        fontFamily: 'Prata_400Regular',
    }
});