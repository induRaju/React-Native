import React, { Component } from 'react';
//import { View, StyleSheet, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { View, StyleSheet, Button, FlatList,TextInput, TouchableOpacity, Text, TouchableWithoutFeedback,Image ,ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
import { PENDING_REQUEST_ID } from '../actions/actionTypes';
 import {PendingRequestid,PendingRequestIdSuccess,accept_request,rejectrequest } from '../actions/requestaction';
 import {Requestsentid,Requestlistingid} from '../actions/requestaction';
 import ProfileModal from '../containers/ProfileModal'
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
  

class PendingRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id1:null,
      
      showModal: false,
      loading:true,
      isFetching: false
  
    };
    
  }
 
  componentDidMount()
  {
    console.log("pending component")
   
   this.props.PendingRequestid(this.props.Authorization)
   
   // const { navigation } = this.props.navigation;
    // this.willFocusSubscription = this.props.navigation.addListener(
    //     'focus',
    //     () => {
    //         console.log("focus inn")

    //       this.props.PendingRequestid(this.props.Authorization);

    //     }
    //   ) 
    //   this.willunFocusSubscription = this.props.navigation.addListener(
    //     'blur',
    //     () => {
    //         console.log("blur")
    //     }
    //   )  
   // this.setState({isFetching: false})
  }
  

  shouldComponentUpdate=(nextProps,nextState) =>
  {

    if(nextProps.PendingRequestfailure!=this.props.PendingRequestfailure && nextProps.PendingRequestfailure==='error')
   {
    console.log('requestfailure')
    this.setState(
      {
        loading:false
      }
     )
  
    // alert ("Couldnt load the pending requests details")
  
    return false;

   }
    if(this.props.req_user_details!==nextProps.req_user_details &&nextProps.PendingRequestfailure==='success' )
    {
      console.log("reqstatus",this.props.Req_status)
     
    {

      this.setState(
        {
          loading:false
        }
       )
    }
      
      return true;
    }
   
   

   
    if(nextState !== this.state)
   
   { return true;
   }
    return false

  }
  acceptreq =(user_id)=>
  {
    console.log("acceptreq")
   const  payload={
        Authorization:this.props.Authorization,
        user_id:user_id
    }
    this.props.accept_request(payload)
  }
  rejectreq =(user_id)=>
  {
    console.log("rejectreq")
   const payload={
        Authorization:this.props.Authorization,
        user_id:user_id
    }
    this.props.rejectrequest(payload)
  }
  componentWillUnmount()
  {
    console.log("component")
  }
  setModalVisible = () => {
    this.setState({
      showModal: false,
      user_id1:null
    })
  }
  profile=(user_id1) =>
{  console.log("user11"+user_id1)


    this.setState(
        
        {
        user_id1:user_id1,
        showModal: true


    }, 
    )
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
 
  render() {
    // const { state, actions } = this.props;
    console.log('rendering request>>>>>', this.props.req_user_details);
    return (
     <View style={{flex: 3}}>

     {/* <Text style={{marginLeft:10,padding:10}}>Pending Requests To be Accepted</Text> */}
     <View style={{ margin:5,padding:5,borderRadius:10,backgroundColor:'white',borderColor:'black',borderWidth:1,display:"flex",justifyContent:"space-between",flexDirection:"row" }}>
          <Text  style={{ fontSize: 15,fontWeight: 'bold'}}>Pending Requests To be Accepted </Text>
          <Ionicons  name="refresh-outline" size={28} onPress={() => this.componentDidMount()} />
          </View>
     {this.state.loading && <View style={{justifyContent:'center', flex:1,marginTop:15}}>
                  {<ActivityIndicator color={"black"} />}
                </View>
                }
                {this.state.loading === false && (this.props.req_user_details === null || this.props.req_user_details?.length === 0) &&
                 <View style={{ flexDirection: 'row',padding:15,borderRadius:10,backgroundColor:"#B5BFE3",borderRadius:10,marginHorizontal: 50, marginTop: 10  }}>
                  <Feather name='info' color={"#7E43EE"} size={17} />
                  <Text style={{fontSize:15, color:"#7E43EE"}}> No request!</Text>
                </View>
                }
    {  this.state.loading===false && <FlatList style={{backgroundColor:'white',height:'50%'}} persistentScrollbar nestedScrollEnable
        
          data={this.props.req_user_details}
          keyExtractor={item=>item.profile?.user_id}
          onRefresh={()=>this.onRefresh()}
          refreshing={this.state.isFetching}
          renderItem={({item}) => (
     
              <View style={{flexDirection:'row',borderBottomWidth: 1,padding:10}}>
             {(item.media.length>0) && <TouchableOpacity onPress={()=>this.profile(item.profile.user_id)}>
                  <Image style={styles.UserImg} source={{uri:"https://d138zt7ce8doav.cloudfront.net/".concat(item.media[0]?.uri)}} />
                  </TouchableOpacity>  }
                  {  (item.media.length===0) && <TouchableOpacity onPress={()=>this.profile(item.profile.user_id)}>
                    <Image style={styles.UserImg} source={require('../assets/png/blank-profile-picture.png')} />
                    </TouchableOpacity>  }
                  <TouchableOpacity >
                  <Text style={styles.UserInfo}> {item.profile.display_name?.replace(/[\[\]"]+/g,"")}</Text>
                  </TouchableOpacity>
                    <TouchableOpacity style={styles.tickstyle} onPress={()=>this.acceptreq(item.profile.user_id)}>
                    <Ionicons size={40}  name='checkmark-circle-outline' />
                    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tickstyle} onPress={()=>this.rejectreq(item.profile.user_id)}>
                    <Ionicons size={40}  name='close-circle-outline' />
                    </TouchableOpacity>
                  
                  
              </View>
             
           
            
          )} />
    }

{   (this.state.user_id1!==null) &&
         <View>
                     <ProfileModal user_id={this.state.user_id1} listing_id={null} modalVisible={this.state.showModal} setModalVisible={() => this.setModalVisible()}></ProfileModal>
                 
                     </View>} 
                       </View> 
      
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft:10,
    backgroundColor: 'green',
    
    marginTop:0

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
   
  function mapStateToProps(state) {
    console.log("requser"+state.req_user_details);
    console.log(" PendingRequestfailure:"+state.PendingRequestfailure)
    //console.log("reqstatus"+state.Req_status)
    return {
       Authorization:state.Authorization,
       req_user_details:state.req_user_details,
       Req_status:state.Req_status,
       PendingRequestfailure:state.PendingRequestfailure,
       home_goal:state.home_goal
    
    };
  }
   
  const mapDispatchToProps={
    PendingRequestid,
    accept_request,
    rejectrequest,
    Requestsentid,
    Requestlistingid,
    
  
  }


  export default connect(mapStateToProps,mapDispatchToProps)(PendingRequest);
