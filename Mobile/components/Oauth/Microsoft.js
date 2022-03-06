import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Button } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';


WebBrowser.maybeCompleteAuthSession();

export default function MicrosoftLogin() {
  // Endpoint
  const discovery = useAutoDiscovery('https://login.microsoftonline.com/<TENANT_ID>/v2.0');
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'e8b5f8ec-f285-4714-b9a5-e3ab65c5d34d',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri: makeRedirectUri({
        scheme: 'your.app'
      }),
    },
    discovery
  );
  return (
    <View>
      <Pressable style={styles.buttonAction}
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}>
        <Text style={styles.buttonTxt}>CONTINUE WITH MICROSOFT</Text>
      </Pressable>
    </View>
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