import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
const servCom = require('./../../communicateServer');

const SwitchReaction = (props) => {
  const [isEnabled, setIsEnabled] = useState(props.state);
  const toggleSwitch = () => {setIsEnabled(previousState => !previousState); servCom.switchReaction(props.action, props.reaction)};

  return (
    <View style={styles.container}>
        <Switch
            trackColor={{ false: "#FF0000", true: "green" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "flex-end"
  },
  cardStatus: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    marginRight:20,
    
},
});

export default SwitchReaction;