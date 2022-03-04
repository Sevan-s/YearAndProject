import { View, StyleSheet, Pressable, Text } from 'react-native';
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
const servCom = require('./../../communicateServer');

WebBrowser.maybeCompleteAuthSession();

export default function GoogleConnexion() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '748486023082-7d0a346g33366k9ftbp37n0u2jh70fcr.apps.googleusercontent.com',
    iosClientId: '748486023082-p47feo8sa31ljlknulfcd05b8ilb37lh.apps.googleusercontent.com',
    androidClientId: '748486023082-eg5hdh1vqor9konl4doskhr902nfjj6v.apps.googleusercontent.com',
    webClientId: '748486023082-7d0a346g33366k9ftbp37n0u2jh70fcr.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      servCom.oauthGoogle(response);
      }
  }, [response]);

  return (
    <Pressable 
      style={styles.buttonAction}
      disabled={!request}
      onPress={() => { promptAsync();}}>
      <Text style={styles.buttonTxt}>CONTINUE WITH GOOGLE</Text>
    </Pressable>
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