import React, { Component } from 'react';
import { Keyboard, View, StyleSheet, TextInput, FlatList,TouchableOpacity, Text, TouchableWithoutFeedback,ScrollView,Dimensions,SafeAreaView,StatusBar,ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../contants/Colors';
import Divider from '../components/Divider';
import Title from '../components/Title';
const { height } = Dimensions.get('window');
import axios from "axios";
const API_KEY = 'AIzaSyDn2c2t_lVF2zphfPHh17roHm630kirXX8'
import { connect } from 'react-redux';
import {registrationRequest} from '../actions/RegistrationAction';
import { preventAutoHideAsync } from 'expo-splash-screen';
import { YahooFilled } from '@ant-design/icons';
import { loginRequest } from '../actions/LoginActions';
import { TouchableHighlightBase } from 'react-native';
import ThemedListItem from 'react-native-elements/dist/list/ListItem';

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class GetStarted21 extends Component {
 
  constructor(props) {
    super(props);
    //this.state.goal=text
    this.state = {
      isLoading: false,
      goal : this.props.data_values?.current_goal,
      email: this.props.data_values?.email,
      password: this.props.data_values.password,
      title:'',
      HouseAddress: '',
      Landmark: '',
      HouseRent: '',
      MonthlyBudget: '',
      LeasePeriod: '',
      Radius: '',
      NumberOfBedrooms: '',
      ValidAddress: '',
      ValidRent: '',
      ValidLease: '',
      ValidRooms: '',
      ValidLandmark: '',
      ValidBudget: '',
      ValidRadius: '',
      ValidTitle: '',
      searchResults: [],
      isShowingResults: false,
      screenHeight: 0,
      addressPlace_id:'',
      landmarkPlace_id:'',
      checked_address: '',
      checked_landmark:'',
      address_lat:'',
      address_lng:'',
      search_lat:'',
      search_lng:''
  };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Rendering the component only if passed props value is changed
    console.log('nextProps', nextProps.registrationapiMsg, this.props.registrationapiMsg);
    // console.log('nextState', nextState.emailText, this.state.emailText);
    if (nextProps.registrationapiMsg !== this.props.registrationapiMsg) {
        if(nextProps.registrationapiMsg === 'success') {
            const payload = {
              username: this.state.email,
              password: this.state.password
            };
            console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,",payload)
            this.props.loginRequest(payload);
        } else if(nextProps.registrationapiMsg === 'error'){
                this.props.navigation.navigate('Login');
                alert(`Registration failed`);

            }
      return true;
    }
    else if (nextProps.loginapiMsg !== this.props.loginapiMsg) {
      if(nextProps.loginapiMsg === 'success') {
          this.setState({isLoading:false})
          this.props.navigation.navigate('Rentals&Friends');
      } else if(nextProps.loginapiMsg === 'error'){
              alert("Information does not match");
          }
    return true;
  }
    if(nextState !== this.state) {
        return true;
    }
      return false;
  }

  onClickAllSet=(props) =>
  {
      if ((this.state.goal==3 && this.state.ValidAddress === false && this.state.ValidRent === false && this.state.ValidLease === false && this.state.ValidRooms === false && this.state.ValidTitle === false) ||
          (this.state.goal==2 && this.state.ValidLandmark === false && this.state.ValidBudget === false && this.state.ValidRadius === false) ||
          (this.state.goal==1 && this.state.ValidAddress === false && this.state.ValidRent === false && this.state.ValidLease === false && this.state.ValidRooms === false && this.state.ValidTitle === false)){
        
        this.setState({isLoading: true});
            
        console.log(this.props.data_values,"this is console ")
        const payload={
          name: this.props.data_values?.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.props.data_values?.password_confirmation,
          dob: this.props.data_values?.dob,
          gender: this.props.data_values?.gender,
          current_goal: this.props.data_values?.current_goal,
          title: this.state.title,
          address_for_listing: this.state.HouseAddress,
          address_place_id: this.state.addressPlace_id,
          monthly_rent: this.state.HouseRent,
          address_lat: this.state.address_lat,
          address_lng: this.state.address_lng,
          number_of_bedrooms: this.state.NumberOfBedrooms,
          lease_duration: this.state.LeasePeriod,
          landmark_for_search: this.state.Landmark,
          monthly_budget: this.state.MonthlyBudget,
          search_lat: this.state.search_lat,
          search_lng: this.state.search_lng,
          search_radius: this.state.Radius
        }
        console.log("HIHIHIHIHIHIHHI", payload)
        this.props.registrationRequest(payload);
        //this.props.navigation.navigate('Rentals&Friends');
      }
      else {
        alert('Checkallvalues');
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

  VirtualizedView(props) {
    return (
      <FlatList
        data={[]}
        ListEmptyComponent={null}
        keyExtractor={() => "dummy"}
        renderItem={null}
        ListHeaderComponent={() => (
          <React.Fragment>{props.children}</React.Fragment>
        )}
      />
    );
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
 
  onChangeLandmark = (text,selecttext) => {
    if(selecttext==true){
      this.setState({Landmark: text});
    }
    else{
      this.setState({Landmark: text});
      this.getdata(text,this.state.Landmark)
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
 
  LandmarkUpdate = (item) => {
    this.onChangeLandmark(item.description,true)
    this.setState({
    ValidLandmark: false,
    Landmark:item.description,
    landmarkPlace_id:item.place_id,
    isShowingResults:false
    })
    this.getSearchLatLong(item.description)
  }

  getSearchLatLong = (address) => {
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`,
      })
      .then((response) => {
        this.setState({
          landmark: response.data.results[0].formatted_address,
          search_lat: response.data.results[0].geometry.location.lat,
          search_lng: response.data.results[0].geometry.location.lng
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
 
  onChangeBudget = (val) => {
      this.setState({
        MonthlyBudget: val
      });
      if(val==='' || val>0)
      {
        this.setState({
          ValidBudget: false
        });
      }
      else{
        this.setState({
          ValidBudget: true
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
 
  onChangeRadius = (val) => {
    this.setState({
      Radius: val
    });
    if(val==='' || val>0)
    {
      this.setState({
        ValidRadius: false
      });
    }
    else{
      this.setState({
        ValidRadius: true
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
 
onContentSizeChange = (contentWidth, contentHeight) => {
  // Save the content height in state
  this.setState({ screenHeight: contentHeight });
};
 
 
  render() {
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
        <View style={{top: '1%',left:'12.6%'}}>
            <Title textMsg={'Get Started!'}/>
            <Text style={styles.smallText1}>Step 2.1</Text>
            <Text style={styles.smallText2}>Apartment Information</Text> 
        </View>

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
 
           
            {(this.state.goal==2)&& this.state.Landmark!='' && <Text style={styles.toptext}>Landmark*</Text>}
            {(this.state.goal==2)&& this.state.Landmark==='' && <View style={{margin:10}}></View>}
            {(this.state.goal==2)  &&
                  <TextInput
                    style={styles.input}
                    value={this.state.Landmark}
                    onChangeText={(value) => this.onChangeLandmark(value)}
                    placeholder="Landmark *"
                  />
            }
              {this.state.isShowingResults && (this.state.goal==2) &&
                  <FlatList
                    data={this.state.searchResults}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={styles.input}
                          onPress={() => this.LandmarkUpdate(item)}>
                          <Text>{item.description}</Text>
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={(item,index) => index}
                />
             
 
            }
 
           
            {this.state.goal==2 && this.state.ValidLandmark &&
                    <Text style={styles.errorMsg}>please enter valid Landmark</Text>
            }
               
            {(this.state.goal==1 || this.state.goal==3)&& this.state.HouseRent!='' && <Text style={styles.toptext}>Rent in Dollars*</Text>}
            {(this.state.goal==1 || this.state.goal==3)&& this.state.HouseRent==='' && <View style={{margin:10}}></View>}
           
            { (this.state.goal==3 || this.state.goal==1)&&
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={this.state.HouseRent}
                    onChangeText={(value) => this.onChangeRent(value)}
                    maxLength={10}
                    placeholder="Rent in Dollars *"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            }
           
            {(this.state.goal==3 || this.state.goal==1 )&& this.state.ValidRent &&
                    <Text style={styles.errorMsg}>please enter valid House Rent</Text>
            }
               
           
            {(this.state.goal==2)&& this.state.MonthlyBudget!='' && <Text style={styles.toptext}>Monthly Budget*</Text>}
            {(this.state.goal==2)&& this.state.MonthlyBudget==='' && <View style={{margin:10}}></View>}
            { this.state.goal==2 &&
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={this.state.MonthlyBudget}
                    onChangeText={(value) => this.onChangeBudget(value)}
                    maxLength={10}
                    placeholder="Monthly Budget *"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            }
           
           
            {this.state.goal==2 && this.state.ValidBudget &&
                    <Text style={styles.errorMsg}>please enter valid Monthly Budget</Text>
            }
             
            {(this.state.goal==1 || this.state.goal==3)&& this.state.LeasePeriod!='' && <Text style={styles.toptext}>Lease Period In Months*</Text>}
            {(this.state.goal==1 || this.state.goal==3)&& this.state.LeasePeriod==='' && <View style={{margin:10}}></View>}
            { (this.state.goal==1 || this.state.goal==3) &&
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={this.state.LeasePeriod}
                    onChangeText={(value) => this.onChangeLease(value)}
                    maxLength={10}
                    placeholder="Lease Period In Months *"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            }
           
           
            {(this.state.goal==1 || this.state.goal==3) && this.state.ValidLease &&
                    <Text style={styles.errorMsg}>please enter valid Lease Period</Text>
            }
               
           
            {(this.state.goal==2)&& this.state.Radius!='' && <Text style={styles.toptext}>Radius in Miles*</Text>}
            {(this.state.goal==2)&& this.state.Radius==='' && <View style={{margin:10}}></View>}
            { (this.state.goal==2) &&
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={this.state.Radius}
                    onChangeText={(value) => this.onChangeRadius(value)}
                    maxLength={10}
                    placeholder="Radius in Miles *"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            }
           
           
            {this.state.goal==2 && this.state.ValidRadius &&
              <View style={{marginTop:10}}>
                    <Text style={styles.errorMsg}>please enter valid Radius</Text>
              </View>
            }
 
            {(this.state.goal==1 || this.state.goal==3)? ((this.state.NumberOfBedrooms!='') ? (<Text style={styles.toptext}>Number of Bedrooms*</Text>):(<View style={{margin:10}}></View>)):null}
            {(this.state.goal==1 || this.state.goal==3) &&
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={this.state.NumberOfBedrooms}
                    onChangeText={(value) => this.onChangeRooms(value)}
                    maxLength={10}
                    placeholder="Number of Bedrooms *"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            }
           
            {this.state.goal==3 && this.state.ValidRooms &&
                    <Text style={styles.errorMsg}>please enter valid Number of Bedrooms</Text>
            }
               
 
          <View style={{marginTop:100}}>
          <View style={styles.buttonView}>
 
           { (this.state.goal==3 && this.state.ValidAddress === false && this.state.ValidRent === false &&  this.state.ValidLease === false &&  this.state.ValidRooms === false && this.state.HouseAddress != '' && this.state.HouseRent != 0 &&  this.state.LeasePeriod != 0 &&  this.state.NumberOfBedrooms != 0 && this.state.ValidTitle === false && this.state.title.length>=5) ||
              (this.state.goal==1 && this.state.ValidAddress === false && this.state.ValidRent === false &&  this.state.ValidLease === false &&  this.state.ValidRooms === false && this.state.HouseAddress != '' && this.state.HouseRent != 0 &&  this.state.LeasePeriod != 0 &&  this.state.NumberOfBedrooms != 0 && this.state.ValidTitle === false && this.state.title.length>=5) ||
              (this.state.goal==2 && this.state.ValidLandmark === false && this.state.ValidBudget === false &&  this.state.ValidRadius === false && this.state.Landmark != '' && this.state.MonthlyBudget != 0 &&  this.state.Radius != 0)?
           (
                <TouchableWithoutFeedback
                onPress={()=>this.onClickAllSet(this.props)}
                >
                <Text style={[styles.nextbutton,{backgroundColor: Color.black}]}>I'M ALL SET</Text>
               </TouchableWithoutFeedback>
               
           ): (
               <TouchableWithoutFeedback disabled>
                <Text style={[styles.nextbutton,{backgroundColor: Color.grey}]}>I'M ALL SET</Text>
               </TouchableWithoutFeedback>
           )
           }
           
        </View>
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
    flex: 1,
    // marginTop: 40,
    margin: '5%',
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
    backgroundColor:'white'
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
  marginTop: 50,
  width: '80%'
},
input: {
  height: 40,
  borderWidth: 2,
  padding: 10,
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
fontSize: 15,
textAlign: 'center',
padding: 10
}
});
 
function mapStateToProps(state) {
  return {
    data_values: state,
    registrationapiMsg: state.registrationapiMsg,
    loginapiMsg: state.loginapiMsg,
    registrationerror: state.registrationerror
  };
}
 
const mapDispatchToProps={
  registrationRequest,
  loginRequest
}
 
// export default connect(mapStateToProps, mapDispatchToProps)(initialScreen);
 
export default connect(mapStateToProps, mapDispatchToProps)(GetStarted21);
 
 
 

