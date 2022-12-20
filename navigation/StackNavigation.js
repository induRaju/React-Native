import React, { Component } from 'react';
import { SafeAreaView, Platform, StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import InitialScreen from '../containers/Initial';
import LoginScreen from '../containers/LoginScreen';
import Colors from '../contants/Colors';
import RegisterScreen from '../containers/Register';
import TabNavigation from './TabNavigation';
import GetStarted1 from '../containers/GetStarted1';
import ForgetPassword from '../containers/ForgetPassword';
import GetStarted2 from '../containers/GetStarted2';
import GetStarted21 from '../containers/GetStarted21';
// import Title from '../components/Title';
import ChatWithUser from '../containers/ChatWithUser'
import ApplicationHeader from '../containers/ApplicationHeader';

const Stack = createNativeStackNavigator();
export default class Navigation extends Component {

  render() {
    return (
      <View style={styles.container}>
        <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
                {/* <StatusBar
                    barStyle={
                    Platform.OS === 'ios' ? 'dark-content' : 'light-content'
                    }
                    backgroundColor={
                    Platform.OS === 'ios' ? Colors.tintColor : Colors.tabIconDefault
                    }
                /> */}
                <Stack.Navigator initialRouteName="Login">
                    {/* <Stack.Screen name="Account setup" component={InitialScreen} options={{
                      title: "Account setup"
                    }}/> */}

                    <Stack.Screen name="Login" component={LoginScreen} options={{
                      headerBackTitleVisible: false,
                      backgroundColor: Colors.white,
                      headerLeft: ()=> null,
                      headerBackButtonMenuEnabled: false,
                      headerBackVisible: false
                    }}/>
                    <Stack.Screen name="Register" component={RegisterScreen} options={{
                      headerBackTitleVisible: false
                    }}/>
                    <Stack.Screen name="GetStarted1" component={GetStarted1} options={{
                      headerBackTitleVisible: false
                    }}/>
                    <Stack.Screen name="Rentals&Friends" component={TabNavigation} options={(route, navigation) => ({
                      // headerBackTitle: 'back',
                      gestureEnabled: false,
                      headerTitle: () => <ApplicationHeader route={route} navigation={navigation} />,
                      headerBackTitleVisible: false,
                      headerBackVisible: false
                    })}/>
                    <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{
                      // headerBackTitle: 'back',
                      headerBackTitleVisible: false
                    }}/>
                    <Stack.Screen name="GetStarted2" component={GetStarted2} options={{
                      // headerBackTitle: 'back',
                      headerBackTitleVisible: false,
                      headerTitle: 'GetStarted'
                    }}/>
                     <Stack.Screen name="GetStarted21" component={GetStarted21} options={{
                      headerBackTitleVisible: false,
                      headerTitle: 'GetStarted'
                    }}/>
                  
                    
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: Colors.white
    },
  });