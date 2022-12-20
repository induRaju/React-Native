import React, { Component } from 'react';
import {Alert,Modal,Image, ImageProps, Pressable, View, StyleSheet, TextInput, FlatList,TouchableOpacity, Text, TouchableWithoutFeedback,ScrollView,Dimensions,SafeAreaView,StatusBar,ActivityIndicator} from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../contants/Colors';
import Divider from '../components/Divider';
import Checkbox from 'expo-checkbox';
import Title from '../components/Title';
import {ListingLikeRequest, addTenantsRequest} from '../actions/ListingAction';
import { color } from 'react-native-elements/dist/helpers';
import Feather from 'react-native-vector-icons/Feather';
import {confirm_tenant} from '../actions/Confirmroommate'
import Entypo from 'react-native-vector-icons/Entypo';
import ConfirmedRoomates from '../components/ConfirmedRoomates';
import { TabRouter } from 'react-navigation';
import ProfileModal from '../containers/ProfileModal';
import { senduser } from "../actions/ChatWithUserActions";

class UsersLiked extends Component {
  constructor(props) {
    super(props);
    //this.state.goal=text
    this.state = {
        modalVisible:false,
        isLoading: false,
        current_tenant_listing: null,
        currentItem:[],
        user_id1:null,
        count_selected:0,
        showModal: false,
        valid:true,
        goal:this.props.data_values?.home_goal,
        authorization:this.props.data_values?.Authorization,
        listing_id: this.props.route.params.listing_id,
        number_of_bedrooms: this.props.route.params.number_of_bedrooms,
    }
  }

  setModalVisible = () => {
    this.setState({
      showModal: false,
      user_id1:null
    })
  }

  componentDidMount(){
    console.log(this.props.route.params);
    const payload={
      Authorization:this.props.Authorization,
      listing_id:this.props.route.params.listing_id
    }
    console.log(payload)
    this.props.ListingLikeRequest(payload);
  };

  profile=(user_id1) =>{  
    console.log("user11"+user_id1)
    this.setState(
        {
        user_id1:user_id1,
        showModal: true
    }, 
    )
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("kjnewconsole----------------",nextProps.ListingLikeapiMsg,this.props.ListingLikeapiMsg)
    if (nextProps.ListingLikeapiMsg !== this.props.ListingLikeapiMsg) {
      if(nextProps.ListingLikeapiMsg === 'success') {
        this.setState({modalVisible:true, isLoading:false, currentItem:nextProps.listing_liked_users});
        console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{",nextProps.listing_liked_users)
      } else if(nextProps.ListingLikeapiMsg === 'error'){
              alert("Listing page was not successful loaded");
          }
      return true;
    }
    else if (nextProps.addTenantsApiMsg !== this.props.addTenantsApiMsg) {
      if(nextProps.addTenantsApiMsg === 'success') {
        this.setState({isLoading:false});
        const pay3={
          Authorization:this.props.Authorization,
          listing_id:this.state.listing_id,
        }
        this.props.confirm_tenant(pay3)
      } else if(nextProps.addTenantsApiMsg === 'error'){
              alert("Listing page was not successful loaded");
          }
      return true;
    }
    else if(nextProps.FoundRoommatesapiMsg !== this.props.FoundRoommatesapiMsg){
      if(nextProps.FoundRoommatesapiMsg === 'success'){
        this.setState({isLoading:false})
        this.props.navigation.navigate("Listing");
      }
      else if(nextProps.FoundRoommatesapiMsg === 'error'){
        alert("page not loaded successfully")
      }
      return true;
    }
    if(nextState !== this.state) {
      return true;
    }
    return false;
  }

  onClickSave=()=>{
    this.setState({
      isLoading:true
    })
    let arr=[]
    this.state.currentItem?.map((obj, i) => {
      if(obj.isSelected){
        arr.push(obj.user_id);
      }
    })
    if(arr.length==this.state.number_of_bedrooms){
      this.openEqualTwoButtonAlert(arr);
    }
    else{
      this.openUnequalTwoButtonAlert(arr)
    }
    
  }

  onClickFinal=(arr)=>{
    const payload={
      Authorization:this.props.Authorization,
      arr:arr,
    }
    this.setState({isLoading:true})
    console.log("final arr",arr);
    this.props.addTenantsRequest(payload);
  }

  openEqualTwoButtonAlert=(arr)=>{
    Alert.alert(
      '',
      'By clicking yes listing will be deleted',
      [
        {text: 'Yes', onPress: () => this.onClickFinal(arr)},
        {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  openUnequalTwoButtonAlert=(listing_id)=>{
    Alert.alert(
      '',
      'You have selected fewer members than number of bedrooms. By clicking yes listing will be deleted',
      [
        {text: 'Yes', onPress: () => this.onClickFinal(arr)},
        {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }


  updatCheckbox = (value, currentTab, index) => {
    
    let currentTab_copy = [...this.state.currentItem]
    let val=0;
    currentTab_copy.map((item, i) => {
      if (currentTab_copy[i]?.user_id === value?.user_id) {
        if(!currentTab_copy[i]?.isSelected){
          val++;
        }
        currentTab_copy[i] = {
          ...value,
          isSelected: !currentTab_copy[i]?.isSelected
        }
      }
      else{
        if(currentTab_copy[i]?.isSelected){
          val++;
        }
      }
    })
    this.setState({
      currentItem: currentTab_copy
    })
    console.log("----------------",this.state.count_selected,this.state.valid,val)
    if(val>this.state.number_of_bedrooms){
      this.setState({valid:false, count_selected:val});
    }
    else{
      this.setState({valid:true, count_selected:val})
    }
  }

  onClickChatIcon = (userId) => {

    this.props.senduser(userId);
    this.props.navigation.navigate('Chat', { screen: 'ChatWithUserScreen', initial: false });

  }
  
  checkbox_component = () => {
    const { currentItem } = this.state;
    const currentTab = currentItem
    this.state.currentItem?.map((obj, i) => {
    })
    return (
      <ScrollView contentContainerStyle={styles.centeredPromptView}>
      <View>
        {this.state.currentItem?.map((obj, i) => {
      return (
          <View key={i} style={{flexDirection:'row'}}>
          <View style={{width:'15%', alignSelf: 'center', paddingTop: 15}}>
          <TouchableOpacity key={i} onPress={() => this.updatCheckbox(obj, currentTab, i)}>
            <View style={styles.Checkbox_section} key={i}>
              <Checkbox
                value={this.state.currentItem[i].isSelected}
                onValueChange={() => this.updatCheckbox(obj, currentTab, i)}
                color={this.state.currentItem[i].isSelected ? '#1c64f2' : undefined}
              />
            </View>  
          </TouchableOpacity>
          </View>
          <View style={{width: '85%', flexDirection:'row'}}>
            {(obj.image!='') && <TouchableOpacity onPress={()=>this.profile(obj.user_id)}>
                <Image style={styles.UserImg} source={{uri:"https://d138zt7ce8doav.cloudfront.net/".concat(obj.image)}} />
            </TouchableOpacity>  }
            {  (obj.image==='') && <TouchableOpacity onPress={()=>this.profile(obj.user_id)}>
              <Image style={styles.UserImg} source={require('../assets/png/blank-profile-picture.png')} />
              </TouchableOpacity>  }
            {(obj.name==null)?
              (<Text style={styles.UserInfo}> Dummy Name</Text>)
              :(<Text style={styles.UserInfo}> {obj.name?.replace(/[\[\]"]+/g,"")}</Text>)
            }
            <Ionicons name="chatbox-ellipses-outline" size={26} style={styles.chatBoxIcon} onPress={() => this.onClickChatIcon(obj.user_id)}></Ionicons>
            </View>
          </View>
          
        
      )
    })}
      </View>
      </ScrollView>
    );
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };
 
  render() {
    // const { state, actions } = this.props;
    console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{",this.state.currentItem)
    const scrollEnabled=true
   return(
  
    <SafeAreaView style={styles.con}>
    <StatusBar/>
    
    <View style={{flex:1}}>
    {(this.state.user_id1!==null) &&
         <View>
            <ProfileModal user_id={this.state.user_id1} listing_id={null} modalVisible={this.state.showModal} setModalVisible={() => this.setModalVisible()}></ProfileModal>
        </View>
    }
    {(this.state.currentItem && this.state.currentItem.length>0) &&
    <View style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
      <Text style={{textAlign:'center', marginTop: 10, marginBottom: 10}}>Wo hoo!! These tenants have liked your apartment, select the tenants of your choice.</Text>
    </View>
    }
    {(this.state.currentItem && this.state.currentItem.length>0)?
      (<ScrollView><View>{this.checkbox_component()}</View></ScrollView>):
      (<View style={{justifyContent: 'center', textAlign: 'center',alignContent:'center',alignItems:'center', overflow:'hidden', backgroundColor:"#B5BFE3", height:'80%', borderRadius:10, margin:20}}>
        <Feather name='info' color={"#7E43EE"} size={30} >Info</Feather>
          <Text style={{margin:20, fontSize:18, color:"#7E43EE"}}>Currently there are no likes for this listing</Text>
      </View>)
    }
    {(this.state.currentItem && this.state.currentItem.length>0) &&
        <View style={{ flexDirection: 'row', marginTop: 20, position:'absolute',bottom:10,alignSelf:'center' }}>
          <TouchableOpacity disabled={((!this.state.valid)||(this.state.count_selected==0))} style={[styles.save_button, {backgroundColor: ((!this.state.valid)||(this.state.count_selected==0)) ? 'grey': 'black'}]} onPress={() => this.onClickSave()}>
            <View style={{padding:10, flexDirection: 'row' }}>
              <Text style={styles.saveButton_text}>ADD TENANTS</Text>
            </View>
          </TouchableOpacity>
        </View>
    }
    </View>

    </SafeAreaView>  
)
  }
}
 
 
 
const styles = StyleSheet.create({
  con: {
    backgroundColor: 'white',
    flex:1
  },
    modalTitle: {
        width: '50%',
        marginBottom: 15,
        textAlign: "left",
        fontSize:17,
        
      },modalView: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        elevation: 5,
        height:'70%'
      },
      save_button: {
        borderRadius: 5,
        // marginRight: 15,
        elevation: 2,
        backgroundColor: Color.black,
        // width: '50%',
      },
      cancel_button: {
        borderRadius: 5,
        elevation: 2,
        backgroundColor: Color.white,
        width: '50%',
        borderColor: Color.black,
        borderWidth: 1
      },
      delete_button: {
        borderRadius: 5,
        elevation: 2,
        backgroundColor: Color.white,
        width: '50%',
        borderColor: Color.red,
        borderWidth: 1,
        marginRight: 10
      },
      saveButton_text: {
        color: Color.white,
        fontSize: 10,
        textAlign: 'center',
      },
      cancelButton_text: {
        color: Color.black,
        fontSize: 10,
        textAlign: 'center',
      },
      deleteButton_text: {
        color: Color.red,
        fontSize: 10,
        textAlign: 'center',
      },
      addbutton:
      {
        textAlign: 'center',
        padding: 10,
        left: '60%',
        width: '20%',
        fontSize: 12,
        color: Color.white,
        borderRadius: 5,
        border: 2,
        borderColor: Color.black,
        top:'5%'
      
      },closeIcon: {
        width: '50%',
        marginBottom: 15,
        alignItems: 'flex-end'
      },
      chatBoxIcon: {
        position: 'absolute',
        right: 30,
        paddingTop: 15
      },
      Checkbox_section: {
        color: 'black',
        marginBottom: 25,
        justifyContent:'center',
        alignItems:'center'
      },
      loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#F5FCFF88',
        pointerEvents:"none",
      },centeredPromptView: {
        justifyContent: "center",
        marginTop: 22
      },
      Card: {
        width: '100%',
      },
      
      UserInfo:{
        //flexDirection: 'column',
        // position: 'relative',
        paddingTop: 15,
        textAlign: 'center',
        paddingLeft: 10,
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
});
 
function mapStateToProps(state) {
  return {
    data_values: state,
    Authorization: state.Authorization,
    ListingLikeapiMsg: state.ListingLikeapiMsg,
    addTenantsApiMsg: state.addTenantsApiMsg,
    listing_liked_users: state.listing_liked_users,
    FoundRoommatesapiMsg: state.FoundRoommatesapiMsg,
  };
}
const mapDispatchToProps={
  ListingLikeRequest,
  addTenantsRequest,
  senduser,
  confirm_tenant,
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersLiked);
