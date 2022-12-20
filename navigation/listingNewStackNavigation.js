import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RequestScreen from '../containers/Request';
import Listing from '../containers/Listing';
import AddListing from '../containers/AddListing';
import EditListing from '../containers/EditListing';
import UsersLiked from '../containers/ListingsUserLiked';
import Retrieve from '../containers/Retrieve';

const Stack = createNativeStackNavigator();
export default class ListingStackNavigation extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Listing">
            <Stack.Screen name="Listing" component={Listing} options={{ headerShown: false}}/>
            <Stack.Screen name="AddListing" component={AddListing} options={{ headerShown: true, headerTitle: ''}}/>
            <Stack.Screen name="EditListing" component={EditListing} options={{ headerShown: true, headerTitle: ''}}/>
            <Stack.Screen name="UsersLiked" component={UsersLiked} options={{headerShown: true, headerTitle: ''}}/>
            <Stack.Screen name="Retrieve" component={Retrieve} options={{headerShown: true, headerTitle: ''}}/>
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