import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Color from '../contants/Colors';
import { homescreendata,goal } from '../actions/HomeActions';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';

import Home from '../containers/Home.js';
import RentalsHome from '../components/RentalsHome';

const Tab = createMaterialTopTabNavigator();

class Home_View extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(null);
    this.state = {
      Authorization: "",

      goal: ""
    };}
    componentDidMount() {
      let payload = {Authorization:this.props.data_values?.Authorization,

      }
      let tot = this.state.total_data
      console.log("home response", payload)
      this.props.homescreendata(payload);
    };
render() {
  console.log("home view print",this.props.data_values?.home_goal);

    return (
    <View style={styles.container}>
      {this.props.data_values?.home_goal == 1 &&
      <Home />
      }
      {this.props.data_values?.home_goal == 2 &&
      <RentalsHome />
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
      // '#FF9DAB',
      backgroundColor: Color.black,
      // '#FFE9EC',
      borderColor: '#000000',
      borderWidth: 3,
      fontSize: 17,
      textAlign: 'center',
      padding: 10,
      margin: 10,
      borderRadius: 10,
      fontWeight: 'bold'
    }
  });
function mapStateToProps(state) {
    return {
      data_values: state
    };
  }
   
  const mapDispatchToProps={
    homescreendata,goal
  }
   
   
export default connect(mapStateToProps,mapDispatchToProps)(Home_View);
