import React, { Component, lazy } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Color from '../contants/Colors';
import {PendingRequestid,PendingRequestIdSuccess } from '../actions/requestaction'


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import{
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';


import Apartments from '../containers/Apartments';
import Friends from '../containers/Friends';
import Request from '../containers/Request';

const Tab = createMaterialTopTabNavigator();

// const Like = (props) => {
//   const home_goal = useSelector(state => state.home_goal);
//   console.log('[Like]Current_Goal', home_goal);
//   return (<View style={styles.container}>
//     <Tab.Navigator>

//       {(home_goal == '1' ||home_goal =='2') &&
//         <Tab.Screen name="Requests" component={Request} options={{
//           tabBarLabel: 'Requests'
//         }} />
//       }

//       <Tab.Screen name="Friends" component={Friends} options={{
//         tabBarLabel: 'Friends'
//       }} />
//     </Tab.Navigator>
//   </View>)
// }

class Like extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("mount like")
  //  this.props.PendingRequestid(this.props.Authorization);
  }
  render()
  
  { //let home_goal=this.props.home_goal
   // console.log("homegoal",home_goal)
    return (<View style={styles.container}>
       <Tab.Navigator >
    
         {
           <Tab.Screen name="Requests" component={Request} options={{
             tabBarLabel: 'Requests' 
            }}  />
          }
          {
          <Tab.Screen name="Friends" component={Friends} options={{
            tabBarLabel: 'Friends'
          }}  />
          }
        </Tab.Navigator>
      </View> 
      );}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
const mapStateToProps = (state) => {
  return {
    Authorization:state.Authorization,

    home_goal: state.home_goal,
    
  }
}
const mapDispatchToProps = {
  PendingRequestid
}
export default connect(mapStateToProps, mapDispatchToProps) (Like);