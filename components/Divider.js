import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () => {
  return (
    <View 
        style={{
            borderBottomColor: 'black',
            borderWidth: 1,
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '100%',
            marginTop: 35
        }}
    />
  );
}

export default Divider;