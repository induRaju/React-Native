import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfileEdit from '../containers/ProfileEdit';
import ProfileView from '../containers/ProfileView';
import Apartments from '../containers/Apartments';
import Friends from '../containers/Friends';
import LikedPersons from '../containers/LikedPersons';
import Request from '../containers/Request';

const Tab = createMaterialTopTabNavigator();

export default class TopTapNavigation extends Component {

render() {
    return (
    <View style={styles.container}>
        <Tab.Navigator>
            <Tab.Screen name="ProfileEdit" component={ProfileEdit} />
            <Tab.Screen name="ProfileView" component={ProfileView} />
        </Tab.Navigator>
        <Tab.Navigator>
            <Tab.Screen name="Apartments" component={Apartments} />
            <Tab.Screen name="Friends" component={Friends} />
            <Tab.Screen name="Requests" component={Request} />
        </Tab.Navigator>
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