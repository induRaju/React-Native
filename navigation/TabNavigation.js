import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Colors from '../contants/Colors';
// import HomeScreen from '../components/RentalsHome';
import HomeScreen from '../containers/Home';

// import ChatScreen from '../containers/Chat';
import Like from '../containers/Like';
import ProfileScreen from '../containers/Profile';
import SettingScreen from '../containers/Settings';
import ListingStackNavigation from './listingNewStackNavigation';
import ChatStackNavigation from './chatStackNavigation';
import SettingStackNavigation from './SettingStackNavigation';
// connect with state
import { connect } from 'react-redux';


const Tab = createBottomTabNavigator();
class TabNavigation extends Component {
   
    
    render() {
        let home_goal = this.props.home_goal;
        let isHomeScreenLoading = this.props.isHomeScreenLoading;
        console.log('[TabNavigation] home_goal', home_goal);
        console.log('[TABNAVIGATION] isHomeScreenLoading: ', isHomeScreenLoading);
        if(home_goal && home_goal == 3)
        {
            isHomeScreenLoading =false;
        }

        return (
            <Tab.Navigator screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                // tabBarActiveTintColor: 'blue',
                // tabBarInactiveTintColor: 'black'
            }}> 
                {home_goal != 3 &&
                <Tab.Screen name="Hometab" component={HomeScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='home' color={color} size={size}/>
                    ),
                    gesturesEnabled: false
                    // tabBarVisible: false,
                    // tabBarIconStyle: { display: "none"}
                }}/>
                } 
                {!isHomeScreenLoading && <Tab.Screen name="Chat" component={ChatStackNavigation} options={{
                // {<Tab.Screen name="Chat" component={ChatStackNavigation} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='ios-chatbox-ellipses' color={color} size={size}/>
                    ),
                }}/>}
                {!isHomeScreenLoading && home_goal != 3 &&
                    <Tab.Screen name="Like" component={Like} options={{
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name='heart' color={color} size={size}/>
                        )
                    }} />
                }
                {!isHomeScreenLoading && <Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='person' color={color} size={size}/>
                    )
                }}/>}
                {!isHomeScreenLoading && <Tab.Screen name="List" component={ListingStackNavigation} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='list' color={color} size={size}/>
                    )
                }}/>}
                {!isHomeScreenLoading && <Tab.Screen name="Setting" component={SettingStackNavigation} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='settings' color={color} size={size}/>
                    )
                }}/>}
            </Tab.Navigator>
            );
    }
    
  }

  const mapStateToProps = (state) => {
    return {
        home_goal: state.home_goal,
        isHomeScreenLoading: state.isHomeScreenLoading
    }
}


// const mapDispatchToProps = {
//     loginRequest,
// }


export default connect(mapStateToProps, null)(TabNavigation);

// export default TabNavigation;