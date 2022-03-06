//expo install expo-web-browser expo_auth-session expo-random
import { View, StyleSheet, Pressable, Text } from 'react-native';
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
const servCom = require('./../../communicateServer');

WebBrowser.maybeCompleteAuthSession();

export default function GoogleConnexion(props) {

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '748486023082-7d0a346g33366k9ftbp37n0u2jh70fcr.apps.googleusercontent.com',
    iosClientId: '748486023082-p47feo8sa31ljlknulfcd05b8ilb37lh.apps.googleusercontent.com',
    androidClientId: '748486023082-eg5hdh1vqor9konl4doskhr902nfjj6v.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken)
      servCom.oauthGoogle(response);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json.then(data => {
      setUserInfo(data);
    });
  }

  return (
    <Pressable
      style={styles.buttonAction}
      disabled={!request}
      onPress={accessToken ? getUserData : () => {
        promptAsync({ showInRevents: true }); setTimeout(() => {
          props.navigation.navigate({
            name: 'Connection',
            params: { conn: servCom.getConnectVal(), isdeco: false },
            merge: true,
          });
        }, 1000)
      }}>
      <Text style={styles.buttonTxt}>CONTINUE WITH GOOGLE</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonAction: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
