import React, { Component } from 'react';
import {Modal,Image, ImageProps, Pressable, View, StyleSheet, TextInput, FlatList,TouchableOpacity, Text, Alert, TouchableWithoutFeedback,ScrollView,Dimensions,SafeAreaView,StatusBar,ActivityIndicator} from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../contants/Colors';
import Divider from '../components/Divider';
import Title from '../components/Title';
import { RelistRequest} from '../actions/ListingAction';
import { color } from 'react-native-elements/dist/helpers';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import ConfirmedRoomates from '../components/ConfirmedRoomates';


class Retrieve extends Component {
  constructor(props) {
    super(props);
    this.state={
      modalVisible:false,
      isLoading: false,
      goal:this.props.data_values?.home_goal,
      authorization:this.props.data_values?.Authorization,
      listings:this.props.data_values.user_total_deleted_data,
      isFetching: false,
      current_tenant_listing: null,
      currentItem:[],
    }
  }
  // {label:"hello",isSelected:false,image:""},{label:"hi",isSelected:false,image:""}
  componentDidMount(){
    this.setState({listings:this.props.data_values.user_total_deleted_data});
  };


  shouldComponentUpdate(nextProps, nextState) {
    // Rendering the component only if passed props value is changed
    
    if(nextProps.relistapiMsg !== this.props.relistapiMsg){
      if(nextProps.relistapiMsg === 'success'){
        this.props.navigation.navigate('Listing');
      }
      else if(nextProps.relistapiMsg === 'error'){
        alert("page not loaded successfully")
      }
      return true;
    }
    if(nextState !== this.state) {
        return true;
    }
      return false;
  }

  onClickRetrieve=(id) =>
  {
    this.setState({isLoading:true})
    payload={
      Authorization: this.state.authorization,
      listing_id:id
    }

    this.props.RelistRequest(payload);
  }
  

onContentSizeChange = (contentWidth, contentHeight) => {
  // Save the content height in state
  this.setState({ screenHeight: contentHeight });
};

openTwoButtonAlert=(listing_id)=>{
  Alert.alert(
    '',
    'By clicking yes listing will be Relisted on listings page.',
    [
      {text: 'Yes', onPress: () => this.onClickRetrieve(listing_id)},
      {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
    ],
    { 
      cancelable: true 
    }
  );
}

 
  render() {
    // const { state, actions } = this.props;
    console.log("...........................",this.props.data_values.user_total_deleted_data);
    const scrollEnabled=true
   return(
   
    <SafeAreaView style={styles.con}>
      <StatusBar/>
        <View style={styles.container}>
            <View style={{left: '12.62%', fontSize: 16}}>
                    <Title textMsg={'My Old Listings'}/>
            </View>
            {this.state.isLoading && 
              <View style={styles.loading}>
                {<ActivityIndicator size='large' color={"black"} />}
              </View>
            }
            
            {this.props.data_values.user_total_deleted_data && this.state.goal===3 && !this.state.isLoading &&
            <View style={{margin:10}}>
              <FlatList
                data={this.props.data_values.user_total_deleted_data}
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

                      { (this.state.goal===3) &&
                        <View>
                          <TouchableWithoutFeedback
                            onPress={()=>this.openTwoButtonAlert(item.listing.id)}
                            >
                            <Text style={[styles.nextbutton]}>RELIST</Text>
                          </TouchableWithoutFeedback>
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
            {(this.props.data_values.user_total_deleted_data && this.props.data_values.user_total_deleted_data.length===0 && (this.state.goal==3)) &&
              <View style={{justifyContent: 'center', textAlign: 'center',alignContent:'center',alignItems:'center', overflow:'hidden', backgroundColor:"#B5BFE3", height:'60%', borderRadius:10, margin:20}}>
                <Feather name='info' color={"#7E43EE"} size={30} >Info</Feather>
                <Text style={{margin:20, fontSize:18, color:"#7E43EE"}}> Currently you have no previous listings to retrieve. Click back to go to Listings Page.</Text>
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
    Authorization:state.Authorization,
    relistapiMsg: state.relistapiMsg
  };
}
const mapDispatchToProps={
    RelistRequest,
}
export default connect(mapStateToProps, mapDispatchToProps)(Retrieve);


