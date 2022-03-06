import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { Button } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function FacebookLogin() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '3163056723974155',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
    }
  }, [response]);

  return (
    <View>
      <Pressable style={styles.buttonAction}
        disabled={!request}
        onPress={() => promptAsync()} title="Login">
        <Text style={styles.buttonTxt}>CONTINUE WITH FACEBOOK</Text>
      </Pressable>
    </View>
  )
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
