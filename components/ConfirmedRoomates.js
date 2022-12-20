import React, { Component } from 'react';
//import { View, StyleSheet, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { View, StyleSheet, Button, FlatList,TextInput, TouchableOpacity, Text, TouchableWithoutFeedback,Image ,ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ConfirmedUsersRequest } from '../actions/ConfirmedUsersAction';
import ProfileModal from '../containers/ProfileModal'
import Feather from 'react-native-vector-icons/Feather';
  

class ConfirmedRoomates extends Component {
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
    console.log(">>>>>>>>>>>",this.props.Authorization)
    this.props.ConfirmedUsersRequest({Authorization:this.props.Authorization})
  }
  
  onRefresh = () => {
    if(this.props.home_goal===2){
      this.props.ConfirmedUsersRequest({Authorization:this.props.Authorization});
    }
  }

  shouldComponentUpdate=(nextProps,nextState) =>
  {
    console.log("hello",nextProps.ConfirmedUsersapiMsg,this.props.ConfirmedUsersapiMsg)
    if (nextProps.ConfirmedUsersapiMsg !== this.props.ConfirmedUsersapiMsg) {
        if(nextProps.ConfirmedUsersapiMsg === 'success' || nextProps.ConfirmedUsersapiMsg === 'changed') {
            console.log("----------------",nextProps.confirm_user_details)
            this.setState({loading:false})
        } else if(nextProps.ConfirmedUsersapiMsg === 'error'){
            this.setState({loading:false})
            alert("Listing page was not successful loaded");
        }
      return true;
    }
    if(nextState !== this.state){ 
        return true;
    }
    return false
  }

  setModalVisible = () => {
    this.setState({
      showModal: false,
      user_id1:null
    })
  }

  profile=(user_id1) =>{  
    console.log("user11"+user_id1)
    this.setState(
        {
        user_id1:user_id1,
        showModal: true
    }, 
    )
  }

  render() {
    console.log('rendering request>>>>>', this.props.confirm_user_details);
    return (
     <View>

     {/* <Text style={{marginLeft:10,padding:10}}>Pending Requests To be Accepted</Text> */}
     <View style={{ margin:5,padding:5,borderRadius:10,backgroundColor:'white',borderColor:'black',borderWidth:1 }}>
          <Text  style={{ fontSize: 15,fontWeight: 'bold'}}>Confirmed Roommate/tenants</Text>
    </View>
     {this.state.loading && 
        <View style={{justifyContent:'center', flex:1,marginTop:15}}>
          {<ActivityIndicator color={"black"} />}
        </View>
    }
    {this.state.loading === false && (this.props.confirm_user_details === null || this.props.confirm_user_details?.length === 0) &&
      <View style={{ flexDirection: 'row',padding:15,borderRadius:10,backgroundColor:"#B5BFE3",borderRadius:10,marginHorizontal: 50, marginTop: 10  }}>
        <Feather name='info' color={"#7E43EE"} size={17} />
        <Text style={{fontSize:15, color:"#7E43EE"}}> Currently no one accepted Listing request!</Text>
      </View>
    }
    {  this.state.loading===false && (this.props.confirm_user_details !== null && this.props.confirm_user_details?.length > 0) &&
      <FlatList style={{backgroundColor:'white',height:'100%'}} persistentScrollbar nestedScrollEnable
        
          data={this.props.confirm_user_details}
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
                  {(item.profile.display_name==null)?
                    (<Text style={styles.UserInfo}> Dummy Name</Text>)
                    :(<Text style={styles.UserInfo}> {item.profile.display_name?.replace(/[\[\]"]+/g,"")}</Text>)
                  }
                  
              </View>
      )} />
    }

    {(this.state.user_id1!==null) &&
         <View>
            <ProfileModal user_id={this.state.user_id1} listing_id={null} modalVisible={this.state.showModal} setModalVisible={() => this.setModalVisible()}></ProfileModal>
        </View>
    } 
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
    paddingTop: 10,
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
    //console.log("reqstatus"+state.Req_status)
    return {
       Authorization:state.Authorization,
       home_goal:state.home_goal,
       confirm_user_details:state.confirm_user_details,
       ConfirmedUsersapiMsg: state.ConfirmedUsersapiMsg
    };
  }
   
  const mapDispatchToProps={
    ConfirmedUsersRequest,
  }


  export default connect(mapStateToProps,mapDispatchToProps)(ConfirmedRoomates);
