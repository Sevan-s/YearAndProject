import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";

const SwitchButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.cardStatus}>{isEnabled ? "Activated" : "Desactivated"}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
  },
  cardStatus: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 169,
    marginRight:20,
},
});

export default SwitchButton;