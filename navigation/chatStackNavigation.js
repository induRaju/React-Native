import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RequestScreen from '../containers/Request';
import ChatScreen from '../containers/Chat';
import  ChatWithUserScreen  from '../containers/ChatWithUser';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
const Stack = createNativeStackNavigator();
export default class ChatStackNavigation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Chatstack">
            <Stack.Screen name="Request" component={RequestScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Chatstack" component={ChatScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="ChatWithUserScreen" component={ChatWithUserScreen} options={{
                     title: ''
                    }} />
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