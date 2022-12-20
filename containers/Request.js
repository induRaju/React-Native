import React, { Component } from 'react';
//import { View, StyleSheet, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { View, StyleSheet, Button, FlatList,TextInput, TouchableOpacity, Text, TouchableWithoutFeedback,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// import * as appActions from '../actions';
import PendingRequest from '../components/PendingRequest'
import RequestSent from  '../components/RequestSent'



class Request extends Component {
  constructor(props) {
    super(props);
  }
 componentDidMount()
 {
  console.log("in request mount")
 }
  render() {
    // const { state, actions } = this.props;
    return (
     <View style={styles.Container}>
     
      <PendingRequest  navigation={this.props.navigation}></PendingRequest>
      <RequestSent navigation={this.props.navigation}></RequestSent>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding:10,
    flexDirection: 'column',
    backgroundColor:'white'
   },
    tickstyle:
    {
        //padding:10,
        paddingLeft:20,
        paddingRight:20

    },

  Card: {
    width: '100%',
  },
  
  UserInfo:{
    //flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft:20,
    width:140},
  
  UserImgWrapper: {
    paddingTop: 4,
    paddingBottom: 4
  },
  
  UserImg:{
    width: 50,
    height: 50,
    borderRadius: 25
    
  },
  
  TextSection: {
    flexDirection: 'row',
    
    //justifyContent: 'center',
    padding: 0,
    paddingLeft: 0,
    marginLeft: 0,
    width: 400,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
 
  
  UserInfoText: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    marginBottom: 5,
  },
  
  UserName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  
  PostTime: {
    fontSize: 12,
    color: '#666'
  },
  
  MessageText: {
    fontSize: 14,
    color: '#333333'
  },
  buttonView: {
    left: '12.62%',
      height: 40,
      marginTop: 60,
      width: '80%',
      // backgroundColor: Color.black,
      borderRadius: 5,
  }
  });
   
  


export default Request;