import react from "react";
import {Text, View, StyleSheet} from "react-native";

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
        position: 'absolute',
        alignItems: 'center',
        left:0,
        right:0,
        bottom: 0,
    },
    foot: {
        fontSize: 16,
    }
});