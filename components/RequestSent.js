import React, { Component } from 'react';
//import { View, StyleSheet, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { View, StyleSheet, Button, FlatList,TextInput, TouchableOpacity, Text, TouchableWithoutFeedback,Image,ActivityIndicator,Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PENDING_REQUEST_ID } from '../actions/actionTypes';
 import {Requestsentid} from '../actions/requestaction';
 import {Requestlistingid,accept_request,like_listing,clearstate,PendingRequestid} from '../actions/requestaction';
 import {senduser} from '../actions/ChatWithUserActions';
 import ProfileModal from '../containers/ProfileModal';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import Color from '../contants/Colors';
import { color } from 'react-native-elements/dist/helpers';
import Feather from 'react-native-vector-icons/Feather';

// import * as appActions from '../actions';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/png/user-3.jpeg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/png/user-1.jpeg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/png/user-4.jpeg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/png/user-6.jpeg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/png/user-7.jpeg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const user_id = null
class RequestSent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      listing_id: null,
      loading:true,
      isLoading1: true,
      showModal: false,
      isFetching: false

    };
  }

 
  componentDidMount() {
    console.log("pending component1")
     
         if(this.props.home_goal===1)
            this.props.Requestsentid(this.props.Authorization);
           if(this.props.home_goal===2)
           this.props.Requestlistingid(this.props.Authorization)
          // this.setState({isFetching: false})
    //this.props.clearstate()
          //  this.willFocusSubscription = this.props.navigation.addListener(
          //   'focus',
          //   () => {
          //       console.log("focus inn")
          //     if(this.props.home_goal===1)
          //     this.props.Requestsentid(this.props.Authorization);
          //     if(this.props.home_goal===2)
          //     this.props.Requestlistingid(this.props.Authorization)
    
          //   }
          // ) 
          // this.willunFocusSubscription = this.props.navigation.addListener(
          //   'blur',
          //   () => {
          //       console.log("blur")
          //   }
          // )  
       }
    
  
  // const { navigation } = this.props.navigation;
    
   shouldComponentUpdate(nextProps,nextState) 
   { 
    // if(this.props.sent_list_details!==nextProps.sent_list_details||this.props.sent_user!==nextProps.sent_user)

    // {
    //   console.log("hello5")
    //   if(this.props.home_goal===1)
    //   {
    //     if(this.props.sent_user!==undefined ||this.props.sent_user!==null)
    //     {
    //       console.log("hello")
    //      this.setState({
    //            loading:false
    //      })
    //     }
    //   }
    //     if(this.props.home_goal===2)
    //     {
    //       if(this.props.sent_list_details!==undefined ||this.props.sent_list_details!==null)
    //       {
    //        this.setState({
    //              loading:false
    //        })

    //     }
       
    //   }
    //   return true;
    // }
    
    if(nextProps.requestsentfailure!=this.props.requestsentfailure && nextProps.requestsentfailure==='error')
    {
     console.log('requestfailure')
     this.setState(
       {
         loading:false
       }
      )
   
    //  alert ("Couldnt load the sent request details")
   
     return false;
      }
      if(this.props.home_goal===1)
   {  console.log("props.sentuser",this.props.sent_user)
       console.log("props.sentuser1",nextProps.sent_user)
     if(this.props.sent_user!==nextProps.sent_user && nextProps.requestsentfailure==='success' )
    {
      this.setState({
                     loading:false
               })
      return true;
    }
  }
  if(this.props.home_goal===2)
  { if(this.props.sent_list_details!==nextProps.sent_list_details && nextProps.requestsentfailure==='success' )
   {
     this.setState({
                    loading:false
              })
     return true;
   }
 }
 
    
    // if(this.state.user_id!==nextState.user_id|| this.state.listing_id!==nextState.listing_id ||this.state.showModal!==nextState.showModal)
   if(nextState !== this.state)
   {console.log("hello")
     return true;
   }
    return false
}
   
 

 
  componentWillUnmount()
  {
    console.log("component")
  }
  onRefresh = () => {
    //  this.setState({isFetching: true})
      
      if(this.props.home_goal===1)
      this.props.Requestsentid(this.props.Authorization);
     if(this.props.home_goal===2)
     this.props.Requestlistingid(this.props.Authorization)
      
      this.props.PendingRequestid(this.props.Authorization)
      this.setState({isFetching: false})
    
  
    }
  sendreq = (user_id) => {
    {
      console.log("acceptreq1")
      const payload = {
        Authorization: this.props.Authorization,
        user_id: user_id
      }
      this.props.accept_request(payload)

    }
  }
  sendlistreq = (user_id) => {
    {
      console.log("listing1")
      const payload = {
        Authorization: this.props.Authorization,
        listing_id: user_id
      }
      this.props.like_listing(payload)

}
}
setModalVisible = () => {
  this.setState({
    showModal: false,
    listing_id:null,
    user_id:null
  })
}

profile_model=(user_id1) =>
{  console.log("user"+user_id1)


    this.setState( 
        
        {
        user_id:user_id1,
        listing_id:null,
        showModal: true

    }
    );
    // { <View>
    //   <ProfileModal user_id={user_id1} listing_id={null} modalVisible={this.state.showModal} setModalVisible={() => this.setModalVisible()}></ProfileModal> 
    //    </View>
    //   }
     console.log("state"+this.state.user_id)
}


  listing_model = (listing_id1) => {
    console.log("listing_id1" + listing_id1)


    this.setState(
        
        {
        listing_id:listing_id1,
        user_id:null,
        showModal: true

      })
    // user_id=user_id1
    console.log("state1" + this.state.listing_id)
    //return ( <ProfileModal user_id={user_id} listing_id={null} ></ProfileModal>)
  }
  onClickRequest = (user_id) => {
    console.log("in click request" + user_id)
    this.props.senduser(user_id)

    this.props.navigation.navigate('Chat', { screen: 'ChatWithUserScreen',initial:false });
  }
  render() {
    // const { state, actions } = this.props;
    console.log('rendering request sent>>>>>', this.props.sent_user, this.props.sent_list_details);

    return (


      <View style={{flex: 3}}> 
      
       
        {this.props.home_goal === 1 && 
          <View style={{ margin: 5,padding:5,borderRadius:10,backgroundColor:'white',borderColor:'black',borderWidth:1,display:"flex",justifyContent:"space-between",flexDirection:"row" }}>
          <Text  style={{ fontSize: 15,fontWeight: 'bold'}}>Request Sent By You </Text>
          <Ionicons  name="refresh-outline" size={28} onPress={() => this.componentDidMount()} />
          </View>}
          { this.props.home_goal===1 && this.state.loading && <View style={{justifyContent:'center', flex:1,marginTop:10}}>
      {<ActivityIndicator color={"black"} />}
    </View>

    }
    {this.props?.home_goal === 1 && this.state.loading === false && (this.props.sent_user === null || this.props.sent_user?.length === 0 || this.props.sent_user === undefined) &&
                 <View style={{ flexDirection: 'row',padding:15,borderRadius:10,backgroundColor:"#B5BFE3",borderRadius:10,marginHorizontal: 50, marginTop: 10  }}>
                  <Feather name='info' color={"#7E43EE"} size={17} />
                  <Text style={{fontSize:15, color:"#7E43EE"}}> No users liked by you</Text>
                </View>
                }
        {this.props?.home_goal === 1 && this.state.loading===false &&
        <View style={{marginBottom:40}}>
          <FlatList persistentScrollbar  nestedScrollEnabled={true}  style={{ backgroundColor: 'white',  padding:10,flexGrow:1,height:'100%'}}
            data={this.props.sent_user}
            onRefresh={()=>this.onRefresh()}
            refreshing={this.state.isFetching}
            keyExtractor={item => item.profile?.user_id}
            renderItem={({ item, index }) => {
              console.log('index>> friends', index, this.props.sent_user?.length);
              return (

              <View style={{flexDirection: 'row',flex:1 ,padding:10}}>
                {(item.media.length > 0) && <TouchableOpacity  onPress={() => this.profile_model(item.profile.user_id)}>
                  <Image style={styles.UserImg} source={{ uri: "https://d138zt7ce8doav.cloudfront.net/".concat(item.media[0]?.uri) }}/>
                </TouchableOpacity>


                }
                {(item.media.length === 0) && <TouchableOpacity  onPress={() => this.profile_model(item.profile.user_id)}>
                  <Image style={styles.UserImg} source={require('../assets/png/blank-profile-picture.png')} onPress={() => this.profile_model(item.profile.user_id)} />
                </TouchableOpacity>}
                <TouchableOpacity>
                  <Text style={styles.UserInfo}> {item.profile.display_name?.replace(/[\[\]"]+/g, "")}</Text>
                </TouchableOpacity>
                {<TouchableOpacity  onPress={() => this.profile_model(item.profile.user_id)}>
                  <Text style={[styles.unFriendButton, {left:50}]}>View Profile</Text>
                </TouchableOpacity>}

                {/* {
                  <TouchableOpacity style={{ width: 105, marginLeft: 10, borderRadius: 5, backgroundColor: '#D3D3D3', height: 40 }} onPress={() => this.sendreq(item.profile.user_id)}>
                    <Text>Send Request</Text>
                  </TouchableOpacity>

                } */}
                {/* {index === this.props.sent_user?.length -1 && <View style={{backgroundColor: 'red'}}></View>} */}
               

              </View>
      
            )}} 
          
            />
            </View>}

        {this.props.home_goal === 2 &&<View style={{ margin: 5,padding:5,borderRadius:10,backgroundColor:'white',borderColor:'black',borderWidth:1,display:"flex",justifyContent:"space-between",flexDirection:"row" }}>
          <Text  style={{ fontSize: 15,fontWeight: 'bold'}}>Request Sent By You </Text>
          <Ionicons  name="refresh-outline" size={28} onPress={() => this.componentDidMount()}></Ionicons>
          </View> }
          { this.props.home_goal===2 && this.state.loading && <View style={{justifyContent:'center', flex:1,marginTop:10}}>
      {<ActivityIndicator color={"black"} />}
    </View>
    }
    {this.props?.home_goal===2 && this.state.loading === false &&  (this.props.sent_list_details === null || this.props.sent_list_details?.length === 0 || this.props.sent_list_details === undefined) &&
                 <View style={{ flexDirection: 'row',padding:15,borderRadius:10,backgroundColor:"#B5BFE3",borderRadius:10,marginHorizontal: 50, marginTop: 10  }}>
                  <Feather name='info' color={"#7E43EE"} size={17} />
                  <Text style={{fontSize:15, color:"#7E43EE"}}> No listings liked by you</Text>
                </View>
                }
        {this.props.home_goal === 2 && this.state.loading===false &&
          <View style={{marginBottom:40}}>
          <FlatList persistentScrollbar style={{ backgroundColor: 'white', height:'100%', padding:10,flexGrow:1}} nestedScrollEnabled={true}
            data={this.props.sent_list_details}
            keyExtractor={item => item.listing?.id}
            contentContainerStyle={{ paddingBottom: 20}}
            renderItem={({ item }) => (
            
              <View style={{ flexDirection: 'row', borderBottomWidth: 1,flex:1 ,padding:10}}>
                {(item.media.length > 0) && <TouchableOpacity  onPress={() =>this.listing_model(item.listing.id)}>
                  <Image style={styles.ListImg} source={{ uri: "https://d138zt7ce8doav.cloudfront.net/".concat(item.media[0]?.uri) }} />
                </TouchableOpacity>}
                {(item.media.length === 0) && <TouchableOpacity onPress={() =>this.listing_model(item.listing.id)}>
                
                  <Image style={styles.ListImg} source={require('../assets/png/empty_image.jpg')} />
                </TouchableOpacity>}
                <TouchableOpacity>
                  <Text style={styles.UserInfo}> {item.listing.address_for_listing}</Text>
                </TouchableOpacity>
               {
                <TouchableOpacity  onPress={() => this.profile_model(item.user.user_id)}>
                  <Text style={styles.unFriendButton} >View Profile</Text>

                </TouchableOpacity>

               }
                {(item.user.goal_id === 3) &&
                  <TouchableOpacity onPress={() => this.onClickRequest(item.user.user_id)}>
                    <Text  style={styles.unFriendButton}>Start Chat</Text>
                  </TouchableOpacity>}

                  
                {/* {
                  <TouchableOpacity onPress={()=>this.listing_model(item.listing.id)} >
                    <Text  style={styles.unFriendButton}>View listing</Text>
                  </TouchableOpacity>
                } */}
                <View style={{padding:40}}></View>
               
              </View>
             
            
            )}
          
          
             />
             </View>}
           
        {
          (this.state.user_id !== null) &&
          <View>
            <ProfileModal user_id={this.state.user_id} listing_id={null} modalVisible={this.state.showModal} setModalVisible={() => this.setModalVisible()}></ProfileModal>
           </View>
        }

        {
          (this.state.listing_id !== null) &&
          <View>
            <ProfileModal user_id={null} listing_id={this.state.listing_id} modalVisible={this.state.showModal} setModalVisible={() => this.setModalVisible()}></ProfileModal>
           </View>
        }


     
        

      </View>

    );

  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 5,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    marginTop: 0,
    backgroundColor: 'yellow',
    height: '50%',
    paddingBottom: 0
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
},
unFriendButton: {
  position:"relative",
  right:0,
  color: Color.white,
  backgroundColor: Color.black,
  borderColor: '#000000',
  borderWidth: 3,
  fontSize: 13,
  textAlign: 'center',
  padding: 3,
  margin: 3,
  borderRadius: 5,
  fontWeight: 'bold'
},
  tickstyle:
  {
    //padding:10,
    paddingLeft: 20,
    paddingRight: 20

  },

  Card: {
    width: '100%',
  },
  buttonView: {
    left: '12.62%',
    height: 0,
    marginTop: 0,
    //  width: '80%',
    // backgroundColor: Color.black,
    borderRadius: 5,
    backgroundColor: 'black'
  },

  UserInfo: {
    //flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
    width: 120
  },

  UserImgWrapper: {
    paddingTop: 4,
    paddingBottom: 4
  },

  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25

  },
  ListImg: {
    width: 50,
    height: 50,

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

function mapStateToProps(state) {
  console.log("sentuser" + state.sent_user_details)
  console.log("listuser", state.sent_list_details)
  console.log('requestsentfailure',state.requestsentfailure)
  return {
    Authorization: state.Authorization,
    sent_user: state.sent_user_details,
    sent_list_details: state.sent_list_details,
    home_goal: state.home_goal,
    requestsentfailure:state.requestsentfailure

  };
}

const mapDispatchToProps = {
  Requestsentid,
  Requestlistingid,
  accept_request,
  like_listing,
  senduser,
  clearstate,
  PendingRequestid


}


export default connect(mapStateToProps, mapDispatchToProps)(RequestSent);