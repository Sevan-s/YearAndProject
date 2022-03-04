import { StyleSheet, View, ScrollView} from 'react-native';
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';
import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import Header from '../assets/Header';
import Card from '../assets/Card';

var apiSave = []

export default function Homepage(props) {
    const [api, setApi] = useState(apiSave);
    props.api.then(data => {setApi(data); apiSave = data});
    let [fontsLoaded] = useFonts({
        Prata_400Regular,
    });


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.body}>
                <Header />
                <ScrollView>
                    {api?.map(item => {
                        return (
                            <Card key={item.name} item={item}/>
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    body: {
        height: '100%',
    },

    card: {
        height: 200,
        width: 295,
        backgroundColor: 'black',
        borderRadius: 10,
    },
});