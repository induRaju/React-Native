import React,{Component, useEffect,useState} from 'react';
import { StyleSheet, Button, Text,StatusBar, View,ScrollView,TouchableWithoutFeedback,TextInput,FlatList,ActivityIndicator,Animated,TouchableOpacity,Image, ImageBackground} from 'react-native';
import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons'
import { Tile } from 'react-native-elements';
import Constant from 'expo-constants'
import Profiles from '../components/Profiles.js'
import { connect } from 'react-redux';
import {compose} from 'redux'
//import { withNavigation } from "react-navigation";
import { homescreendata,homeUsers,goal,homeFailure,goalrequest } from '../actions/HomeActions';
import RentalsHome from '../components/RentalsHome';
import { Like_User,Dislike_User } from '../actions/LikeActions';
import Color from '../contants/Colors';
import {useTheme} from '@react-navigation/native'
import {useSelector,useDispatch} from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
// import Swiper from 'react-native-deck-swiper';
import Title from '../components/Title';
import { Pressable } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import { Card } from '../components/Card'




class Home extends Component {
  
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
      goal: "",
      background: 'transperant',
      isFetching: false,
    };
    this.changeColor = this.changeColor.bind(this);
    // console.log("Buffalo",this.state.fin_list)
  }
  componentDidMount() {

      console.log("I have mounted in Chat List screen");
    let payload = {Authorization:this.props.data_values?.Authorization,
      user_id: this.state.user_id,
      fin_list: this.state.fin_list,
      page:1
    }
    this.props.goalrequest(payload)
    let tot = this.state.total_data
    // console.log("home response", this.state.fin_list)
    this.props.homescreendata(payload);
    this.sec();
    this.setState({isFetching: false})
    // const { navigation } = this.props;
    // navigation.addListener('beforeRemove', (e) => this.onBackpress(e))
  };

  // onBackpress = (e) => {
  //   const currentRoute = this.props.route.name;
  //   // console.log('currentRoute>>>', currentRoute);
  //   if (currentRoute === "Hometab") {
  //     e.preventDefault();
  //     return true;
  //   } else {
  //     return true;
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // Rendering the component only if passed props value is changed

    console.log('nextProps', nextProps.homeapimsg, this.props.homeapimsg);
    // console.log('nextState', nextState.emailText, this.state.emailText);
    if (nextProps.homeapimsg !== this.props.homeapimsg) {
        if(nextProps.homeapimsg === 'success') {
            this.setState({
              isLoading: false,
              fin_list : nextProps.data_list,
              flag:true,
              
        })
        
            console.log("Home Profile nextProps.data_list",nextProps.data_list);
        } else if(nextProps.homeapimsg === 'error'){
                // alert("Homescreen was not successful");
                console.log("May be may be Home Fail May be")
            }
      return true;
    }
    if(nextState !== this.state) {
      return true;
    }
    return false;
  }
  
  _listEmptyComponent = () => {
    return(
      <View>
            {this.state.isLoading == false && this.props.data_values?.home_goal == 1 &&
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
  onClickdislike= user_id => () => {

    // this.setState({isLoading:true,})
    const filteredData = this.state.fin_list.filter(item => item.profile.user_id !== user_id);
    this.setState({
      isLoading: false,
      fin_list: filteredData
    });
    // console.log(this.state.fin_list)
    const payload={
      Authorization: this.props.data_values?.Authorization,
      user_id:user_id
    }
    this.props.Dislike_User(payload);
    
  }
  onRefresh = () => {
    this.setState({isFetching: true})
    let payload = {Authorization:this.props.data_values?.Authorization,
      arr:0
    }
    this.props.homeUsers(payload);
    this.setState({isFetching: false})


  }
  onClickliketest = () => {
    // console.log("In Lockwood")
    let i;
    let go = this.state.fin_list
    for(i=0; i < go.length; i++){
      // console.log("Lockwood", go[i].profile.display_name)
      if(go[i].profile.display_name== null){ 
        const filteredData = this.state.fin_list.filter(item => item.profile.user_id !== go[i].profile.user_id);
        this.setState({
          isLoading: false,
          fin_list: filteredData
        });
      }

    }
    
  }
  changeColor = () => {
    console.log("I am trying to change colour")
    this.setState({
      background: 'red',
      // textColor: 'orange'
    });
  }

  sec = () => {
    // console.log("----------------kj")
    this.props.homeFailure(payload);
    let daa = this.props.data_values?.current_index;
    let arl = [];
    const narr=this.props.data_values?.prospect_us;
    console.log(narr);
    console.log(this.props.data_values?.home_data_length,daa);
    for(let i=daa; i< (Math.min(daa+5,this.props.data_values?.home_data_length)); i++){
        arl.push(narr.prospect_user_ids[i]);
    }
    
    let payload = {Authorization:this.props.data_values?.Authorization,
 
      prospect_user_ids:arl
    }
    // this.setState({
    // })
    console.log("hellolength ",arl.length,arl);
    if(arl.length>0){
      this.props.homeUsers(payload); 
    }
  }


  onClicklike = user_id => () => {
    const filteredData = this.state.fin_list.filter(item => item.profile.user_id !== user_id);
    this.setState({ fin_list: filteredData });
    // console.log("UUUUuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",this.state.fin_list)
    const payload={
      Authorization: this.props.data_values?.Authorization,
      user_id:user_id
    }
    this.props.Like_User(payload);
  }

    render() {
      // console.log("hehhehehehheheheh",this.state.fin_list, this.props.data_values?.home_goal);
      const scrollEnabled=true
      let da = new Date().getFullYear()
      this.onClickliketest();


      

      return (

        
        <SafeAreaView style={{flex: 1, marginTop: 20}} >
                                <View style={{justifyContent: 'space-evenly',flexDirection:'row',
                            textAlign: 'center',alignContent:'center',alignItems:'center', overflow:'hidden'}}>
                        <Title textMsg={'Your Matches'}
                        
                        />
                      
                          <TouchableWithoutFeedback 
                          
                          onPress={() => this.componentDidMount()}>
                          {/* onPress={""}> */}
                            <MaterialCommunityIcons 
                              style={{ backgroundColor: this.state.background, color: this.state.textColor }} onClick={this.changeColor}
                              // style={{flex: 1,flexDirection: 'column-reverse'}}
                              name={"reload"}
                              size={32}
                              // color={this.onClicklike(item.user_id) ? "red" : "black"}
                            />
                            </TouchableWithoutFeedback>
                        
                       
                </View>
                {this.state.isLoading && <View style={{justifyContent:'center', flex:1}}>
                  {<ActivityIndicator color={"black"} />}
                </View>
                }
                {this.state.flag && this.props.data_values?.home_goal == 1 &&
                <View style={{margin:10}}>
                  
                  <FlatList nestedScrollEnabled
                    data={this.state.fin_list}
                    onRefresh={() => this.componentDidMount()}
                    refreshing={this.state.isFetching}
                    ListEmptyComponent={this._listEmptyComponent}
                    renderItem={({item, index}) => {
                      return (
                        
                        <TouchableOpacity
                        
                          style={{
                            // backgroundColor: '#00B8D4',
                          // width: 250,
                          // height: 200,
                          // top:'10%',
                          // bottom:'10%',
                          margintop: '8%',
                          marginBottom: '8%',
                          // shadowColor: 'black',
                          // shadowOpacity: 1,
                          // shadowOffset: { width: 10, height: 10 },
                          marginRight:'2%',
                          marginleft:'4%',
                          borderRadius: 5,
                          backgroundColor : "#0000",
                          // margin:'8%',
                          borderColor: 'grey',
                          borderWidth: 1,
                          // elevation: 10,
                          // marginBottom:'2%',
                          justifyContent: 'center'}}
                          onPress={() => ""}>
       

                          <View styles ={styles.cn}>

 
                            {item?.media[0]  && (item.profile.display_name !==null || item.profile.dob !==null) ? 
                            (
                            <ImageBackground
                              style={styles.stretch}
                              source={{uri:"https://d138zt7ce8doav.cloudfront.net/".concat(item.media[0].uri)}}
                            >
                            
                             
                              <View style={{    position: 'absolute',
                              justifyContent: 'flex-end',
                              alignItems: 'flex-start',
                              fontWeight: 'bold',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,}}>
                                <Text adjustsFontSizeToFit style={{color:'#000000',backgroundColor: "#E5E4E2",fontWeight: "bold",height:40, 
                                padding:5,textAlign: 'center',}} >{item.profile.display_name.slice(2,-2) + ",  " + (da - new Date((item.profile.dob)).getFullYear())}</Text>
                              </View>
  
                            </ImageBackground>
                            
                            ): (item.profile.display_name !==null && item.profile.dob !== null) ?
                            (
                              <ImageBackground
                              style={styles.imageStyl}
                              source={require('../assets/png/blank-profile-picture.png')}
                              >
                              
                              
                                <View style={{    position: 'absolute',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-start',
                                fontWeight: 'bold',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 1,}}>
                                  <Text adjustsFontSizeToFit style={{color:'#000000',backgroundColor: "#E5E4E2",fontWeight: "bold",height:40, padding:5,textAlign: 'center',}} >
                                    {item.profile.display_name.slice(2,-2)+", "+ (da - new Date((item.profile.dob)).getFullYear())}</Text>
                                </View>

                                </ImageBackground>
                            
                            ):
                            (                               
                 null
                            )
                            }
                            
                            {/* <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap',backgroundColor:"#F4F3E9"}}> */}
                            
                            
                          </View>

                          <View style={{flex: 1, flexDirection: 'row',bottom: '4%', flexWrap: 'wrap',backgroundColor:"#F4F3E9"}}>
                

                            

                            {item.profile.hometown==null ? 
                            (
                              null
                            ): (
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="home" />
                              <Text adjustsFontSizeToFit  >{item.profile.hometown.slice(2,-2)}</Text>
                            </View>)}
              
                            {/* <View style={{width: '50%',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}> */}
   

                            {(item.profile.gender==null) ? 
                              null
                            : 
                            (item.profile.gender.slice(2,-2)=="M" && item.profile.display_name !==null) ?
                            
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" 
                            name="male" />
                              <Text adjustsFontSizeToFit  >{"Man"}</Text>
                            </View>
                            :
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="female" />
                              <Text adjustsFontSizeToFit  >{"Woman"}</Text>
                            </View>

                            }

                            {(item.profile.religion==null) ? 
                              null
                            : 
                            (item.profile.religion.slice(2,-2)=="F") ?
                            
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit  >{"Hindu"}</Text>
                            </View>
                            :
                            (item.profile.religion.slice(2,-2)=="A") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit  >{"Agnostic"}</Text>
                            </View>
                            :
                            (item.profile.religion.slice(2,-2)=="B") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit  >{"Atheist"}</Text>
                            </View>

                            :
                            (item.profile.religion.slice(2,-2)=="C") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit  >{"Buddhist"}</Text>
                            </View>
                            :
                            (item.profile.religion.slice(2,-2)=="D") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit >{"Catholic"}</Text>
                            </View>

                            :
                            (item.profile.religion.slice(2,-2)=="E") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit >{"Christian"}</Text>
                            </View>

                            :
                            (item.profile.religion.slice(2,-2)=="G") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit  >{"Jewish"}</Text>
                            </View>

                            :
                            (item.profile.religion.slice(2,-2)=="H") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit  >{"Muslim"}</Text>
                            </View>

                            :
                            (item.profile.religion.slice(2,-2)=="I") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit  >{"Sikh"}</Text>
                            </View>

                            :
                            (item.profile.religion.slice(2,-2)=="J") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit  >{"Spiritual"}</Text>
                            </View>

                            :

                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="praying-hands" />
                              <Text adjustsFontSizeToFit  >{"Other"}</Text>
                            </View>
                            }


                          {(item.profile.ethnicity==null) ? 
                              null
                            : 
                            (item.profile.ethnicity.slice(2,-2)=="A") ?
                            
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>   
                            <FontAwesome  size={20} color="black" name="globe" />
                         
                              <Text adjustsFontSizeToFit  >{"American Indian"}</Text>
                            </View>
    
                            :
                            (item.profile.ethnicity.slice(2,-2)=="B") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="globe" />

                              <Text adjustsFontSizeToFit  >{"Black/African Descent"}</Text>
                            </View>

                            :
                            (item.profile.ethnicity.slice(2,-2)=="C") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="globe" />

                              <Text adjustsFontSizeToFit  >{"East Asian"}</Text>
                            </View>
                            :
                            (item.profile.ethnicity.slice(2,-2)=="D") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="globe" />

                              <Text adjustsFontSizeToFit  >{"Hispanic/Latino"}</Text>
                            </View>

                            :
                            (item.profile.ethnicity.slice(2,-2)=="E") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="globe" />

                              <Text adjustsFontSizeToFit  >{"Middle Eastern"}</Text>
                            </View>

                            :
                            (item.profile.ethnicity.slice(2,-2)=="G") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="globe" />

                              <Text adjustsFontSizeToFit >{"Pacific Islander"}</Text>
                            </View>

                            :
                            (item.profile.ethnicity.slice(2,-2)=="H") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="globe" />

                              <Text adjustsFontSizeToFit >{"South Asian"}</Text>
                            </View>

                            :
                            (item.profile.ethnicity.slice(2,-2)=="I") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="globe" />

                              <Text adjustsFontSizeToFit  >{"Southeast Asian"}</Text>
                            </View>

                            :
                            (item.profile.ethnicity.slice(2,-2)=="J") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="globe" />

                              <Text adjustsFontSizeToFit >{"White/Caucasian"}</Text>
                            </View>

                            :

                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>                            
                              <FontAwesome  size={20} color="black" name="globe" />

                              <Text adjustsFontSizeToFit  >{"Other"}</Text>
                            </View>
                            }


                          
                          {(item.profile.pets==null) ? 
                              null
                            : 
                            (item.profile.pets.slice(2,-2)=="dog") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit >{"Dog"}</Text>
                            </View>
    
                            :
                            (item.profile.pets.slice(2,-2)=="cat") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit  >{"Cat"}</Text>
                            </View>

                            :
                            (item.profile.pets.slice(2,-2)=="monkey") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit  >{"Monkey"}</Text>
                            </View>
                            :
                            (item.profile.pets.slice(2,-2)=="bird") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit >{"Bird"}</Text>
                            </View>

                            :
                            (item.profile.pets.slice(2,-2)=="rabbit") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit >{"Rabbit"}</Text>
                            </View>

                            :
                            (item.profile.pets.slice(2,-2)=="pig") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit style={{height:30, padding:5,textAlign: 'center',}} >{"Pig "}</Text>
                            </View>

                            :
                            (item.profile.pets.slice(2,-2)=="fish") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit >{"Fish"}</Text>
                            </View>

                            :
                            (item.profile.pets.slice(2,-2)=="snake") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit  >{"Snake"}</Text>
                            </View>

                            :
                            (item.profile.pets.slice(2,-2)=="mouse") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit  >{"Mouse"}</Text>
                            </View>

                            :
                            (item.profile.pets.slice(2,-2)=="turtle") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit >{"Turtle"}</Text>
                            </View>

                            :
                            (item.profile.pets.slice(2,-2)=="spider") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome  size={20} color="black" name="paw" />
                              <Text adjustsFontSizeToFit >{"Spider"}</Text>
                            </View>
                            :

                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>                            
                              <FontAwesome  size={20} color="black" name="paw" />

                              <Text adjustsFontSizeToFit >{"Other"}</Text>
                            </View>
                            }


                          {(item.profile.political_views==null) ? 
                              null
                            : 
                            (item.profile.political_views.slice(2,-2)=="A") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            
                            <FontAwesome  size={20} color="black" name="university" />                             
                             <Text adjustsFontSizeToFit >{"Liberal"}</Text>
                            </View>
    
                            :
                            (item.profile.political_views.slice(2,-2)=="B") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                              <FontAwesome  size={20} color="black" name="university" />
                              <Text adjustsFontSizeToFit >{"Moderate"}</Text>
                            </View>

                            :
                            (item.profile.political_views.slice(2,-2)=="C") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                              <FontAwesome  size={20} color="black" name="university" />
                              <Text adjustsFontSizeToFit >{"Conservative"}</Text>
                            </View>
                            :
                            (item.profile.political_views.slice(2,-2)=="D") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                              <FontAwesome  size={20} color="black" name="university" />
                              <Text adjustsFontSizeToFit >{"Non Political"}</Text>
                            </View>

                            :

                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}> 
                              <FontAwesome  size={20} color="black" name="university" />                           
                              <Text adjustsFontSizeToFit  >{"Other"}</Text>
                            </View>
                            }

                            {(item.profile.smoking==null) ? 
                              <Text ></Text>
                            : 
                            (item.profile.smoking.slice(2,-2)=="S") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            
                            <FontAwesome5  size={20} color="black" name="smoking" />
                              <Text adjustsFontSizeToFit  >{"Yes"}</Text>
                            </View>
                            :
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5 size={20} color="black" name="smoking" />
                              <Text adjustsFontSizeToFit  >{"No"}</Text>
                            </View>

                            }

                          {(item.profile.drinking==null) ? 
                              <Text ></Text>
                            : 
                            (item.profile.drinking.slice(2,-2)=="Y") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            
                            <FontAwesome5 
                             size={20} color="black" name="cocktail" />
                              <Text adjustsFontSizeToFit  >{"Yes"}</Text>
                            </View>
                            :
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            <FontAwesome5  size={20} color="black" name="cocktail" />
                              <Text adjustsFontSizeToFit >{"No"}</Text>
                            </View>

                            }

                            {(item.profile.drugs===null) ? 
                             null
                            : 
                            (item.profile.drugs.slice(2,-2)=="Y") ?
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                            
                            <FontAwesome5 size={20} color="black" name="capsules" />
                              <Text adjustsFontSizeToFit  >{"Yes"}</Text>
                            </View>
                            :
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>                            
                            <FontAwesome5  size={20} color="black" name="capsules" />
                              <Text adjustsFontSizeToFit >{"No"}</Text>
                            </View>

                            }

                          {(item.profile.marijuana==null) ? 
                              null
                            : 
                            (item.profile.marijuana.slice(2,-2)=="Y") ?
                            
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}> 

                                 <FontAwesome5 
                             size={20} color="black" name="cannabis" />  
                              <Text adjustsFontSizeToFit  >{"Yes"}</Text>
                            </View>
                            :
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}> 
                                       <FontAwesome5 
                             size={20} color="black" name="cannabis" /> 
                              <Text adjustsFontSizeToFit  >{"No"}</Text>
                            </View>

                            } 

                            {(item.profile.education_level==null) ? 
                              null
                            : 
                            <View style={{height:25, margin: '2%',flexDirection: 'row',justifyContent: 'center',backgroundColor:"#a9a9a9",
                            textAlign: 'center',alignContent:'center',alignItems:'center', borderRadius:5, overflow:'hidden'}}>
                              <FontAwesome  size={20} color="black" name="graduation-cap" />
                              <Text adjustsFontSizeToFit  >{item.profile.education_level.slice(2,-2)}</Text>
                            </View>
                            }
                            
                            {/* </View> */}
                            
                          </View>


                          

                          <View style={{flexDirection: 'row',bottom:'8%', top:'0.1%', justifyContent: 'space-between'}}>
                          <TouchableWithoutFeedback 
                          
                          onPress={this.onClicklike(item.profile.user_id) }>
                          {/* onPress={""}> */}
                            <MaterialCommunityIcons 
                              style={{ backgroundColor: this.state.background, color: this.state.textColor }} onClick={this.changeColor}
                              // style={{flex: 1,flexDirection: 'column-reverse'}}
                              name={"heart-outline"}
                              size={32}
                              // color={this.onClicklike(item.user_id) ? "red" : "black"}
                            />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback 
                            
                            onPress={this.onClickdislike(item.profile.user_id)}>
                            {/* onPress={""}> */}
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
                    onEndReached = {this.sec}
                    keyExtractor={(item,index) => index}
                    // removeClippedSubviews={true} // Unmount components when outside of window 
                    // initialNumToRender={2} // Reduce initial render amount
                    // maxToRenderPerBatch={1} // Reduce number in each render batch
                    // updateCellsBatchingPeriod={100} // Increase time between renders
                    // windowSize={7} 
                />

                  
                </View>
                }
                {this.props.data_values?.home_goal == 2 &&
                <RentalsHome navigation = {this.props.navigation}/>
                
                }

              


     </SafeAreaView>

      )  
}
}



const styles = StyleSheet.create({
  container: {
    flex: 2,
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
cn:{
  flexDirection: 'row',
// alignItems: 'center',
justifyContent: 'space-between',
// position: 'absolute',
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
  //  top:'2%',
  height: 250,
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
      homeapimsg: state.homeapimsg,
      data_list: state.fin_list,
      likeuserapiMsg: state.likeuserapiMsg,
      dislikeuserapiMsg: state.dislikeuserapiMsg
    };
  }
   
  const mapDispatchToProps={
    homescreendata,homeUsers,goal,Like_User,Dislike_User,homeFailure,goalrequest
  }
   
   
export default compose(
  connect(mapStateToProps,mapDispatchToProps))
  (Home);





// {(item.profile.pronouns==null) ? 
//   <View style={{width: '50%',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
//     {/* <Text adjustsFontSizeToFit style={{height:40, padding:5,textAlign: 'center',}} >{}</Text> */}
//   </View>
//   : 
//   (item.profile.pronouns.slice(2,-2)=="A") ?
  
//   <View style={{flexDirection: 'row',justifyContent: 'space-between',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
  
//     <Text adjustsFontSizeToFit style={{height:30, padding:5,textAlign: 'center',}} >{"she/her"}</Text>
//   </View>

//   :
//   (item.profile.pronouns.slice(2,-2)=="B") ?
//   <View style={{flexDirection: 'row',justifyContent: 'space-between',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
//     <Text adjustsFontSizeToFit style={{height:30, padding:5,textAlign: 'center',}} >{"he/him"}</Text>
//   </View>

//   :
//   (item.profile.pronouns.slice(2,-2)=="C") ?
//   <View style={{flexDirection: 'row',justifyContent: 'space-between',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
//     <Text adjustsFontSizeToFit style={{height:30, padding:5,textAlign: 'center',}} >{"they/them"}</Text>
//   </View>
//   :
//   (item.profile.pronouns.slice(2,-2)=="D") ?
//   <View style={{flexDirection: 'row',justifyContent: 'space-between',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
//     <Text adjustsFontSizeToFit style={{height:30, padding:5,textAlign: 'center',}} >{"ze/zir"}</Text>
//   </View>

//   :
//   (item.profile.pronouns.slice(2,-2)=="E") ?
//   <View style={{flexDirection: 'row',justifyContent: 'space-between',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
//     <Text adjustsFontSizeToFit style={{height:30, padding:5,textAlign: 'center',}} >{"xe/xim"}</Text>
//   </View>

//   :
//   (item.profile.pronouns.slice(2,-2)=="G") ?
//   <View style={{flexDirection: 'row',justifyContent: 'space-between',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
//     <Text adjustsFontSizeToFit style={{height:30, padding:5,textAlign: 'center',}} >{"ey/em"}</Text>
//   </View>

//   :
//   (item.profile.pronouns.slice(2,-2)=="G") ?
//   <View style={{flexDirection: 'row',justifyContent: 'space-between',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
//     <Text adjustsFontSizeToFit style={{height:30, padding:5,textAlign: 'center',}} >{"ve/ver"}</Text>
//   </View>
// :

// <View style={{flexDirection: 'row',justifyContent: 'space-between',backgroundColor:"#F4F3E9",textAlign: 'center',borderTopLeftRadius:5}}>
// <Image style={{width: 30, height: 30,color: "white",}} source={require('../assets/png/ethinicity.png')}/>
//   <Text adjustsFontSizeToFit style={{height:30, padding:5,textAlign: 'center',}} >{"Other"}</Text>
// </View>
// }
