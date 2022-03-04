import * as React from 'react';
import * as Facebook from 'expo-facebook';
import { View, Alert, Button, Pressable, Text } from 'react-native';

const FaceboolLogin = () => {

  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '<APP_ID>',
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <View>
        <Pressable 
            style={styles.buttonAction}
            onPress={() => logIn()} title="Login">
            <Text style={styles.buttonTxt}>CONTINUE WITH FACEBOOK</Text>
        </Pressable>
    </View>
    )
}

export default FaceboolLogin;