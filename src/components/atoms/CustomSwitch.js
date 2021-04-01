import React, { useState } from "react";
import { Colors } from '../../styles';
import { View, Switch, StyleSheet } from "react-native";



const CustomSwitch = ({
    title,
    buttonType,
    buttonColor,
    buttonStyle,
    customStyle,
    toggleSwitch,
    isEnabled,
    ...rest
}) => {
    return (
        <View >
            <Switch
                trackColor={{ false: "#767577", true: "#E4B700" }}
                thumbColor={isEnabled ? "#FFCC00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });


export default CustomSwitch