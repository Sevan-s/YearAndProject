import React, {useState} from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Header from '../assets/Header';
import ReactionCard from '../assets/ReactionCard';

var apiSave = []

export default function ADD (props) {
    const [api, setApi] = useState(apiSave);
    props.api.then(data => {setApi(data); apiSave = data});

    return (
        <View style={styles.body}>
            <Header/>
            <ScrollView>
                {api?.map(item => {
                    return (
                        <ReactionCard key={item.name} item={item}/>
                    )
                })}
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