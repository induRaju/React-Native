import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Modal, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import Color from '../contants/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfileEdit from '../containers/ProfileEdit';
import ProfileView from '../containers/ProfileView';
import { logoutRequest } from '../actions/LogoutAction';
import { getProfileData } from '../actions/ProfileViewAction';
import { accountDeactivateRequest } from '../actions/DeactivateActions';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createMaterialTopTabNavigator();

class TopTapNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutpiMsg: null,
      modalVisible: false
    };
  }
  componentDidMount() {
    this.props.getProfileData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.logoutapiMsg !== this.props.logoutApiMsg) {
      if (nextProps.logoutApiMsg === 'success') {
        // alert("You have signed out");
        this.props.navigation.navigate('Login');
        return true;
      } else if (nextProps.loginapiMsg === 'error') {
        // alert("Logout is not successful");
      }
      return true;
    }
    if (nextState !== this.state) {
      return true;
    }
    return false;
  }

  onClickLogout() {
    console.log('Logout Clicked');
    console.log(this.props.Authorization);
    this.props.logoutRequest({Authorization: this.props.Authorization});
  }
  // onClickDeactivate() {
  //   console.log('deactivate clicked');
  //   const payload = {
  //     Authorization: this.props.Authorization
  //   }
  //   this.props.accountDeactivateRequest(payload);
  //   this.props.navigation.navigate('Login');
  // }

  setModalVisible = (visible, mode = 'open') => {
    if(mode === 'yes') {
      console.log('deactivate clicked');
      const payload = {
        Authorization: this.props.Authorization
      }
      this.props.accountDeactivateRequest(payload);
      this.props.navigation.navigate('Login');
    }
      this.setState({
        modalVisible: visible,
      });
  }
  render() {
  let home_goal = this.props.home_goal;
  const { modalVisible } = this.state;
  console.log('home_goal>>>>', home_goal);
    return (
      <View style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="ProfileEdit" component={ProfileEdit} options={{
            tabBarLabel: 'Edit'
              }}/>
          {home_goal != '3' &&
            <Tab.Screen name="ProfileView" component={ProfileView} options={{
              tabBarLabel: 'View'
              }}/>
          }
        </Tab.Navigator>
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={() => this.onClickLogout()} >
            <Text style={styles.logoutButton}>Log Out</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={() => this.setModalVisible(!modalVisible)} 
          // onPress={() => this.onClickDeactivate()}
          >
            <Text style={styles.deactivateButton}>Deactivate Account</Text>
          </TouchableWithoutFeedback>
        </View>
        {modalVisible && 
          <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalTitle}>Deactivate Account</Text>
                    <TouchableOpacity style={styles.closeIcon} onPress={() => this.setModalVisible(!modalVisible)}>
                      <Entypo name='cross' color={Color.black} size={24} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.lineStyle} />
                  <View>
                    <Text>Are you sure you want to deactivate your account?</Text>
                  </View>

                  <View style={{ flexDirection: 'row', width: '50%', height: 30, marginTop: 20 }}>
                    <TouchableOpacity style={styles.save_button} onPress={() => this.setModalVisible(!modalVisible, 'yes')}>
                      <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                        <Text style={styles.saveButton_text}>YES</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancel_button} onPress={() => this.setModalVisible(!modalVisible, 'no')}>
                      <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                        <Text style={styles.cancelButton_text}>NO</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    backgroundColor: '#f0f0f0'
  },
  logoutButton: {
    color: Color.white,
    backgroundColor: Color.black,
    borderColor: '#000000',
    borderWidth: 3,
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  deactivateButton: {
    color: Color.white,
    backgroundColor: Color.pink,
    borderColor: Color.pink,
    borderWidth: 1,
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  modalTitle: {
    width: '50%',
    marginBottom: 15,
    textAlign: "left"
  },
  closeIcon: {
    width: '50%',
    marginBottom: 15,
    alignItems: 'flex-end'
  },
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    elevation: 5
  },
  save_button: {
    borderRadius: 5,
    marginRight: 15,
    elevation: 2,
    backgroundColor: Color.black,
    // width: '30%'
  },
  cancel_button: {
    borderRadius: 5,
    elevation: 2,
    backgroundColor: Color.white,
    // width: '30%',
    borderColor: Color.black,
    borderWidth: 1
  },
  saveButton_text: {
    color: Color.white,
    fontSize: 12,
    textAlign: 'center',
    paddingRight: 12
  },
  cancelButton_text: {
    color: Color.black,
    fontSize: 12,
    textAlign: 'center',
    paddingRight: 12
  },
  lineStyle: {
    borderBottomColor: '#e5e7eb',
    borderWidth: 1,
    marginBottom: 20
  },
});

const mapStateToProps = (state) => {
  return {
    selectedTab: state.selectedTab,
    home_goal: state.home_goal,
    logoutApiMsg: state.logoutApiMsg,
    Authorization: state.Authorization,
    deactivateApiMsg: state?.deactivateApiMsg
  }  
}
const mapDispatchToProps = {
  logoutRequest,
  getProfileData,
  accountDeactivateRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTapNavigation);
