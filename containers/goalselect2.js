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
import {goalChangeRequest} from '../actions/PreferencesEditActions'
import { logoutRequest } from '../actions/LogoutAction';
const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class GoalSelecter2 extends Component {
 
  constructor(props) {
    super(props);
    //this.state.goal=text
    this.state = {
      isLoading: false,
      Landmark: '',
      MonthlyBudget: 0,
      Radius: 0,
      ValidLandmark: '',
      ValidBudget: '',
      ValidRadius: '',
      searchResults: [],
      isShowingResults: false,
      screenHeight: 0,
      landmarkPlace_id:'',
      checked_landmark:'',
      search_lat:'',
      search_lng:''
  };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Rendering the component only if passed props value is changed
    // console.log('nextState', nextState.emailText, this.state.emailText);
    console.log("kjgoalapi",nextProps.goalChangeApiMsg,this.props.goalChangeApiMsg)
    if (nextProps.goalChangeApiMsg !== this.props.goalChangeApiMsg) {
        if(nextProps.goalChangeApiMsg === 'success' || nextProps.goalChangeApiMsg === 'changed') {
          this.props.logoutRequest({Authorization: this.props.data_values?.Authorization});
        } else if(nextProps.registrationapiMsg === 'error'){
                alert("Goal change was not successful");
            }
      return true;
    }
    else if (nextProps.logoutapiMsg !== this.props.logoutApiMsg) {
      if (nextProps.logoutApiMsg === 'success') {
        this.setState({isLoading:false})
        alert("You have signed out");
        this.props.navigation.navigate('Login');
        return true;
      } else if (nextProps.loginapiMsg === 'error') {
        alert("Logout is not successful");
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
      if (this.state.ValidLandmark === false && this.state.ValidBudget === false && this.state.ValidRadius === false){
        this.setState({isLoading: true});
        this.props.navigation.setOptions({headerShown: false});
        const payload={
            Authorization:this.props.data_values?.Authorization,
            goal_id: 2,
            landmark_for_search: this.state.Landmark,
            place_id: this.state.landmarkPlace_id,
            search_lat: this.state.search_lat,
            search_lng: this.state.search_lng,
            search_radius: this.state.Radius,
            monthly_budget: this.state.MonthlyBudget 
        }
        console.log("HIHIHIHIHIHIHHI", payload)
        this.props.goalChangeRequest(payload);
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
 

 
  onChangeLandmark = (text,selecttext) => {
    if(selecttext==true){
      this.setState({Landmark: text});
    }
    else{
      this.setState({Landmark: text});
      this.getdata(text,this.state.Landmark)
    }
  };
 

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
     
        <View style={{top: '1%'}}>
                <Title textMsg={'Details required!'}/>
                <Text style={styles.smallText2}>Appartment Information</Text> 
        </View>
        <View style={styles.inputView}>

              {(this.state.Landmark!='')? (<Text style={styles.toptext}>Landmark*</Text>):(<View style={{margin:10}}></View>)}
                <TextInput
                style={styles.input}
                value={this.state.Landmark}
                onChangeText={(value) => this.onChangeLandmark(value)}
                placeholder="Landmark *"
                />
              {this.state.isShowingResults &&
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
                </View>
            }
      
            {this.state.ValidLandmark &&
                    <Text style={styles.errorMsg}>please enter valid Landmark</Text>
            }
               
 
           
           
            {(this.state.MonthlyBudget!='')? (<Text style={styles.toptext}>Monthly Budget in $*</Text>):(<View style={{margin:10}}></View>)}
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={this.state.MonthlyBudget}
                    onChangeText={(value) => this.onChangeBudget(value)}
                    maxLength={10}
                    placeholder="Monthly Budget in $*"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
           
           
            {this.state.ValidBudget &&
                    <Text style={styles.errorMsg}>please enter valid Monthly Budget</Text>
            }
             

            {(this.state.Radius!='')? (<Text style={styles.toptext}>Radius in miles*</Text>):(<View style={{margin:10}}></View>)}
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={this.state.Radius}
                    onChangeText={(value) => this.onChangeRadius(value)}
                    maxLength={10}
                    placeholder="Radius in miles *"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            
            {this.state.ValidRadius &&
                    <Text style={styles.errorMsg}>please enter valid Radius</Text>
            }

               
 
          <View style={{marginTop:100}}>
          <View style={styles.buttonView}>
 
           { (this.state.ValidLandmark === false && this.state.ValidBudget === false &&  this.state.ValidRadius === false && this.state.Landmark != '' && this.state.MonthlyBudget != 0 &&  this.state.Radius != 0)?
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
    flex: 1,
    marginTop: 40,
    left: '12.62%',
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
toptext:{
  fontSize:12,
  marginTop:5
},
scrollview:{
  flexGrow:1
},
buttonView: {
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
fontSize: 15,
textAlign: 'center',
padding: 10
}
});
 
function mapStateToProps(state) {
  return {
    data_values: state,
    goalChangeApiMsg: state.goalChangeApiMsg,
    logoutApiMsg: state.logoutApiMsg,
  };
}
 
const mapDispatchToProps={
  goalChangeRequest,
  logoutRequest
}
 
// export default connect(mapStateToProps, mapDispatchToProps)(initialScreen);
 
export default connect(mapStateToProps, mapDispatchToProps)(GoalSelecter2);
 
 
 

