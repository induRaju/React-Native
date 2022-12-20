import React,{Component, useEffect,useState} from 'react';
import { StyleSheet, Button, Text,StatusBar, View,ScrollView,TouchableWithoutFeedback,TextInput,FlatList,ActivityIndicator,Animated,TouchableOpacity,Image} from 'react-native';
import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons'
import Constant from 'expo-constants'
import Profiles from '../components/Profiles.js'
import { connect } from 'react-redux';
import {compose} from 'redux'
//import { withNavigation } from "react-navigation";
import { homelistingscreendata,homeListingUsers,goal,homeListingFailure,goalrequest } from '../actions/HomeListingActions';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Color from '../contants/Colors';
import { Like_Listing,Dislike_Listing } from '../actions/LikeListingAction';

import {useTheme} from '@react-navigation/native'
import {useSelector,useDispatch} from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../components/Title';
import { Pressable } from "react-native";

import { Card } from '../components/Card'
class RentalsHome extends Component {
  
  constructor(props) {
    super(props);
    this.myRef = React.createRef(null);
    this.state = {
      isLoading: true,

      flag:false,
      Authorization: "",
      user_id: "",
      total_data: "",
      fin_list: "",
      listing_id:"",
      listing_list: "",
      goal: "",
      isFetching: false,
    };
    // console.log("Buffalo",this.state.fin_list)
  }
  componentDidMount() {
    this.setState({isFetching: true})
    let payload = {Authorization:this.props.data_values?.Authorization,
      listing_id: this.state.listing_id,
      listing_list: this.state.listing_list,
      page:1,

    }
    this.props.goalrequest(payload)

    let tot = this.state.total_data
    console.log("Listing home response", this.state.listing_list)
    this.props.homelistingscreendata(payload);
    this.setState({isFetching: false})
    
    
  };

  shouldComponentUpdate(nextProps, nextState) {
    // Rendering the component only if passed props value is changed
    console.log('Listing nextProps', nextProps.homelistingapimsg, this.props.homelistingapimsg);
    // console.log('nextState', nextState.emailText, this.state.emailText);
    if (nextProps.homelistingapimsg !== this.props.homelistingapimsg) {
      console.log(" I should be here am I?")
        if(nextProps.homelistingapimsg === 'success') {
            this.setState({
              isLoading: false,
              // isFetching: true,
              listing_list : nextProps.data_list,
              flag:true,
        })
            console.log("Home Listing nextProps.data_list",nextProps.data_list);
        } else if(nextProps.homelistingapimsg === 'error'){
                // alert("Homescreen was not successful");
                console.log("SJLANSDASL")
            }
      return true;
    }
    if(nextState !== this.state) {
      return true;
    }
    return false;
  }
  
  // onClickdislike= (index)=>{

  //   const payload={
  //     Authorization: this.data_values?.Authorization,
  //     listing_id:this.state.listing_list[index]
  //   }
    
  // }

  _listEmptyComponent = () => {
    return(
      <View>
            {this.state.isLoading == false && this.props.data_values?.home_goal == 2 &&
      (
        <View style={{
          justifyContent: 'center',
                  textAlign: 'center',alignContent:'center',alignItems:'center', overflow:'hidden',
           backgroundColor:"#B5BFE3", height:'80%', borderRadius:10, margin:20}}>
            
        <Feather name='info' color={"#7E43EE"} size={30} >Info</Feather>
        <Text style={{margin:20, fontSize:18, color:"#7E43EE"}}> Please modify your preferences to expand your search criteria</Text>

        </View>

      )
      }

      </View>
    )

  }

  onClicklike = listing_id => () => {
    console.log("UUUUuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",this.state.listing_list)
    const filteredData = this.state.listing_list.filter(item => item.listing.id !== listing_id);
    // this.props.data_values.listing_list === filteredData
    console.log("UUUUuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",filteredData)

    this.setState({
      isLoading: false,
      listing_list: filteredData
     });
    // console.log("UUUUuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",filteredData)
    const payload={
      Authorization: this.props.data_values?.Authorization,
      listing_id:listing_id
    }
    this.props.Like_Listing(payload);
  }

  secn = () => {
    console.log("Yes I came here")
    this.props.homeListingFailure(payload);

    let daa = this.props.data_values?.current_listing_index;
    let arl = [];
    const narr=this.props.data_values?.prospect_li;
    console.log(narr);
    console.log(this.props.data_values?.home_listing_data_length,daa);
    for(let i=daa; i< (Math.min(daa+5,this.props.data_values?.home_listing_data_length)); i++){
        arl.push(narr.prospect_listing_ids[i]);
    }

    let payload = {Authorization:this.props.data_values?.Authorization,
      prospect_listing_ids:arl
    }

    // this.setState({
    // })
    if(arl.length>0){
        this.props.homeListingUsers(payload); 
    }
  }


  onClickdislike= listing_id => () => {

    const filteredData = this.state.listing_list.filter(item => item.listing.id !== listing_id);
    // this.props.data_values.listing_list === filteredData

    this.setState({ 
      isLoading: false,
      listing_list: filteredData 
    });
    // console.log(this.state.listing_list)
    const payload={
      Authorization:this.props.data_values?.Authorization,
      listing_id:listing_id
    }
    this.props.Dislike_Listing(payload);
    
  }


  // deleteItemById = id => () => {
  //   const filteredData = this.state.listing_list.filter(item => item.listing.id !== id);
  //   this.setState({ listing_list: filteredData });
  // }

  render() {
    console.log("hahahhahahahah",this.state.listing_list, this.props.data_values?.home_goal);
    const scrollEnabled=true

    

    return (

      
      <SafeAreaView style={{flex: 1, marginTop: 20}} >

              {this.state.isLoading && <View style={{justifyContent:'center', flex:1}}>
                {<ActivityIndicator color={"black"} />}
              </View>
              }
              {this.props.data_values?.home_goal == 2 &&
              <View style={{margin:10}}>
                
                <FlatList nestedScrollEnabled
                  data={this.state.listing_list}
                  onRefresh={() => this.componentDidMount()}
                  refreshing={this.state.isFetching}
                  ListEmptyComponent={this._listEmptyComponent}
                  renderItem={({item, index}) => {
                    return (
                          <TouchableOpacity
                            style={{margintop: '8%',
                            marginBottom: '8%',
                            marginRight:'2%',
                            marginleft:'4%',
                            // margin:'8%',
                            borderRadius: 5,
                            backgroundColor : "#0000",
                            borderColor: 'grey',
                            borderWidth: 1,
                            // elevation: 10,
                            justifyContent: 'center'}}
                            onPress={() => ""}>
                            <View>
                              {item?.media[0] ?
                              (
                              <Image
                                style={styles.stretch}
                                source={{uri:"https://d138zt7ce8doav.cloudfront.net/".concat(item.media[0].uri)}}
                              />
                              
                              ):(
                                <Image
                                style={styles.imageStyl}
                                source={require('../assets/png/houseimage.jpeg')}
                                />
                              )
                              
                              }
                              
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',bottom:'4%',flexWrap: 'wrap',backgroundColor:"#F4F3E9"}}>
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                              textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                                  <Text adjustsFontSizeToFit  >{item.listing.title}</Text>
                              </View>
                              <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                              textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                                  <Ionicons  size={20} color="black" name="location" />
                                <Text adjustsFontSizeToFit >{item.listing.address_for_listing}</Text>
                              </View>
    
                              <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                              textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                              <MaterialCommunityIcons 
                                size={20} color="black" name="currency-usd" />
                              <Text adjustsFontSizeToFit  >{item.listing.monthly_rent}</Text>
                          
                                
                              </View>
                              {item.listing.lease_duration == null ?
                              (
                                <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                                textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                                    <Ionicons  size={20} 
                                    color="black" name="time" />
    
                                  <Text adjustsFontSizeToFit >{" Not Specified"}</Text>
                                </View>
                                )
                              :
                              (                              
                              <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                              textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                                  <Ionicons  size={20} 
                                  color="black" name="time" />
  
                                <Text adjustsFontSizeToFit >{item.listing.lease_duration+ " Months"}</Text>
                              </View>)
                              }

                              {item.listing.number_of_bedrooms == null ?
                              (
                                <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                                textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                                      <MaterialCommunityIcons 
                                    size={20} color="black" name="bed" />
    
                                  <Text adjustsFontSizeToFit >{" Not Specified"}</Text>
                                </View>
                              )
                              :
                              (                              
                              <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                              textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                                    <MaterialCommunityIcons 
                                  size={20} color="black" name="bed" />
  
                                <Text adjustsFontSizeToFit >{item.listing.number_of_bedrooms+ " Bedrooms"}</Text>
                              </View>
                              )
                              }

                            </View>

  
                            <View style={{flexDirection: 'row',bottom:'8%', top:'0.1%', justifyContent: 'space-between'}}>
                            <TouchableWithoutFeedback 
                            
                            onPress={this.onClicklike(item.listing.id)}>
                              <MaterialCommunityIcons  style={{ backgroundColor: this.state.background, color: this.state.textColor }} 
                              onClick={this.changeColor}
                                name={"heart-outline"}
                                size={32}
                                // color={this.onClicklike(item.user_id) ? "red" : "black"}
                              />
                              </TouchableWithoutFeedback>
                              <TouchableWithoutFeedback 
                              
                              onPress={this.onClickdislike(item.listing.id)}>
                              <MaterialCommunityIcons 
                              // style={{flex: 1,flexDirection: 'row'}}
                                name={"thumb-down-outline"}
                                size={32}
                                // color={this.onClickdislike(item.user_id) ? "red" : "black"}
                              />
                            </TouchableWithoutFeedback>
                            </View>
                        </TouchableOpacity>
                        );
                  }}
                  onEndReached = {this.secn}
                  keyExtractor={(item,index) => index}

              />

                
              </View>
              }
              
            


   </SafeAreaView>

    )  
}
}

    


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
},
resultItem: {
  width: '100%',
  justifyContent: 'center',
  height: 40,
  borderBottomColor: '#ccc',
  borderBottomWidth: 1,
  paddingLeft: 15,
},
imageStyl: {
  flexGrow:1,
  width:"100%",
  height:200,
  alignItems: 'center',
  justifyContent:'center',
  },
stretch: {
  width: '100%',
  height: 250,
  // top:'2%',
  resizeMode: 'stretch',
},
con:{
    flex :1,
    //backgroundColor:'white'
}
,
scrollview:{
  flexGrow:1
},
    // iconThumbs: {
    //     position: 'absolute',
    //     top: 40,
    //     right: 10,
    //     zIndex: 100,

    // },
    button_view: {
      left: '10.62%',
      // height: 110,
      marginTop: 560,
      // width: '70%',
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between',
      width: '80%', 
      height: 50, 
      // backgroundColor: '#FF9800', 
      // justifyContent: 'center', 
      // alignItems: 'center',
      position: 'absolute',
      top: 20
  },
  like_Button: {
    color: Color.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: '16%',
    height: '86%',
    // backgroundColor: 'green',
},
dislike_Button: {
  color: Color.white,
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  width: '16%',
  height: '86%',
  // backgroundColor: 'red',
},
})



  function mapStateToProps(state) {
    return {
      data_values: state,
      homelistingapimsg: state.homelistingapimsg,
      data_list: state.listing_list,
      likelistingapiMsg: state.likelistingapiMsg,
      dislikelistingapiMsg: state.dislikelistingapiMsg
    };
  }
   
  const mapDispatchToProps={
    homelistingscreendata,homeListingUsers,goal,Like_Listing,Dislike_Listing,homeListingFailure,goalrequest
  }
   
  // export default connect(mapStateToProps, mapDispatchToProps)(initialScreen);
   
export default compose(
  
connect(mapStateToProps,mapDispatchToProps))
(RentalsHome);
