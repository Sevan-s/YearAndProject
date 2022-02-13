import react from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";

export default function Footer () {
    return (
    <View style={styles.footer}>
        <Text style={styles.foot}>
            DWS®
        </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        alignItems: 'center',
        bottom: 0,
    },
    foot: {
        fontSize: 16,
    }
});