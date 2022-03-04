import React from 'react';
import { View, Button, StyleSheet, Pressable, Text } from 'react-native';
import * as Google from 'expo-google-app-auth';

const responseGoogle = (result) => {
  axios.post("http://localhost:8080/user/oauth/", {"username": result.user, "password": result.idToken, "OAUTH": true})
  axios.post("http://localhost:8080/user/setAccountLink/", {"token": result.accessToken, "name": "Google"})
  window.location.reload(false);
}

export default function GoogleConnexion () {

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: "748486023082-p47feo8sa31ljlknulfcd05b8ilb37lh.apps.googleusercontent.com",
        androidClientId: "748486023082-eg5hdh1vqor9konl4doskhr902nfjj6v.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        responseGoogle(result);
        result.accessToken
        return (0);
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