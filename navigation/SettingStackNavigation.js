import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Settings from '../containers/Settings';
import GetStarted21 from '../containers/GetStarted21';
import GoalSelecter from '../containers/goalselect';
import GoalSelecter2 from '../containers/goalselect2';

const Stack = createNativeStackNavigator();
export default class SettingsStackNavigation extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false}}/>
            <Stack.Screen name="goalselect" component={GoalSelecter} options={{ headerShown: true, headerTitle: ''}}/>
            <Stack.Screen name="goalselect2" component={GoalSelecter2} options={{ headerShown: true, headerTitle: ''}}/>
        </Stack.Navigator>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
  });