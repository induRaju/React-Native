import React, { Component } from 'react';
import { Keyboard, Image, ImageProps, Pressable, View, StyleSheet, TextInput, FlatList,TouchableOpacity, Text, TouchableWithoutFeedback,ScrollView,Dimensions,SafeAreaView,StatusBar, ActivityIndicator, ActionSheetIOS, TouchableHighlightBase} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../contants/Colors';
import Divider from '../components/Divider';
import Title from '../components/Title';
const { height } = Dimensions.get('window');
import axios from "axios";
const API_KEY = 'AIzaSyDn2c2t_lVF2zphfPHh17roHm630kirXX8';
import { connect } from 'react-redux';
import {ViewListingRequest} from '../actions/ViewListingAction';
import {DeleteListingRequest} from '../actions/DeleteListingAction';
import {UpdateListingRequest, ListingsMediaDelete,ListingsMediaUpdate} from '../actions/UpdateListingAction';
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

class EditListing extends Component {

  constructor(props) {
    super(props);
    //this.state.goal=text
    this.state = {
      isLoading: false,
      auth_token: "",
      current_edit_listing_id: "",
      goal : this.props.data_values?.home_goal,
      HouseAddress: "",
      HouseRent: '',
      RoomRent: '',  
      LeasePeriod: "",
      NumberOfBedrooms: "",
      ListingDescription: "",
      ValidAddress: false,
      ValidRent: false,
      ValidLease: false,
      ValidRooms: false,
      ValidTitle: false,
      ValidDescription: false,
      isShowingResults: false,
      screenHeight: 0,
      addressPlace_id: "",
      title: "",
      media:true,
      deleted_media: [],
      updated_media:[],
      media_item: [
        {
          index: 1,
          uri: null,
          id: null,
          location: null,
          uimage: "",
          img_0: null
        },
        {
          index: 2,
          uri: null,
          id: null,
          location: null,
          uimage: "",
          img_1: null
        },
        {
          index: 3,
          uri: null,
          id: null,
          location: null,
          uimage: "",
          img_2: null
        }
      ],
  };
  }

  componentDidMount(){

    const payload={
      Authorization:this.props.data_values?.Authorization,
      listing_id: this.props.data_values?.current_edit_listing_id,
    }
    this.props.ViewListingRequest(payload);
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("delete and update",nextProps.listingsMediaDeleteApiMsg,nextProps.listingsMediaApiMsg)
    if (nextProps.ViewListingapiMsg !== this.props.ViewListingapiMsg) {
        if(nextProps.ViewListingapiMsg === 'success') {
            this.setState({
                HouseAddress:nextProps.current_listing_data.listing.address_for_listing,
                address_lat:nextProps.current_listing_data.listing.address_lat,
                address_lng: nextProps.current_listing_data.listing.address_lng,
                place_id: nextProps.current_listing_data.listing.place_id,
                ListingDescription : nextProps.current_listing_data.listing.about_listing,
            })
            this.onChangeTitle(nextProps.current_listing_data?.listing.title);
            this.onChangeRooms(nextProps.current_listing_data?.listing.number_of_bedrooms);
            this.onChangeRent(nextProps.current_listing_data.listing?.monthly_rent);
            this.onChangeLease(nextProps.current_listing_data.listing?.lease_duration);
        } else if(nextProps.ViewListingapiMsg === 'error'){
                alert("Update Listing page was not successful loaded");
            }
      return true;
    }
    else if(nextProps.listingsMediaDeleteApiMsg !== this.props.listingsMediaDeleteApiMsg){
      if(nextProps.listingsMediaDeleteApiMsg === 'success'){
        console.log("listing media deleted")
        let updateMedia ={
          img: this.state.updated_media,
          listing_id: this.props.current_listing_data.listing.id,
          Authorization: this.props.data_values?.Authorization
        }
        this.props.ListingsMediaUpdate(updateMedia);
      }
      else if(nextProps.listingsMediaDeleteApiMsg === 'error'){
        alert("eroor occoured when deleting images");
      }
    }
    else if(nextProps.listingsMediaApiMsg !== this.props.listingsMediaApiMsg){
      if(nextProps.listingsMediaApiMsg === 'success'){
        console.log("listing media updated")
        const payload={
          Authorization: this.props.data_values.Authorization,
          title: this.state.title,
          address_for_listing: this.state.HouseAddress,
          place_id: this.state.addressPlace_id,
          monthly_rent: this.state.HouseRent,
          address_lat: this.state.address_lat,
          address_lng: this.state.address_lng,
          number_of_bedrooms: this.state.NumberOfBedrooms,
          lease_duration: this.state.LeasePeriod,
          about_listing: this.state.ListingDescription,
          img_0: "",
          img_1: "",
          img_2: "",
          listing_id: this.props.data_values?.current_edit_listing_id,
        }
        console.log(payload);
        this.props.UpdateListingRequest(payload)
      }
      else if(nextProps.listingsMediaApiMsg === 'error'){
        alert("eroor occoured when updating images");
      }
    }
    else if(nextProps.UpdateListingapiMsg !== this.props.UpdateListingapiMsg){
        if(nextProps.UpdateListingapiMsg === 'success') {
            this.setState({isLoading:false})
            this.props.navigation.navigate('Listing');
        } else if(nextProps.UpdateListingapiMsg === 'error'){
                alert("error occured when Updating Listing");
            }
      return true;
    }
    else if (nextProps.DeleteListingapiMsg !== this.props.DeleteListingapiMsg){
        if(nextProps.DeleteListingapiMsg === 'success') {
            this.setState({isLoading:false})
            this.props.navigation.navigate('Listing');
        } else if(nextProps.DeleteListingapiMsg === 'error'){
                alert("error occured when Updating Listing");
            }
      return true;
    }
    if(nextState !== this.state) {
        console.log("new one!......");
        return true;
    }
      return false;
  }



  onClickUpdateListing=(props) =>
  {
      if ((this.state.goal==3 && this.state.ValidAddress === false && this.state.ValidRent === false && this.state.ValidLease === false && this.state.ValidRooms === false && this.state.ValidTitle === false) ||
          (this.state.goal==1 && this.state.ValidAddress === false && this.state.ValidRent === false && this.state.ValidLease === false && this.state.ValidRooms === false && this.state.ValidTitle === false)){
        
        this.setState({isLoading: true});
        this.props.navigation.setOptions({headerShown: false});
        if(this.state.deleted_media.length>0){
          delete_media = {
            media_id: this.state.deleted_media,
            listing_id:this.props.data_values.current_listing_data.listing.id,
            Authorization: this.props.data_values?.Authorization
          }
          this.props.ListingsMediaDelete(delete_media);
        }
        
        let update_media=[];
          const media=this.state.media_item;
          for(let i=0; i<3; i++){
            if (media[i].uimage!=''){
              update_media.push(media[i].uimage);
            }
        }

        this.state.updated_media=update_media;
        if (this.state.deleted_media.length===0 && this.state.updated_media.length>0){
          let updateMedia ={
            img: this.state.updated_media,
            listing_id: this.props.current_listing_data.listing.id,
            Authorization: this.props.data_values?.Authorization
          }
          this.props.ListingsMediaUpdate(updateMedia);
        }
        
        if(this.state.updated_media.length===0 && this.state.deleted_media.length===0){ 
          const payload={
            Authorization: this.props.data_values.Authorization,
            title: this.state.title,
            address_for_listing: this.state.HouseAddress,
            place_id: this.state.addressPlace_id,
            monthly_rent: this.state.HouseRent,
            address_lat: this.state.address_lat,
            address_lng: this.state.address_lng,
            about_listing: this.state.ListingDescription,
            number_of_bedrooms: this.state.NumberOfBedrooms,
            lease_duration: this.state.LeasePeriod,
            img_0: "",
            img_1: "",
            img_2: "",
            listing_id: this.props.data_values?.current_edit_listing_id,
          }
          console.log(payload);
          this.props.UpdateListingRequest(payload)
        };
      }
      else {
        alert(Checkallvalues);
      }
  }
 
 onClickDeleteListing=(props) =>
 {  
  this.setState({isLoading: true});
  this.props.navigation.setOptions({headerShown: false});
    const payload={
        Authorization: this.props.data_values?.Authorization,
        listing_id: this.props.data_values?.current_edit_listing_id,
    }
    this.props.DeleteListingRequest(payload);

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
    //console.log("hello ",text,selecttext);
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
    if (val==''|| (val && val.length>5)){
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

  renderImagerender = () => {
    const { current_listing_data } = this.props;
    let listings_media;
    if (current_listing_data !== null && current_listing_data?.media !== null && current_listing_data?.media?.length > 0) {
      listings_media = current_listing_data?.media;
      listings_media?.map((image, i) => {
        //console.log('profile_media>>', listings_media[i])
        listings_media[i] = {
          ...image,
          index: i + 1
        }
      })
    }
    // console.log('profile_media>>>111', profile_media, this.state.media_item);
     let media_copy = [...this.state.media_item]
     let temp_deleted_media=[...this.state.deleted_media];
     
     media_copy.map((item, i) => {
      return listings_media?.map((image) => {
        // console.log('media_item>>>111', image?.index, item?.index);
        if(image?.index === item?.index && (temp_deleted_media.includes(item?.id)==false)) {
          media_copy[i] = {
            ...item,
            uri: image?.uri,
            id: image?.id,
            location: 'API'
          }
        }
      })
    })
    
    return (
      <View>
        <View style={{borderColor: Color.grey}} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {media_copy !== null && media_copy !== '' && media_copy?.length > 1 && media_copy.map((item, index) => {
            {/* console.log('promt item>>>', item); */ }
            return (
              <View style={{ flex: 4 }} key={index}>
                {/* {this.renderImage(item, profile_media)} */}
                {!item?.uri?
                    <TouchableOpacity
                      style={styles.media_view}
                      onPress={() => this.onClickMedia(item?.index, media_copy)}
                    >
                      <View style={styles.media_item}>
                        <Feather name='plus' color={Color.black} size={24} />
                      </View>
                    </TouchableOpacity>
                    :
                      <TouchableOpacity
                      style={styles.media_view}
                      onPress={() => this.onClickMedia(item?.index, media_copy)}
                    >
                      <View style={styles.media_item_image}>
                        <Image source={{ uri: item?.location === null ? item?.uri : "https://d138zt7ce8doav.cloudfront.net/".concat(item.uri) }} style={{ width: 105, height: 110 }} />
                      </View>
                    </TouchableOpacity>
                  }
                {item?.uri &&
                  <TouchableOpacity style={{ paddingLeft: 50 }} onPress={() => this.onDeleteMedia(item?.index, media_copy)}>
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

  onClickMedia = async (index, media_copy) => {
    console.log('media clicked>>', index)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    const uimage = `data:image/jpg;base64,${result.base64}`;
    //console.log('result>>>', result);
    // if(option === 'save') {
    // let updateMedia = {
    //   img_0: '',
    //   img_1: '',
    //   img_2: ''
    // };
    let currentMedia_copy = [...media_copy]
    let temp_deleted_media=[...this.state.deleted_media];
    currentMedia_copy.map((item, i) => {
      if (item?.index === index) {
        if(item.location==='API'){temp_deleted_media.push(item?.id)}
        currentMedia_copy[i] = {
          ...item,
          uri: result?.uri,
          uimage: uimage,
          location: null,
        }
      } 
    })
    //console.log('currentMedia_copy>>', currentMedia_copy)
    currentMedia_copy.map((item, i) => {
    // const base64 = FileSystem.readAsStringAsync(item?.uri, { encoding: 'base64' });
    // console.log('base64>>>', base64);

      // if(item?.index === 1) {
      //   updateMedia = {
      //     ...updateMedia,
      //     img_0: item?.uimage || item?.uri
      //   }
      // }
      // if(item?.index === 2) {
      //   updateMedia = {
      //     ...updateMedia,
      //     img_1: item?.uimage || item?.uri
      //   }
      // }
      // if(item?.index === 3) {
      //   updateMedia = {
      //     ...updateMedia,
      //     img_2: item?.uimage || item?.uri
      //   }
      // }
    })

    this.setState({
      media_item: currentMedia_copy,
      deleted_media: temp_deleted_media
    })
    // }

  }

  onDeleteMedia = (index, media_copy) => {
    let currentMedia_copy = [...media_copy]
    let delete_media;
    let temp_deleted_media=[...this.state.deleted_media];
    currentMedia_copy.map((item, i) => {
      // console.log('current>.....', currentPrompt_copy[i], item)
      if (item?.index === index) {
        currentMedia_copy[i] = {
          ...item,
          uri: null,
          uimage: "",
          location: null,
        }
        if(item.location=='API'){temp_deleted_media.push(item?.id)}
      }
    })
    this.setState({
      media_item: currentMedia_copy,
      deleted_media: temp_deleted_media
    })
  }









onContentSizeChange = (contentWidth, contentHeight) => {
  // Save the content height in state
  this.setState({ screenHeight: contentHeight });

};



  render() {
    
    // const { state, actions } = this.props;
    console.log(this.state.deleted_media);
    //console.log("????????????????????????????????????????????????????????????????????",this.state.media_item);
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
                    <Text style={styles.errorMsg}>please enter valid title</Text>
            }

            {(this.state.goal==1 || this.state.goal==3)&& this.state.HouseAddress!='' && <Text style={styles.toptext}>House Address*</Text>}
            {(this.state.goal==1 || this.state.goal==3)&& this.state.HouseAddress==='' && <View style={{margin:10}}></View>}
            {(this.state.goal==1 || this.state.goal==3)  &&
                  <TextInput
                    style={styles.input}
                    value={this.state.HouseAddress}
                    onChangeText={(value) => this.onChangeAddress(value)}
                    placeholder="House Address *"
                    //editable={this.state.goal==3}
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
                    value={this.state.HouseRent?.toString()}
                    onChangeText={(value) => this.onChangeRent(value)}
                    maxLength={10}
                    placeholder="House Rent in Dollars *"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            }
           
            {(this.state.goal==3 || this.state.goal==1) && this.state.ValidRent &&
                    <Text style={styles.errorMsg}>please enter valid House Rent</Text>
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
        <View style={{marginTop:50}}>
          <View style={styles.buttonView}>
 
           { (this.state.goal==3 && this.state.ValidAddress === false && this.state.ValidRent === false &&  this.state.ValidLease === false &&  this.state.ValidRooms === false && this.state.HouseAddress != '' && this.state.HouseRent != 0 &&  this.state.LeasePeriod != 0 &&  this.state.NumberOfBedrooms != 0 && this.state.ValidTitle === false && this.state.title!='') ||
              (this.state.goal==1 && this.state.ValidAddress === false && this.state.ValidRent === false &&  this.state.ValidLease === false &&  this.state.ValidRooms === false && this.state.HouseAddress != '' && this.state.HouseRent != 0 &&  this.state.LeasePeriod != 0 &&  this.state.NumberOfBedrooms != 0 && this.state.ValidTitle === false && this.state.title !='')?
           (
                <TouchableWithoutFeedback
                onPress={()=>this.onClickUpdateListing(this.props)}
                >
                <Text style={[styles.nextbutton,{backgroundColor: Color.black}]}>Update Listing</Text>
               </TouchableWithoutFeedback>
               
           ): (
               <TouchableWithoutFeedback disabled>
                <Text style={[styles.nextbutton,{backgroundColor: Color.grey}]}>Update Listing</Text>
               </TouchableWithoutFeedback>
           )
           }
          </View>
        </View>
        { this.state.goal==3 &&
            <View style={{marginTop:10}}>
                <View style={styles.buttonView}>
                    <TouchableWithoutFeedback
                            onPress={()=>this.onClickDeleteListing(this.props)}
                            >
                            <Text style={[styles.nextbutton,{backgroundColor: Color.pink}]}>Delete Listing</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        }
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
    marginTop:40,
    flex: 1,
    // marginTop: 40,
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
}
,
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
fontSize: 14,
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
  height: 50,
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
    ViewListingapiMsg: state.ViewListingapiMsg,
    UpdateListingapiMsg: state.UpdateListingapiMsg,
    DeleteListingapiMsg: state.DeleteListingapiMsg,
    current_listing_data: state.current_listing_data,
    listingsMediaDeleteApiMsg: state.listingsMediaDeleteApiMsg,
    listingsMediaApiMsg: state.listingsMediaApiMsg,
  };
}
const mapDispatchToProps={
  ViewListingRequest,
  UpdateListingRequest,
  DeleteListingRequest,
  ListingsMediaDelete,
  ListingsMediaUpdate,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditListing);
