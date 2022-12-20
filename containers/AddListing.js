import React, { Component } from 'react';
import { Keyboard,Image, ImageProps, Pressable, View, StyleSheet, TextInput, FlatList,TouchableOpacity, Text, TouchableWithoutFeedback,ScrollView,Dimensions,SafeAreaView, ActivityIndicator, StatusBar, ActionSheetIOS} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../contants/Colors';
import Divider from '../components/Divider';
import Title from '../components/Title';
const { height } = Dimensions.get('window');
import axios from "axios";
const API_KEY = 'AIzaSyDn2c2t_lVF2zphfPHh17roHm630kirXX8';
import { connect } from 'react-redux';
import {AddListingRequest} from '../actions/AddListingAction';
import { AddListingChange } from '../actions/AddListingAction';
import * as ImagePicker from 'expo-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
//import {CameraIcon, ImageIcon} from './icons';
//import Modal from 'react-native-modal';
const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class AddListing extends Component {
  constructor(props) {
    super(props);
    //this.state.goal=text
    this.state = {
      isLoading: false,
      auth_token:this.props.data_values?.Authorization,
      title: '',
      goal : 1,
      HouseAddress: '',
      HouseRent: '',
      RoomRent: '',  
      LeasePeriod: '',
      NumberOfBedrooms: '',
      ListingDescription: '',
      address_lat: null,
      address_lng: null,
      ValidAddress: '',
      ValidRent: '',
      ValidLease: '',
      ValidRooms: '',
      ValidDescription: '',
      isShowingResults: false,
      screenHeight: '',
      addressPlace_id:'',
      media_item: [
        {
          index:1,
          image: "",
          uimage: ""
        },
        {
          index:2,
          image: "",
          uimage: ""
        },
        {
          index:3,
          image: "",
          uimage: ""
        }
      ],
  };
  }
  // componentWillUnmount(){
  //   this.props.AddListingChange();
  // }
  shouldComponentUpdate(nextProps, nextState) {
    // Rendering the component only if passed props value is changed
    //console.log('nextState', nextProps.AddListingapiMsg, this.props.AddListingapiMsg);
    if (nextProps.AddListingapiMsg !== this.props.AddListingapiMsg) {
        if(nextProps.AddListingapiMsg === 'success') {
          this.setState({isLoading:false})
          this.props.navigation.navigate('Listing');
        } else if(nextProps.AddListingapiMsg === 'error'){
                alert("Listing was not successful");
            }
      return true;
    }
    if(nextState !== this.state) {
        return true;
    }
      return false;
  }

  onClickADDListing=(props) =>
  {
      if ((this.state.goal==3 && this.state.ValidAddress === false && this.state.ValidRent === false && this.state.ValidLease === false && this.state.ValidRooms === false && this.state.ValidTitle === false) ||
          (this.state.goal==1 && this.state.ValidAddress === false && this.state.ValidRent === false && this.state.ValidLease === false && this.state.ValidRooms === false && this.state.ValidTitle === false)){
        this.setState({isLoading: true});
        this.props.navigation.setOptions({headerShown: false});
        const payload={
          Authorization: this.state.auth_token,
          title: this.state.title,
          address_for_listing: this.state.HouseAddress,
          place_id: this.state.addressPlace_id,
          monthly_rent: this.state.HouseRent,
          address_lat: this.state.address_lat,
          address_lng: this.state.address_lng,
          about_listing: this.state.ListingDescription,
          number_of_bedrooms: this.state.NumberOfBedrooms,
          lease_duration: this.state.LeasePeriod,
          img_0: this.state.media_item[0].uimage,
          img_1: this.state.media_item[1].uimage,
          img_2: this.state.media_item[2].uimage
        }
        console.log("-====================--------------------?////////////////////////////////////////////////////////////////////////////////////====================================================================",payload);
        this.props.AddListingRequest(payload);
      }
      else {
        alert(Checkallvalues);
      }
  }
 
 
 
  getdata = (text,for_what) => {
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${for_what}`,
      })
      .then((response) => {
        //console.log(response);
        this.setState({
          searchResults: response.data.predictions,
        });
        const array=response.data.predictions;
 
        if(text===''){
          this.setState({
            ValidAddress:false,
            ValidLandmark: false,
            isShowingResults:false
          })
        }
        else{
          if(array.length>0){
            this.setState({
              isShowingResults:true
            })
          }
          else{
            this.setState({
              isShowingResults:false
            })
          }
          this.setState({ 
            ValidLandmark:true,
            ValidAddress:true,
          })
         
        }
      })
      .catch((e) => {
        //console.log(e.response);
        if(text===''){
          this.setState({
            ValidAddress:false,
            ValidLandmark:false,
            isShowingResults:false
          })
        }
        else{
          this.setState({ 
            ValidLandmark:true,
            ValidAddress:true,
          })
        }
      });
  }
 
  onChangeAddress = (text,selecttext) => {
    if(selecttext==true){
      this.setState({HouseAddress: text});
    }
    else{
      this.setState({HouseAddress: text});
      this.getdata(text,this.state.HouseAddress)
    }
  };
 
 
 
  addressUpdate = (item) => {
    this.onChangeAddress(item.description,true)
    this.setState({
    ValidAddress: false,
    HouseAddress:item.description,
    addressPlace_id:item.place_id,
    isShowingResults:false
    })
    this.getLatLong(item.description)
  }

  getLatLong = (address) => {
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`,
      })
      .then((response) => {
        this.setState({
          HouseAddress: response.data.results[0].formatted_address,
          address_lat: response.data.results[0].geometry.location.lat,
          address_lng: response.data.results[0].geometry.location.lng
        })
      }).catch((e) => {
        console.log(e.response); 
      });
  }

  onChangeTitle = (val) =>{
    this.setState({
      title: val
    })
    if (val==''|| val.length>5){
      this.setState({
        ValidTitle: false
      })
    }
    else{
      this.setState({
        ValidTitle: true
      })
    }
  }

  onChangeRent = (val) => {
      this.setState({
        HouseRent: val
      });
      if(val==='' || val>0)
      {
        this.setState({
          ValidRent: false
        });
      }
      else{
        this.setState({
          ValidRent: true
        });
      }
  }
 
  onChangeLease = (val) => {
    this.setState({
      LeasePeriod: val
    });
    if(val==='' || val>0)
    {
      this.setState({
        ValidLease: false
      });
    }
    else{
      this.setState({
        ValidLease: true
      });
    }
  }
 
  onChangeRooms = (val) => {
    this.setState({
      NumberOfBedrooms : val
    });
    if(val==='' || val>0)
    {
      this.setState({
        ValidRooms: false
      });
    }
    else{
      this.setState({
        ValidRooms: true
      });
    }
  }
  onChangeDescription = (val) => {
    this.setState({
      ListingDescription: val
    });
  }

  onClickMedia = async (index) => {
    // console.log('media clicked>>', index)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    const source=`data:image/jpg;base64,${result.base64}`
    // console.log('result>>>', result);
    // if(option === 'save') {
    //console.log("========",result.base64);

      let currentMedia_copy = [...this.state.media_item]

      currentMedia_copy.map((item, i) => {
      // console.log('current>.....', currentPrompt_copy[i], item)
      if (item?.index === index) {
        currentMedia_copy[i] = {
          ...item,
          image: result?.uri,
          uimage: source
        }
      }
    })

    this.setState({
      media_item: currentMedia_copy
    })
    // }

  }

  onDeleteMedia = (index) => {
    let currentMedia_copy = [...this.state.media_item]

    currentMedia_copy.map((item, i) => {
    // console.log('current>.....', currentPrompt_copy[i], item)
    if (item?.index === index) {
      currentMedia_copy[i] = {
        ...item,
        image: ""
      }
    }
  })

  this.setState({
    media_item: currentMedia_copy
  })
  }
  renderImagerender = () => {
    return (
      <View>
      <View style={[styles.lineStyle, {marginHorizontal: 20, borderColor: Color.grey}]} />
      <View style={{flex:1, flexDirection: 'row'}}>
        {this.state.media_item !== null && this.state.media_item.length > 1 && this.state.media_item.map((item, index) => {
          return (
            <View style={{ flex: 4 }} key={index}>
            {!item?.image ? 
              (<TouchableOpacity
                style={styles.media_view}
                onPress={() => this.onClickMedia(item?.index)}
              >
                <View style={styles.media_item}>
                    <Feather name='plus' color={Color.black} size={24} />
                </View>
              </TouchableOpacity> ):
              (
                <TouchableOpacity
                style={styles.media_view}
                onPress={() => this.onClickMedia(item?.index)}
              >
                <View style={styles.media_item_image}>
                <Image source={{ uri: item?.image }} style={{ width: 105, height: 110 }} />
                </View>
                </TouchableOpacity>
              )}
              {item?.image &&
                <TouchableOpacity style={{paddingLeft: 50}} onPress={() => this.onDeleteMedia(item?.index)}>
                    <MaterialIcons name='delete' color={Color.red} size={24} />
                </TouchableOpacity>
              }
            </View>
          )
        })}
      </View>
      </View>
    )
  }



onContentSizeChange = (contentWidth, contentHeight) => {
  // Save the content height in state
  this.setState({ screenHeight: contentHeight });
};
 
 
  render() {
    // const { state, actions } = this.props;
    const scrollEnabled=true
   return(
   
    <HideKeyboard>
    <SafeAreaView style={styles.con}>
    <ScrollView>
    <StatusBar/>
    
    {this.state.isLoading && <View style={styles.loading}>
        {<ActivityIndicator size='large' color={"black"} />}
      </View>
    }
    {!this.state.isLoading &&
    <View style={styles.container}>
     
        <View style={styles.inputView}>
            {(this.state.goal==1 || this.state.goal==3)&& this.state.title!='' && <Text style={styles.toptext}>House Title*</Text>}
            {(this.state.goal==1 || this.state.goal==3)&& this.state.title==='' && <View style={{margin:10}}></View>}
            {(this.state.goal==1 || this.state.goal==3)  &&
                  <TextInput
                    style={styles.input}
                    value={this.state.title}
                    onChangeText={(value) => this.onChangeTitle(value)}
                    placeholder="House Title *"
                    maxLength={40}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
            }
            
            {(this.state.goal==1 || this.state.goal==3)  && this.state.ValidTitle &&
                <Text style={styles.errorMsg}>please enter valid title it should be more than 5 characters</Text>
            }

            {(this.state.goal==1 || this.state.goal==3)&& this.state.HouseAddress!='' && <Text style={styles.toptext}>House Address*</Text>}
            {(this.state.goal==1 || this.state.goal==3)&& this.state.HouseAddress==='' && <View style={{margin:10}}></View>}
            {(this.state.goal==1 || this.state.goal==3)  &&
                  <TextInput
                    style={styles.input}
                    value={this.state.HouseAddress}
                    onChangeText={(value) => this.onChangeAddress(value)}
                    placeholder="House Address *"
                  />
            }
              {this.state.isShowingResults && (this.state.goal==1 || this.state.goal==3) &&
                <View>
                  {this.state.searchResults?.map((obj,i)=>{
                    return(
                      <TouchableOpacity
                            style={styles.input}
                            onPress={() => this.addressUpdate(obj)}>
                            <Text>{obj.description}</Text>
                          </TouchableOpacity>
                    )
                  })}
                
                  {/* <FlatList
                    data={this.state.searchResults}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={styles.input}
                          onPress={() => this.addressUpdate(item)}>
                          <Text>{item.description}</Text>
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={(item,index) => index}
                /> */}
                </View>
            }
 
            {(this.state.goal==1 || this.state.goal==3)  && this.state.ValidAddress &&
                    <Text style={styles.errorMsg}>please enter valid Address</Text>
            }
 
            {(this.state.goal==1 || this.state.goal==3)&& this.state.HouseRent!='' && <Text style={styles.toptext}>Rent in Dollars*</Text>}
            {(this.state.goal==1 || this.state.goal==3)&& this.state.HouseRent==='' && <View style={{margin:10}}></View>}
            { (this.state.goal==3 || this.state.goal==1) && 
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={(value) => this.onChangeRent(value)}
                    value={this.state.HouseRent}
                    maxLength={10}
                    placeholder="Rent in Dollars *"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            }
           
            {(this.state.goal==3 || this.state.goal==1) && this.state.ValidRent &&
                    <Text style={styles.errorMsg}>please enter valid Rent</Text>
            }
 
             
            {(this.state.goal==1 || this.state.goal==3)&& this.state.LeasePeriod!='' && <Text style={styles.toptext}>Lease Period In Months*</Text>}
            {(this.state.goal==1 || this.state.goal==3)&& this.state.LeasePeriod==='' && <View style={{margin:10}}></View>}
            { (this.state.goal==1 || this.state.goal==3) &&
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={(value) => this.onChangeLease(value)}
                    value={this.state.LeasePeriod}
                    maxLength={10}
                    placeholder="Lease Period In Months *"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            }
           
           
            {(this.state.goal==1 || this.state.goal==3) && this.state.ValidLease &&
                    <Text style={styles.errorMsg}>please enter valid Lease Period</Text>
            }
            
            {(this.state.goal==1 || this.state.goal==3)&& this.state.NumberOfBedrooms!='' && <Text style={styles.toptext}>Number of Bedrooms*</Text>}
            {(this.state.goal==1 || this.state.goal==3)&& this.state.NumberOfBedrooms==='' && <View style={{margin:10}}></View>}
            {(this.state.goal==1 || this.state.goal==3) &&
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={(value) => this.onChangeRooms(value)}
                    value={this.state.NumberOfBedrooms}
                    maxLength={10}
                    placeholder="Number of Bedrooms *"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            }
           
            {this.state.goal==3 && this.state.ValidRooms &&
                    <Text style={styles.errorMsg}>please enter valid Number of Bedrooms</Text>
            }


            {(this.state.goal==1 || this.state.goal==3)&& this.state.ListingDescription!='' && <Text style={styles.toptext}>Description of Listing*</Text>}
            {(this.state.goal==1 || this.state.goal==3)&& this.state.ListingDescription==='' && <View style={{margin:10}}></View>}
            {(this.state.goal==3 || this.state.goal==1) &&
                <TextInput
                    style={styles.textbox}
                    multiline={true}
                    numberOfLines={5}
                    value={this.state.ListingDescription}
                    onChangeText={(value) => this.onChangeDescription(value)}
                    maxLength={225}
                    placeholder="Description of Listing"
                    autoCapitalize="none"
                    autoCorrect={false} 
                /> 
            }

          <View style={{marginTop:10, marginBottom:10}}>{this.renderImagerender()}</View>

          {/* <View style={{marginTop:80}}> */}
          <View style={[styles.buttonView, {marginTop:50}]}>
 
           { (this.state.goal==3 && this.state.ValidAddress === false && this.state.ValidRent === false &&  this.state.ValidLease === false &&  this.state.ValidRooms === false && this.state.HouseAddress != '' && this.state.HouseRent != 0 &&  this.state.LeasePeriod != 0 &&  this.state.NumberOfBedrooms != 0 && this.state.ValidTitle === false && this.state.title.length>=5) ||
              (this.state.goal==1 && this.state.ValidAddress === false && this.state.ValidRent === false &&  this.state.ValidLease === false &&  this.state.ValidRooms === false && this.state.HouseAddress != '' && this.state.HouseRent != 0 &&  this.state.LeasePeriod != 0 &&  this.state.NumberOfBedrooms != 0 && this.state.ValidTitle === false && this.state.title.length>=5)?
           (
                <TouchableWithoutFeedback
                onPress={()=>this.onClickADDListing(this.props)}
                >
                <Text style={[styles.nextbutton,{backgroundColor: Color.black}]}>ADD Listing</Text>
               </TouchableWithoutFeedback>
               
           ): (
               <TouchableWithoutFeedback disabled>
                <Text style={[styles.nextbutton,{backgroundColor: Color.grey}]}>ADD Listing</Text>
               </TouchableWithoutFeedback>
           )
           }
           {/* <TouchableWithoutFeedback
                onPress={()=>this.onClickADDListing(this.props)}
                >
                <Text style={[styles.nextbutton,{backgroundColor: Color.black}]}>ADD Listing</Text>
               </TouchableWithoutFeedback> */}
           
        </View>
        <View style={{margin:20}}>
        </View>
       
      </View>
     </View>
      }
      </ScrollView>
     </SafeAreaView>
     </HideKeyboard>
   )
   
  }
}
 
 
 
const styles = StyleSheet.create({
   
  container: {
    marginTop: 40,
    alignItems:'center'    
},
resultItem: {
  width: '100%',
  justifyContent: 'center',
  height: 40,
  borderBottomColor: '#ccc',
  borderBottomWidth: 1,
  paddingLeft: 15,
},
con:{
    flex :1,
    //backgroundColor:'white'
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
},
scrollview:{
  flexGrow:1
},
buttonView: {
  left: '12.62%',
    height: 40,
    marginTop: 60,
    width: '80%',
    // backgroundColor: Color.black,
    borderRadius: 5,
},
inputView: {
  width: '90%'
},
input: {
  height: 40,
  borderWidth: 2,
  padding: 10,
},
inputlist: {
  height: 40,
  borderWidth: 1,
  padding: 10,
  marginTop:20
},
passwordStyle: {
 marginTop:15,
  flex:1,
  height: 40,
  borderWidth: 2,
  padding: 10,
},
toptext:{
  fontSize:12,
  marginTop:5
},
errorMsg: {
 
color: '#FF0000',
fontSize: 12,
},
iconStyle: {
position:'absolute',
top: '50%',left: '90%'
},
buttonView:{
borderWidth: 2,
top:'5%',
width:'100%',
height:40,
// left:'12.62%',
backgroundColor:'black'
 
},
already_reg: {
marginTop: 50,
height: 30,
left:'57%',
},
nextbutton:
{
color: Color.white,
fontSize: 12,
textAlign: 'center',
padding: 10
},
textbox: {
  height: 100,
  borderWidth: 2,
  padding: 10,
  justifyContent: "flex-start"
},
avatar: {
  paddingTop: 20,
  height: 100,
  width: 100,
  borderRadius: 100,
  padding: 20,
},

options: {
  backgroundColor: 'white',
  flexDirection: 'row',
  borderTopRightRadius: 30,
  borderTopLeftRadius: 30,
},
option: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
media_view: {
  borderColor: '#D3D3D3',
  backgroundColor:'#D3D3D3',
  borderWidth: 1,
  // borderRadius: 5,
  height: 110,
  marginTop: 10,
  marginHorizontal: 10,
  // marginVertical: 10,
  width: 105
},
media_item: {
  // flex: 1,
  flexDirection: 'row',
  // borderBottomWidth: 1,
  // borderBottomColor: Color.grey,
  padding: 40,
  // marginHorizontal: 16,
},
media_item_image: {
  flexDirection: 'row',
  // padding: 40,
},
});
 
function mapStateToProps(state) {
  return {
    data_values: state,
    AddListingapiMsg:state.AddListingapiMsg,
  };
}
const mapDispatchToProps={
  AddListingRequest,
  AddListingChange,
}
export default connect(mapStateToProps, mapDispatchToProps)(AddListing);
