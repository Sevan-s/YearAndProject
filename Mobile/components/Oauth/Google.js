import React from 'react';
import { View, Button, StyleSheet, Pressable, Text } from 'react-native';
import * as Google from 'expo-google-app-auth';


export default function GoogleConnexion () {

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: "314509708961-3b7660nvfs63thn3iultd8riifae6p4s.apps.googleusercontent.com",
        //androidClientId: AND_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  const signInWithGoogle = () => {
    signInWithGoogleAsync()
    }

    return (
        <View>
            <Pressable 
                style={styles.buttonAction}
                onPress={() => signInWithGoogle()} title="Sign in with Google">
                <Text style={styles.buttonTxt}>CONTINUE WITH GOOGLE</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonAction: {
        marginTop: 15,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 5,
        paddingRight: 5,
    },
    buttonTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
})