import React, { Component } from 'react';
import { View, StyleSheet, Button, FlatList,TextInput,ActivityIndicator, TouchableOpacity, Text, TouchableWithoutFeedback,Image } from 'react-native';
import Color from '../contants/Colors';
import { connect } from 'react-redux';
import {compose} from 'redux'
import { chatlistdata,chatlistSuccess,chatlisTFailure } from '../actions/ChatlistActions';
import Feather from 'react-native-vector-icons/Feather';
//import { withNavigation } from "react-navigation";
import { withNavigation } from "react-navigation";
//import {getFriendsList} from '../actions/FriendsAction';
import {isEqual} from 'lodash';


// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import {senduser} from '../actions/ChatWithUserActions'
// import * as appActions from '../actions';

import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../contants/MessageStyles';







class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      Authorization: "",
      chats:"",
      isFocused: false
    };
  }


    

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = this.props.navigation.addListener("focus", () => {

      console.log("I have mounted in Chat List screen");
      let payload = {Authorization:this.props.data_values?.Authorization
      
      } 
      this.props.chatlistdata(payload)

    });


  }



  shouldComponentUpdate(nextProps, nextState) {
    // Rendering the component only if passed props value is changed

    console.log('nextProps>>>>>>owner', nextProps);
    // console.log('nextState', nextState.emailText, this.state.emailText);
    if ((nextProps.friendsList !== this.props.friendsList) || (nextProps.chatlistapimsg !== this.props.chatlistapimsg)) {
      if (nextProps.chatlistapimsg === 'success') {
        //console.log('true response>>>>',  this.filterChatsOnlyWithFriends(nextProps.friendsList, nextProps.chats_list || this.state.chat_list))
        this.setState({
          isLoading: false,
          chat_list: (nextProps.chats_list || this.state.chat_list),
          flag: true,
        })
        console.log("[CHAT][shouldComponentUpdate][friendsList]chats_list: ", nextProps.chats_list);
      } else if (nextProps.friendsListApiMsg === 'error' || nextProps.chatlistapimsg === 'error') {
        alert("Chat List Screen Data was not successful");
      }
    return true;
    }
    if(nextState !== this.state) {
      return true;
    }
    return false;
  }

  // filterChatsOnlyWithFriends = (friendsList, chatList) => {
  //   console.log('[Chat][filterChatsOnlyWithFriends]friendsList: ', friendsList);
  //   console.log('[Chat][filterChatsOnlyWithFriends]chatList: ', chatList);
  //   if (friendsList?.length === 0) {
  //     return chatList;
  //   } else if(friendsList && friendsList.length > 0 && chatList && chatList.length > 0) {
  //     return chatList.filter(eachChat => friendsList.includes(eachChat.user_id) );
  //   }
  //   return [];
  // }

  // onBackpress = (e) => {
  //   const currentRoute = this.props.route.name;
  //   console.log('currentRoute>>', this.props, currentRoute);
  //   if (currentRoute === "Chatstack") {
  //     e.preventDefault();
  //     return true;
  //   } else {
  //     return true;
  //   }
  // }

  _listEmptyComponent = () => {
    // console.log(" Yo I am here")
    return (
      <View>
        {this.state.isLoading == false &&
        <View style={{
                    justifyContent: 'center',
                            textAlign: 'center',alignContent:'center',alignItems:'center', overflow:'hidden',
                      backgroundColor:"#B5BFE3", height:'80%', borderRadius:10, margin:20}}>
                  
                  <Feather name='info' color={"#7E43EE"} size={30} >Info</Feather>
                  <Text style={{margin:20, fontSize:18, color:"#7E43EE"}}> No active chats, make new friends to Chat!</Text>
  
        </View>
  }
        </View>
    )
}
 
  onClickRequest = (user_id) => {
    this.props.senduser(user_id)
      
    this.props.navigation.navigate('ChatWithUserScreen');
  }

  render() {
    // const { state, actions } = this.props;
    console.log("Chat List data in Chat Screen",this.state.chat_list);
    let cali = this.state.chat_list
    console.log("vvsfvdfsvdfvffadfgvc", typeof(cali))



    return (
      <View style={{flex: 1}}>
                        {this.state.isLoading && <View style={{justifyContent:'center', flex:1}}>
                  {<ActivityIndicator color={"black"} />}
                </View>
                }
      <Container>
   
        <FlatList 
        
          data={this.state.chat_list}
          // keyExtractor={item=>item.chats.user_id}
          keyExtractor={(item,index) => index}
          ListEmptyComponent={this._listEmptyComponent}

          renderItem={({item, index}) => (
            <Card onPress={() => this.onClickRequest(item.user_id)}>

              {item.deleted_user == false &&
                            <UserInfo>
                            <UserImgWrapper>
                            {item.profile_picture &&
                              
                              <UserImg source={{uri:"https://d138zt7ce8doav.cloudfront.net/".concat(item.profile_picture)}} />

                          }
                          {item.profile_picture =="" &&
                            
                            <UserImg source={require('../assets/png/w1.jpg')} />

                        }
    
                            </UserImgWrapper>
                            <TextSection>
                              <UserInfoText>
                                <UserName>{item.name}</UserName>
                                <PostTime>{item.sent_at.slice(0,-11)}</PostTime>
                              </UserInfoText>
                              <MessageText>{item.last_message}</MessageText>
                            </TextSection>
                          </UserInfo>
              }
              

            </Card>
          )}
        />
      </Container>
      </View>
    );
  }
}
// const mapDispatchToProps ={

//   senduser

// // }
// }
const styles = StyleSheet.create({
 Container: {
  flex: 1,
  paddingLeft: 20,
  paddingRight: 20,
  alignItems: 'center',
  backgroundColor: '#ffffff'
 },
 
Card: {
  width: '100%',
},

UserInfo:{
  flexDirection: 'row',
  justifyContent: 'space-between',
},

UserImgWrapper: {
  paddingTop: 15,
  paddingBottom: 15
},

UserImg:{
  width: 50,
  height: 50,
  borderRadius: 25
},

TextSection: {
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 15,
  paddingLeft: 0,
  marginLeft: 10,
  width: 300,
  borderBottomWidth: 1,
  borderBottomColor: '#cccccc'
},
loginButton: {
  color: Color.black,
  fontSize: 15,
  textAlign: 'center',
  padding: 10
},

UserInfoText: {
  flexDirection: 'row',
  justifyContent: 'space-between',
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

function mapStateToProps(state) {
  
  return {
    data_values: state,
    chats_list: state.chat_list,
    chatlistapimsg: state.chatlistapimsg,
    friendsList: state.friendsList,
    friendsListApiMsg: state.friendsListApiMsg,

  };
}

const mapDispatchToProps = {
  chatlistdata,senduser
  // return {
  //   actions: bindActionCreators(appActions.actions, dispatch)
  // };
}


// export default connect(mapStateToProps, mapDispatchToProps)(initialScreen);
export default compose(
  connect(mapStateToProps,mapDispatchToProps),withNavigation)
  (Chat) 



