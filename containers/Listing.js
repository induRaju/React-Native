import React, { Component } from 'react';
import {Modal,Image, ImageProps, Pressable, View, StyleSheet, TextInput, FlatList,TouchableOpacity, Text, Alert, TouchableWithoutFeedback,ScrollView,Dimensions,SafeAreaView,StatusBar,ActivityIndicator} from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../contants/Colors';
import Divider from '../components/Divider';
import Title from '../components/Title';
import { EditListingRequest, ListingRequest ,roommateProfile} from '../actions/ListingAction';
import { color } from 'react-native-elements/dist/helpers';
import Feather from 'react-native-vector-icons/Feather';
import {confirm_tenant} from '../actions/Confirmroommate';
import Entypo from 'react-native-vector-icons/Entypo';
import ConfirmedRoomates from '../components/ConfirmedRoomates';


class Listing extends Component {
  constructor(props) {
    super(props);
    this.state={
      modalVisible:false,
      isLoading: false,
      goal:this.props.data_values?.home_goal,
      authorization:this.props.data_values?.Authorization,
      listings:this.props.data_values.user_total_data,
      isFetching: false,
      current_tenant_listing: null,
      currentItem:[],
    }
  }
  // {label:"hello",isSelected:false,image:""},{label:"hi",isSelected:false,image:""}
  componentDidMount(){
    flag=true;
    this.focusListener = this.props.navigation.addListener("focus", () => {
      if(this.props.data_values?.current_goal!=2){
        const payload={
          Authorization:this.state.authorization,
        }
        this.props.ListingRequest(payload);
      this.setState({isFetching: false})
      }
    })
  };


  shouldComponentUpdate(nextProps, nextState) {
    // Rendering the component only if passed props value is changed
    console.log("hello there------+++++++++++++++++",nextProps.ListingapiMsg, this.props.ListingapiMsg);
    //console.log("hello there------edittttt+++++++++++++++++",nextProps.EditListingapiMsg, this.props.EditListingapiMsg);
    if (nextProps.ListingapiMsg !== this.props.ListingapiMsg) {
        if(nextProps.ListingapiMsg === 'success') {
            this.setState({isLoading:false,listings:nextProps.data_values.user_total_data})
        } else if(nextProps.ListingapiMsg === 'error'){
                alert("Listing page was not successful loaded");
            }
      return true;
    }
    else if(nextProps.FoundRoommatesapiMsg !== this.props.FoundRoommatesapiMsg){
      if(nextProps.FoundRoommatesapiMsg === 'success'){
        this.refresher();
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

  onClickEdit=(id) =>
  {
    payload={
      listing_id:id
    }

    this.props.EditListingRequest(payload);
    this.props.navigation.navigate('EditListing');
  }

  onClickADD=(props) =>
  {
    this.props.navigation.navigate('AddListing');
  }
  onClickRelist=(props) =>{
    this.props.navigation.navigate('Retrieve');
  }
  onClickSettings=(props)=>
  {
    this.props.navigation.navigate('Setting');
  }
  

onContentSizeChange = (contentWidth, contentHeight) => {
  // Save the content height in state
  this.setState({ screenHeight: contentHeight });
};
 
refresher = ()=>{
  if(this.props.data_values?.current_goal!=2){
    const payload={
      Authorization:this.state.authorization,
    }
    this.props.ListingRequest(payload);
  }
  else{
    const payload={
      Authorization:this.state.authorization,
    }
    //this.props.roommateProfile(payload)
  }
  this.setState({isFetching: false})
  return true
}
  
onClickADD=(props) =>
{
  props.navigation.navigate('AddListing');
}
onClickUsersLiked = (listing_id,number_of_bedrooms) =>{
  this.props.navigation.navigate("UsersLiked",{'listing_id':listing_id,'number_of_bedrooms':number_of_bedrooms});
}
onContentSizeChange = (contentWidth, contentHeight) => {
  // Save the content height in state
  this.setState({ screenHeight: contentHeight });
};

openTwoButtonAlert=(listing_id)=>{
  Alert.alert(
    '',
    'By clicking yes listing will be deleted',
    [
      {text: 'Yes', onPress: () => this.onClickconfirm(listing_id)},
      {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
    ],
    { 
      cancelable: true 
    }
  );
}

onClickconfirm =(listing_id) =>{
  this.setState({
    current_tenant_listing:listing_id,
    isLoading:true
  });
  const pay3={
    Authorization:this.props.Authorization,
    listing_id:listing_id,
  }
  this.props.confirm_tenant(pay3)
}
 
  render() {
    // const { state, actions } = this.props;
    console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}",this.props.data_values.user_total_data)
    const scrollEnabled=true
   return(
   
    <SafeAreaView style={styles.con}>
      <StatusBar/>
        <View style={styles.container}>
            <View style={{left: '5.62%', fontSize: 16}}>
                    <Title textMsg={'My Listings'}/>
                    <View style={{flexDirection:'row', marginBottom: 30}}>
                    { ((this.state.goal==3 || (this.props.data_values.user_total_data && this.props.data_values.user_total_data.length===0 && this.state.goal===1)) && (!this.state.isLoading))  &&
                    <TouchableWithoutFeedback
                      onPress={()=>this.onClickADD(this.props)}
                      >
                      <Text style={[styles.addbutton,{backgroundColor: Color.black}]}>+ADD</Text>
                    </TouchableWithoutFeedback>}
                    {((this.state.goal==3 && this.props.data_values.user_total_deleted_data && this.props.data_values.user_total_deleted_data.length>0) && (!this.state.isLoading))  &&
                    <TouchableWithoutFeedback
                      onPress={()=>this.onClickRelist(this.props)}
                      >
                      <Text style={[styles.resetbutton,{backgroundColor: Color.green}]}>+RELIST</Text>
                    </TouchableWithoutFeedback>}
                   
                    </View>
            </View>
            {this.state.isLoading && 
              <View style={styles.loading}>
                {<ActivityIndicator size='large' color={"black"} />}
              </View>
            }
            
            {this.props.data_values.user_total_data && this.state.goal!=2 && !this.state.isLoading &&
            <View style={{margin:10}}>
              <FlatList
                data={this.props.data_values.user_total_data}
                onRefresh={() => this.refresher()}
                refreshing={this.state.isFetching}
                renderItem={({item, index}) => {
                  return (
                    <View>
                    {/* {item.listing.is_available&& */}
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => ""}>

                      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>

                          <View style={{ width: '50%',backgroundColor:"#F4F3E9",borderTopLeftRadius:5}}>
                            <Text numberOfLines={1} style={{height:40, padding:10,fontSize:13}}>{item.listing.title}</Text>
                          </View>
                          {item.listing.number_of_bedrooms==null ?
                          ( 
                            <View style={{ width: '50%',backgroundColor:"#F4F3E9",borderTopRightRadius:5}}>
                              <Text numberOfLines={1} style={{height:40, padding:10,textAlign: 'right',fontSize:13}}>{"1"}Bedrooms</Text>
                            </View>
                          ):(
                            <View style={{ width: '50%',backgroundColor:"#F4F3E9",borderTopRightRadius:5}}>
                              <Text numberOfLines={1} style={{height:40, padding:10,textAlign: 'right', fontSize:13}}>{item.listing.number_of_bedrooms} Bedrooms</Text>
                            </View>
                          )}
                          
                          <View style={{ width: '50%',backgroundColor:"#F4F3E9",borderBottomLeftRadius:5}}>
                            <Text numberOfLines={1} style={{height:40, padding:10, fontSize:13}}>${item.listing.monthly_rent}</Text>
                          </View>
                          <View style={{ width: '50%',backgroundColor:"#F4F3E9",borderBottomRightRadius:5}}>
                            <Text numberOfLines={1} style={{height:40, padding:5,textAlign: 'center', fontSize:13}}>{item.listing.address_for_listing}</Text>
                          </View>

                      </View>
                      <View>
                        {item?.media[0] ?
                        (
                        <Image
                          style={styles.stretch}
                          source={{uri:"https://d138zt7ce8doav.cloudfront.net/".concat(item.media[0].uri)}}
                        />
                        ):(
                          <Image
                          style={styles.stretch}
                          source={require('../assets/png/default_house.png')}
                          />
                        )
                        }
                      </View>
                      {this.state.goal===3 &&  
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                          <View style={{ width: '50%',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
                            <TouchableWithoutFeedback
                              onPress={()=>this.onClickEdit(item.listing.id)}
                              >
                              <Text style={[styles.nextbutton]}>Edit</Text>
                            </TouchableWithoutFeedback>
                          </View>
                          <View style={{ width: '50%',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
                            <TouchableWithoutFeedback
                              onPress={()=>this.onClickUsersLiked(item.listing.id,item.listing.number_of_bedrooms)}
                              >
                              <Text style={[styles.difnextbutton]}>Liked Users</Text>
                            </TouchableWithoutFeedback>
                          </View>
                        </View>
                      }

                      { (this.state.goal===1 && (Number(item.listing.number_of_bedrooms)!=0)) &&
                        <View>
                          <TouchableWithoutFeedback
                            onPress={()=>this.onClickEdit(item.listing.id)}
                            >
                            <Text style={[styles.nextbutton]}>Edit</Text>
                          </TouchableWithoutFeedback>
                        </View>
                      }
                      { (this.state.goal===1 && (Number(item.listing.number_of_bedrooms)==0)) &&

                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                          <View style={{ width: '50%',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
                            <TouchableWithoutFeedback
                              onPress={()=>this.onClickEdit(item.listing.id)}
                              >
                              <Text style={[styles.nextbutton]}>Edit</Text>
                            </TouchableWithoutFeedback>
                          </View>
                          <View style={{ width: '50%',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
                            <TouchableWithoutFeedback
                              onPress={()=>this.openTwoButtonAlert(item.listing.id)}
                              >
                              <Text style={[styles.difnextbutton]}>FoundRoommates</Text>
                            </TouchableWithoutFeedback>
                          </View>
                        </View>
                      }
                    </TouchableOpacity>
                    
                    </View>
                  );
                }}
                keyExtractor={(item,index) => index}
            />
            </View>
            }
            {(this.props.data_values.user_total_data && this.props.data_values.user_total_data.length===0 && (this.state.goal===1||this.state.goal==3)) &&
              <View style={{justifyContent: 'center', textAlign: 'center',alignContent:'center',alignItems:'center', overflow:'hidden', backgroundColor:"#B5BFE3", height:'60%', borderRadius:10, margin:20}}>
                <Feather name='info' color={"#7E43EE"} size={30} >Info</Feather>
                <Text style={{margin:20, fontSize:18, color:"#7E43EE"}}> Currently you have no listings. click add button to create new listing </Text>
              </View>
            }
            {this.state.goal==2 &&
              <View style={{flex:1}}>
              <View style={{flex:6, marginBottom: 25}}>
              <ConfirmedRoomates  navigation={this.props.navigation}></ConfirmedRoomates>
              </View>
              <View style={{textAlign: 'center',alignContent:'center',alignItems:'center', backgroundColor:"#B5BFE3", height:'55%', borderRadius:10, margin:20,flex: 6, paddingTop: 10 }}>
                <Feather name='info' color={"#7E43EE"} size={30} >Info</Feather>
                  <Text style={{margin:20, fontSize:18, color:"#7E43EE"}}> Listing feature is available only if you have vacant room it seems you are looking for some one who has vacant room</Text>
                  <View style={{margin:20}}>
                    <TouchableWithoutFeedback
                      onPress={()=>this.onClickSettings()}
                      >
                      <Text style={[styles.modifygoal]}>Modify your goal</Text>
                    </TouchableWithoutFeedback>
                  </View>
              </View>
              </View>
            }
        </View>
        <View style ={{margin:'5%'}}>
        </View>
     </SafeAreaView>
   )
   
  }
}
 
 
 
const styles = StyleSheet.create({
   
  container: {
    flex: 1,
    margin: 20,
},
con:{
    flex :1,
    backgroundColor: Color.white
}
,
scrollview:{
  flexGrow:1
},

input: {
  height: 450,
  borderWidth:2,
  borderColor: '#F7F5E7',
  padding: 10,
  backgroundColor: Color.white,
  borderRadius: 10,
},
stretch: {
  width: '100%',
  height: '80%',
  top:'15%',
  resizeMode: 'stretch',
  borderRadius: 5,
},
nstretch: {
  width: '70%',
  height:'90%',
  resizeMode: 'stretch',
  borderRadius: 5,
},
nextbutton:
{
color: Color.black,
textAlign: 'center',
backgroundColor: Color.lightyellow,
borderRadius: 5,
borderwidth: 2,
height: 40,
width:'100%',
borderColor: Color.black,
top: '5%',
padding:10,
fontSize: 16,
overflow: 'hidden',
marginRight:2
},
difnextbutton:
{
color: Color.black,
textAlign: 'center',
backgroundColor: `#66cc00`,
borderRadius: 5,
borderwidth: 2,
height: 40,
width:'100%',
borderColor: Color.black,
top: '5%',
padding:10,
fontSize: 16,
overflow: 'hidden',
marginLeft:2,
},
modifygoal:{
  alignSelf:'center',
  color: "#7E43EE",
  textAlign: 'center',
  backgroundColor: "#8494CC",
  borderRadius: 5,
  borderwidth: 2,
  height: 50,
  width:'50%',
  borderColor: Color.black,
  top: '5%',
  padding:10,
  fontSize: 20,
  overflow: 'hidden',
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  marginTop: 22
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
  marginRight: 15,
  elevation: 2,
  backgroundColor: Color.black,
  width: '50%'
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
resetbutton:
{
  textAlign: 'center',
  padding: 10,
  // flex: 6, 
  // left: '60%',
  width: '20%',
  fontSize: 12,
  color: Color.white,
  borderRadius: 5,
  border: 2,
  borderColor: Color.black,
  top:'5%'

},
addbutton:
{
  // position: 'relative',
  textAlign: 'center',
  padding: 10,
  marginRight: 20,
  // left: 210,
  // alignItems:'flex-end',
  // left: '100%',
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
Checkbox_section: {
  flexDirection: 'row',
  color: 'black',
  marginBottom: 25
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
});
 
function mapStateToProps(state) {
  return {
    data_values: state,
    ListingapiMsg: state.ListingapiMsg,
    Authorization:state.Authorization,
    ListingLikeapiMsg:state.ListingLikeapiMsg,
    listing_liked_users:state.listing_liked_users,
    noofbedrooms:state.noofbedrooms,
    addTenantsApiMsg: state.addTenantsApiMsg,
    RoommateListprofile: state.RoommateListprofile,
    FoundRoommatesapiMsg: state.FoundRoommatesapiMsg
  };
}
const mapDispatchToProps={
  ListingRequest,
  EditListingRequest,
  confirm_tenant,
  roommateProfile,
}
export default connect(mapStateToProps, mapDispatchToProps)(Listing);


