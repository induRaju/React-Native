import React, { Component } from 'react';
import { SafeAreaView, BackHandler, Platform, StyleSheet, View, StatusBar,LogBox } from 'react-native';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/es/integration/react';
import { ThemeProvider } from 'styled-components';
import store from './stores/index';


// import Colors from './contants/Colors';
import * as SplashScreen from 'expo-splash-screen';
import { theme } from './contants/Theme'
import StackNavigation from './navigation/StackNavigation';
LogBox.ignoreAllLogs();
export default class App extends Component {
  
  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
  };

  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  backAction = async () => {
    if (store.getState().login.isLoggedIn == false) {
      this.setState({
        showHoldPopUp: true,
      });
    } else {
      BackHandler.exitApp();
    }
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
              {/* <PersistGate loading={null} persistor={persistor}> */}
              <StatusBar
                  barStyle= {Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                  showHideTransition='none'
                  hidden={false}
                />
                <StackNavigation />
              {/* </PersistGate> */}
            </Provider>
          </ThemeProvider>
        </View>
    );
  }
}



const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
});

