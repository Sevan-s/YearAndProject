import react from "react";
import {Text, View, ScrollView, StyleSheet, StatusBar, Platform, TextInput} from "react-native";
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';

export default function SearchHeader () {

    let [fontsLoaded] = useFonts({
        Prata_400Regular,
    });

    return (
    <View>
        <View style={styles.header}>
            <SearchInput/>
        </View>
    </View>
    );
}


function SearchInput() {
    return (
        <View style={styles.txtInput}>
            <TextInput style={styles.inputTxt}
                style={{height: 34, backgroundColor: 'white',
                width: 275,
                paddingLeft:10,
                borderRadius: 10,
                fontSize:20,
                marginBottom:25,}}
                placeholder="Recherche"
            />
        </View>
    )
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
    },
    txtInput: {
        marginTop: 50,
    },
  
    inputTxt: {
        marginRight: 10,
        textAlign: 'left',
        color: 'white',
    },
});