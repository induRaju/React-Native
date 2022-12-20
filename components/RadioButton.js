import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    radioButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10
    },
    radioButton: {
      height: 20,
      width: 20,
      backgroundColor: "#F8F8F8",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#000000",
      alignItems: "center",
      justifyContent: "center"
    },
    radioButtonIcon: {
      height: 18,
      width: 18,
      borderRadius: 8,
      backgroundColor: "#000000"
    },
    radioButtonText: {
      fontSize: 16,
      marginLeft: 16
    }
  });

export const RadioButton = ({ onPress, selected, children }) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};


// export default RadioButton;