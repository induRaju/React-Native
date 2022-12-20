// import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import React, { useLayoutEffect, useRef} from 'react'
import { Animated,SafeAreaView, StyleSheet, Text, View,Image,Dimensions,TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import { useNavigation ,useTheme} from '@react-navigation/native';
import Color from '../contants/Colors';
//import Swiper from 'react-native-deck-swiper';
import { connect } from 'react-redux';
const { height } = Dimensions.get('window')

const Profiles = (props)=>{
    const navigation = useNavigation();
    const {colors} = useTheme()
    const textcolor = colors.iconColor
    let al = props.data_values?.fin_list
    // let dictionary = Object.assign({}, ...al.map((x) => ({[x.profile.user_id]: x.profile})));
    // JSON.stringify(al)
    const swipeRef = useRef(null);
        // console.log("In the profile component",props.data_values?.fin_list)
    console.log('In profile component 1',al)
    const scrolling = useRef(new Animated.Value(0)).current;
    const translation = useRef(new Animated.Value(-100)).current;
    var image = null
    return (
        
          <SafeAreaView style={styles.container}>
            
            {/* Header */}
            <View style={styles.forgot_button}>
              <TouchableOpacity>
                {/* <Image style={tw("h-14 w-14")} source={rent} /> */}
      
              </TouchableOpacity>
            </View>
            {/* End of Header */}
            {/* Cards */}
            
            <View style={styles.container}>
              <Swiper
                ref={swipeRef}
                containerStyle={{backgroundColor: "transparent"}}
                cards = {al}
                infinite
                stackSize = {5}
                cardIndex = {0}
                animateCardOpacity
                verticalSwipe = {false}
                vertical
                OnSwipedLeft={() => {
                  console.log("Swipe Left")
                }
                }
                OnSwipedRight={() => {
                  console.log("Swipe Right")
                }
                }
                
                showsHorizontalScrollIndicator={true}
                renderCard = {(card) => (
                 
                  <View key={card.user_id} style={styles.card_view}>
                    {/* console.log("reagfdgvszfrg",card.profile.user_id) */}
                    
                  
                    {/* <Image
                      style={styles.imageStyle}
                      source = {{uri: (Image.resolveAssetSource(card.media).uri)}}
                    /> */}
                    <View style = {styles.image_Data}>
                      <View>
                        <Text>
                          {card.display_name.slice(2,-2)}
                        </Text>
                        <Text> {card.dob}</Text>
                      </View>
      
                    </View>
                    {/* <Text>{card.display_name}</Text> */}
                  </View>
                )}
              />
            </View>
            <View style = {styles.button_view}>
              <TouchableOpacity onPress = {() => swipeRef.current.swipeLeft()}
              style = {styles.dislike_Button}>
                  {/* <Entypo name="cross" size = {24} color = 'red'/> */}
                  
                  <Ionicons style={styles.iconThumbs} name='thumbs-down-outline' color={Color.grey} size={30} />
              </TouchableOpacity>
      
              <TouchableOpacity onPress = {() => swipeRef.current.swipeRight()}
              style ={styles.like_Button}>
                  {/* <AntDesign name="heart" size={24} color = 'green' /> */}
                  
                  <Ionicons style={styles.iconHeart} name='heart-outline' color={Color.grey} size={30} />
              </TouchableOpacity>
      
            </View>
            <Text> HomeScreen</Text>
      
          </SafeAreaView>
        )
      }
//       }
// }


 
// export default connect(mapStateToProps, mapDispatchToProps)(initialScreen);
 


const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:-1
  },
    // padding: 10,
    // alignItems:'center',
    // justifyContent:'center'},
  inputView: {
      left: '12.62%',
      marginTop: 60,
      width: '80%'
    },

      // card_view: {
      //   /* Setting the height according to the screen height, it also could be fixed value or based on percentage. In this example, this worked well on Android and iOS. */
      //   height: height - 300,
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   backgroundColor: Color.white,
      //   borderRadius: 5,
      //   shadowColor: Color.black,
      //   shadowOffset: {
      //     width: 0,
      //     height: 2,
      //   },
      //   shadowRadius: 6,
      //   shadowOpacity: 0.3,
      //   elevation: 2,
      // },
      // image: {
      //   borderRadius: 5,
      //   flex: 1,
      //   width: '100%',
      // },
      photoDescriptionContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: '100%',
        position: 'absolute',
        left: 10,
        bottom: 10,
      },
      text: {
        textAlign: 'center',
        fontSize: 20,
        color: Color.white,
        fontFamily: 'Avenir',
        textShadowColor: Color.black,
        textShadowRadius: 10,
      },
  
  input: {
      height: 40,
      borderWidth: 2,
      padding: 10,
    },
  passwordStyle: {
      flex: 1,
      height: 40,
      borderWidth: 2,
      padding: 10,
  },
  button_view: {
      left: '6.62%',
      height: 40,
      marginTop: 560,
      width: '80%',
      // flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between',
  },
  // new_user: {
  //     marginTop: 10,
  //     height: 30,
  //     paddingHorizontal: Platform.OS === 'ios' ? 90 : 120,
  //     // left: '300%',
  //     textDecorationLine: 'underline',
  //     color: Color.Button_blue,
  // },
  buttonView: {
      left: '12.62%',
      height: 40,
      marginTop: 60,
      width: '80%',
      borderRadius: 5,
  },
  // loginButton: {
  //     color: Color.white,
  //     fontSize: 15,
  //     textAlign: 'center',
  //     padding: 10
  // },
  card_view: {

      aspectRatio: 3/4,
      backgroundColor: '#FFFFFF',
      borderRadius: 0.75,
      position: 'relative',
      alignItems:'center',
    justifyContent:'center'
    
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
    width: '26%',
    height: '86%',
    // backgroundColor: 'red',
  },
  g_Button: {
      color: Color.black,
      fontSize: 15,
      textAlign: 'center',
      marginLeft: 18
  },
  imageStyle: {
    // resizeMode: 'contain',
    // alignSelf: 'center',
      position:'absolute',
      top: 0,
      height: 100,
      width: 100,
      borderRadius: 0.75,
  },
  image_Data: {
    position:'absolute',
    bottom: 0,
    backgroundColor: '#FFFFFF',
    height: 20,
    width: 100,
    justifyContent:'space-between',
    flexDirection: 'row',
  }
});

function mapStateToProps(state) {
  return {
    data_values: state,
    homeapimsg: state.homeapimsg,
  };
}
 
// const mapDispatchToProps={
//   homescreendata,homeUsers
// }
export default connect(mapStateToProps,null)(Profiles);


// import React, { Component,useLayoutEffect, useRef} from 'react'
// import { useNavigation } from "@react-navigation/core";
// import { View, Text, Image, Button, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
// import Swiper from 'react-native-deck-swiper'
// import { connect } from 'react-redux';

// // import { Card } from '../components/Card'
// // import { HomeScreenPics } from '../components/Pics'
// import rent from '../assets/png/splash_login.png';
// import {tw} from 'tailwind-rn';
// import { FullWindowOverlay } from 'react-native-screens';
// // import { AntDesign} from "react-native-vector-icons/AntDesign";
// // import { Entypo } from "react-native-vector-icons/Entypo";
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import Color from '../contants/Colors';

// class Profiles extends Component {
//   constructor(props) {
//     super(props);
//     this.myRef = React.createRef();
//     this.state = {
//       Authorization: this.props.data_values?.Authorization,
//       user_id: this.props.data_values?.user_id,
//       total_data: this.props.data_values?.total_data,
//       fin_list: this.props.data_values.fin_list,
//     };
//   // const navigation = useNavigtaion();
//   // const {l}
//   // useLayoutEffect(() => {
//   //   navigation.setOptions({
//   //     headerShown: false,
//   //   });
//   // }, []);
    
// return (
//     <SafeAreaView style={styles.container}>
      
//       {/* Header */}
//       <View style={styles.forgot_button}>
//         <TouchableOpacity>
//           {/* <Image style={tw("h-14 w-14")} source={rent} /> */}

//         </TouchableOpacity>
//       </View>
//       {/* End of Header */}
//       {/* Cards */}
//       <View style={styles.container}>
//         <Swiper
//         ref={this.myRef}
//           containerStyle={{backgroundColor: "transparent"}}
//           cards = {this.state.fin_list}
//           infinite
//           stackSize = {5}
//           cardIndex = {0}
//           // animateCardOpacity
//           verticalSwipe = {false}
//           renderCard = {(props) => (
//             <View key={props.item.profile.user_id} style={styles.card_view}>
//               <Image
//                 style={styles.imageStyle}
//                 source = {{uri:props.img}}
//               />
//               <View style = {styles.image_Data}>
//                 <View>
//                   <Text>
//                     {props.name}
//                   </Text>
//                   <Text> {props.dob}</Text>
//                 </View>

//               </View>
//               {/* <Text>{card.display_name}</Text> */}
//             </View>
//           )}
//         />
//       </View>
//       <View style = {styles.button_view}>
//         <TouchableOpacity onPress = {() => this.myRef.current.swipeLeft()}
//         style = {styles.dislike_Button}>
//             {/* <Entypo name="cross" size = {24} color = 'red'/> */}
            
//             <Ionicons style={styles.iconThumbs} name='thumbs-down-outline' color={Color.grey} size={30} />
//         </TouchableOpacity>

//         <TouchableOpacity onPress = {() => this.myref.current.swipeRight()}
//         style ={styles.like_Button}>
//             {/* <AntDesign name="heart" size={24} color = 'green' /> */}
            
//             <Ionicons style={styles.iconHeart} name='heart-outline' color={Color.grey} size={30} />
//         </TouchableOpacity>

//       </View>
//       <Text> HomeScreen</Text>

//     </SafeAreaView>
//   )
// }
// }
// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     alignItems:'left',
//     justifyContent:'left'},
//   inputView: {
//       left: '12.62%',
//       marginTop: 60,
//       width: '80%'
//     },
//   input: {
//       height: 40,
//       borderWidth: 2,
//       padding: 10,
//     },
//   passwordStyle: {
//       flex: 1,
//       height: 40,
//       borderWidth: 2,
//       padding: 10,
//   },
//   button_view: {
//       left: '6.62%',
//       height: 40,
//       marginTop: 560,
//       width: '80%',
//       // flex: 1,
//       flexDirection: 'row',
//       justifyContent:'space-between',
//   },
//   // new_user: {
//   //     marginTop: 10,
//   //     height: 30,
//   //     paddingHorizontal: Platform.OS === 'ios' ? 90 : 120,
//   //     // left: '300%',
//   //     textDecorationLine: 'underline',
//   //     color: Color.Button_blue,
//   // },
//   buttonView: {
//       left: '12.62%',
//       height: 40,
//       marginTop: 60,
//       width: '80%',
//       borderRadius: 5,
//   },
//   // loginButton: {
//   //     color: Color.white,
//   //     fontSize: 15,
//   //     textAlign: 'center',
//   //     padding: 10
//   // },
//   card_view: {

//       aspectRatio: 3/4,
//       backgroundColor: '#FFFFFF',
//       borderRadius: 0.75,
//   },
//   like_Button: {
//       color: Color.white,
//       alignItems: "center",
//       justifyContent: "center",
//       overflow: "hidden",
//       width: '16%',
//       height: '86%',
//       // backgroundColor: 'green',
//   },
//   dislike_Button: {
//     color: Color.white,
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//     width: '26%',
//     height: '86%',
//     // backgroundColor: 'red',
//   },
//   g_Button: {
//       color: Color.black,
//       fontSize: 15,
//       textAlign: 'center',
//       marginLeft: 18
//   },
//   imageStyle: {
//       position:'absolute',
//       top: 0,
//       height: 100,
//       width: 100,
//       borderRadius: 0.75,
//   },
//   image_Data: {
//     position:'absolute',
//     bottom: 0,
//     backgroundColor: '#FFFFFF',
//     height: 20,
//     width: 100,
//   }
// });





// function mapStateToProps(state) {
//   return {
//     data_values: state,
//     homeapimsg: state.homeapimsg,
//   };
// }
 
// // const mapDispatchToProps={
// //   homescreendata,homeUsers
// // }
 
// // export default connect(mapStateToProps, mapDispatchToProps)(initialScreen);
 
// export default connect(mapStateToProps,null)(Profiles);




// import React, { useEffect, useState } from "react";
// import {
//     Platform,
//     StyleSheet,
//     Text,
//     Image,
//     View,
//     Button,
//     TextInput,
//     SafeAreaView,
//     TouchableOpacity,
//     TouchableWithoutFeedback,
//     ScrollView,
//     Dimensions,
//     StatusBar,
// } from 'react-native';
// import Color from '../contants/Colors';
// import Ionicons from 'react-native-vector-icons/Ionicons';



// const Profiles = (props) => {
//     const [data, setData] = useState({
//         media: "",
//         display_name: "",
//         type: ""
//     });
//     const loadData = () => {
//         console.log("loadData triggered");
//         fetch("https://dev.rentalsandfriends.com/api/match/profile",
//                         {
//                           method: 'POST',
//                           headers: {
//                             'Accept': 'application/json',
//                             'Content-Type': 'application/json',
//                             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGI1ZmI2NTI3MzdhM2M4MzAyZDIwMTY2YzBmMWYxMzk5NTkzOWI0YzQ0YjA0ZjIxYmQ4Mjc2OTk5NWQ1MDNkMTFmZjRjNzJlMmQyZmU3ODAiLCJpYXQiOjE2NjU3NTEyNzkuNjg3ODA4LCJuYmYiOjE2NjU3NTEyNzkuNjg3ODEyLCJleHAiOjE2OTcyODcyNzkuNjQ4NjcsInN1YiI6IjgiLCJzY29wZXMiOltdfQ.k3c0eha3jnwi2g8zAwkGrovFiu8KMb4YuQrOqy-WhDZbnQr4otvgERlk4GNzZ74mhWZFGEcjO3eGxhcNagc_h74Mw4VUSA1cVzpY3a0S13C5cBwFg25_bUjZNML1MOFXNyKw_u9QQK2hWd9MT5DBTE2RB-s_pL6BhkTsI0mGbalCXFTstSZr1gHQT1JzDnHrkYIhqBk2r6Ug8xodmvSv7qhgd2_-MCpEhkf5J6qc1Vdun1MrExeD87IO-eLdPQZ-ov5Wbfaudpn_CS9qmQPf7zm2uZetgApTA06xgF0dP1InE0gZsoRlcWvTYLwv3Zl3YZBEA8k_pkV3xyEWRznhuZG9Urhh5vbSDo0V2k48ZT32_Lw6dXYfJ3tVQgizLOrEjnwquGEV-BKI1sslnpG5qXleKSHmsXyMM0YbxjkLRbzFdEsbnZnaN6fwY02K-8TVcs2jDQ3vdJkX594KOS8ndTe_DOx5trCCc5YCDRssBBYPq-sct6RJOKhjpF1HHUrw99UbxLE0rPjvqRZTl72KK4snaCeTXGeWWKCaopudrjY0h6HcUHvZBuXBXr-_iAQU58caEgOr542vIyindlkxtkqzaCMlV0Sha8_8inR5svltSuUknMncewWTlM8CpkA5Gm23Qdd3eg6m7t_A5Icdjf06q41phGfRVpE7grPcOhk',
//                           },
//                           body: JSON.stringify({
//                               user_id: '4',
//                           })})
//           .then((res) => {
//             return res.toJson();
//           })
//           .then((response) => {
//             setData(response);
//           });
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

//     return (
//         <View>
//             <View style={styles.container}>
//                 <Text style={styles.header}>RentalAndFriends</Text>
//                 <View style={styles.textCard}>
//                     {data.display_name && <Text style={styles.displayText}>{data.display_name}</Text>}
//                 </View>
//                 <View style={styles.imageCard}>
//                     {data.media && <Image source={{ uri: data.media }}
//                         style={{ width: 335, height: 226 }} />}
//                     {data.media && <Ionicons style={styles.iconHeart} name='heart-outline' color={Color.grey} size={30} />}
//                     {data.media && <Ionicons style={styles.iconThumbs} name='thumbs-down-outline' color={Color.grey} size={30} />}
//                 </View>
//             </View>
//             <View style={styles.homeCard}>
//                 <Ionicons style={styles.homeOutline} name='home-outline' color={Color.grey} size={30} />
//                 {data.type && <Text style={styles.subText}>{data.type}</Text>}
//             </View>
//         </View>
//     );

// };
// const styles = StyleSheet.create({
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     header: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginTop: 15,
//     },
//     iconHeart: {
//         position: 'absolute',
//         top: 10,
//         right: 10,
//         zIndex: 100,

//     },
//     iconThumbs: {
//         position: 'absolute',
//         top: 40,
//         right: 10,
//         zIndex: 100,

//     },
//     textCard: {
//         backgroundColor: 'lightgray',
//         marginTop: 15,
//         width: 335,
//         height: 74,
//     },
//     homeCard: {
//         backgroundColor: 'lightgray',
//         marginTop: 25,
//         width: 132,
//         height: 43,
//         display: 'flex',
//         justifyContent: 'center',
//         marginLeft: 25,
//     },
//     homeOutline: {

//     },
//     nextButton: {
//         color: Color.white,
//         fontSize: 15,
//         textAlign: 'center',
//         padding: 10
//     },
//     displayText: {
//         padding: 10,
//         fontSize: 15,
//     },

//     imageCard: {
//         backgroundColor: 'lightgray',
//         width: 335,
//         height: 226,
//     },
//     imageSize: {
//         width: 335,
//         height: 226,
//     }


// });
// export default Profiles;





// // import { View, Text,ActivityIndicator, FlatList, StyleSheet, Image } from "react-native";
// // // import React, { useState, useEffect } from "react";

// // import React, { Component } from 'react';
// // import { ActivityIndicator, FlatList, Text, View } from 'react-native';


// import React, { Component } from 'react';
// import { ActivityIndicator, FlatList, Text, View } from 'react-native';

// export default class Profiles extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data: [],
//       isLoading: true
//     };
//   }


//   // async getMovies() {
//   //   try {
//   //     const response = await fetch('https://dev.rentalsandfriends.com/api/match/profile',
//   //               {
//   //                 method: 'POST',
//   //                 headers: {
//   //                   'Accept': 'application/json',
//   //                   'Content-Type': 'application/json',
//   //                   'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGI1ZmI2NTI3MzdhM2M4MzAyZDIwMTY2YzBmMWYxMzk5NTkzOWI0YzQ0YjA0ZjIxYmQ4Mjc2OTk5NWQ1MDNkMTFmZjRjNzJlMmQyZmU3ODAiLCJpYXQiOjE2NjU3NTEyNzkuNjg3ODA4LCJuYmYiOjE2NjU3NTEyNzkuNjg3ODEyLCJleHAiOjE2OTcyODcyNzkuNjQ4NjcsInN1YiI6IjgiLCJzY29wZXMiOltdfQ.k3c0eha3jnwi2g8zAwkGrovFiu8KMb4YuQrOqy-WhDZbnQr4otvgERlk4GNzZ74mhWZFGEcjO3eGxhcNagc_h74Mw4VUSA1cVzpY3a0S13C5cBwFg25_bUjZNML1MOFXNyKw_u9QQK2hWd9MT5DBTE2RB-s_pL6BhkTsI0mGbalCXFTstSZr1gHQT1JzDnHrkYIhqBk2r6Ug8xodmvSv7qhgd2_-MCpEhkf5J6qc1Vdun1MrExeD87IO-eLdPQZ-ov5Wbfaudpn_CS9qmQPf7zm2uZetgApTA06xgF0dP1InE0gZsoRlcWvTYLwv3Zl3YZBEA8k_pkV3xyEWRznhuZG9Urhh5vbSDo0V2k48ZT32_Lw6dXYfJ3tVQgizLOrEjnwquGEV-BKI1sslnpG5qXleKSHmsXyMM0YbxjkLRbzFdEsbnZnaN6fwY02K-8TVcs2jDQ3vdJkX594KOS8ndTe_DOx5trCCc5YCDRssBBYPq-sct6RJOKhjpF1HHUrw99UbxLE0rPjvqRZTl72KK4snaCeTXGeWWKCaopudrjY0h6HcUHvZBuXBXr-_iAQU58caEgOr542vIyindlkxtkqzaCMlV0Sha8_8inR5svltSuUknMncewWTlM8CpkA5Gm23Qdd3eg6m7t_A5Icdjf06q41phGfRVpE7grPcOhk',
//   //                 },
//   //                 body: JSON.stringify({
//   //                     user_id: '4',
//   //                 })});
//   //     const json = await response.json();
//   //     this.setState({ data: json.movies });s
//   //   } catch (error) {
//   //     console.log(error);
//   //   } finally {
//   //     this.setState({ isLoading: false });
//   //   }
//   // }

//   componentDidMount() {
//     this.getMovies();
//   }

//   render() {
//     const { data, isLoading } = this.state;

//     return (
//       <View style={{ flex: 1, padding: 24 }}>
//         {isLoading ? <ActivityIndicator/> : (
//           <FlatList
//             data={data}
//             keyExtractor={({ id }, index) => id}
//             renderItem={({ item }) => (
//               <Text>{item.display_name}, {item.dob}</Text>
//             )}
//           />
//         )}
//       </View>
//     );
//   }
// };
// // export default Profiles = () => {
// //   // const [isLoading, setLoading] = useState(true);
// //   // const [data, setData] = useState([]);
  
// //   const getMovies = async () => {
// //      try {
// //       const response = await fetch('https://dev.rentalsandfriends.com/api/match/profile',
// //           {
// //             method: 'POST',
// //             headers: {
// //               'Accept': 'application/json',
// //               'Content-Type': 'application/json',
// //               'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGI1ZmI2NTI3MzdhM2M4MzAyZDIwMTY2YzBmMWYxMzk5NTkzOWI0YzQ0YjA0ZjIxYmQ4Mjc2OTk5NWQ1MDNkMTFmZjRjNzJlMmQyZmU3ODAiLCJpYXQiOjE2NjU3NTEyNzkuNjg3ODA4LCJuYmYiOjE2NjU3NTEyNzkuNjg3ODEyLCJleHAiOjE2OTcyODcyNzkuNjQ4NjcsInN1YiI6IjgiLCJzY29wZXMiOltdfQ.k3c0eha3jnwi2g8zAwkGrovFiu8KMb4YuQrOqy-WhDZbnQr4otvgERlk4GNzZ74mhWZFGEcjO3eGxhcNagc_h74Mw4VUSA1cVzpY3a0S13C5cBwFg25_bUjZNML1MOFXNyKw_u9QQK2hWd9MT5DBTE2RB-s_pL6BhkTsI0mGbalCXFTstSZr1gHQT1JzDnHrkYIhqBk2r6Ug8xodmvSv7qhgd2_-MCpEhkf5J6qc1Vdun1MrExeD87IO-eLdPQZ-ov5Wbfaudpn_CS9qmQPf7zm2uZetgApTA06xgF0dP1InE0gZsoRlcWvTYLwv3Zl3YZBEA8k_pkV3xyEWRznhuZG9Urhh5vbSDo0V2k48ZT32_Lw6dXYfJ3tVQgizLOrEjnwquGEV-BKI1sslnpG5qXleKSHmsXyMM0YbxjkLRbzFdEsbnZnaN6fwY02K-8TVcs2jDQ3vdJkX594KOS8ndTe_DOx5trCCc5YCDRssBBYPq-sct6RJOKhjpF1HHUrw99UbxLE0rPjvqRZTl72KK4snaCeTXGeWWKCaopudrjY0h6HcUHvZBuXBXr-_iAQU58caEgOr542vIyindlkxtkqzaCMlV0Sha8_8inR5svltSuUknMncewWTlM8CpkA5Gm23Qdd3eg6m7t_A5Icdjf06q41phGfRVpE7grPcOhk',
// //             },
// //             body: JSON.stringify({
// //                 user_id: '4',
// //             })});
// //       const json = await response.json();
// //       setData(json);
// //       console.log(json);
// //       return json;
// //     } catch (error) {
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   useEffect(() => {
// //     getMovies();
// //   }, []);

// //   return (
// //     <View style={{ flex: 1, padding: 24 }}>

// //         <FlatList
// //           // data={data}
// //           keyExtractor={({ id }, index) => id}
// //           renderItem={({ item }) => (
// //             <Text>{item.display_name}, {item.dob}</Text>
// //           )}
// //         />
      
// //     </View>
// //   );
// // };

// // class Profiles extends Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       data: [],
// //       isLoading: true
// //     };
// //   }
// //   getProfiles() {
// //   const resp = () => {
// //     return fetch('https://dev.rentalsandfriends.com/api/match/profile',
// //     {
// //       method: 'POST',
// //       headers: {
// //         Accept: 'application/json',
// //         "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGI1ZmI2NTI3MzdhM2M4MzAyZDIwMTY2YzBmMWYxMzk5NTkzOWI0YzQ0YjA0ZjIxYmQ4Mjc2OTk5NWQ1MDNkMTFmZjRjNzJlMmQyZmU3ODAiLCJpYXQiOjE2NjU3NTEyNzkuNjg3ODA4LCJuYmYiOjE2NjU3NTEyNzkuNjg3ODEyLCJleHAiOjE2OTcyODcyNzkuNjQ4NjcsInN1YiI6IjgiLCJzY29wZXMiOltdfQ.k3c0eha3jnwi2g8zAwkGrovFiu8KMb4YuQrOqy-WhDZbnQr4otvgERlk4GNzZ74mhWZFGEcjO3eGxhcNagc_h74Mw4VUSA1cVzpY3a0S13C5cBwFg25_bUjZNML1MOFXNyKw_u9QQK2hWd9MT5DBTE2RB-s_pL6BhkTsI0mGbalCXFTstSZr1gHQT1JzDnHrkYIhqBk2r6Ug8xodmvSv7qhgd2_-MCpEhkf5J6qc1Vdun1MrExeD87IO-eLdPQZ-ov5Wbfaudpn_CS9qmQPf7zm2uZetgApTA06xgF0dP1InE0gZsoRlcWvTYLwv3Zl3YZBEA8k_pkV3xyEWRznhuZG9Urhh5vbSDo0V2k48ZT32_Lw6dXYfJ3tVQgizLOrEjnwquGEV-BKI1sslnpG5qXleKSHmsXyMM0YbxjkLRbzFdEsbnZnaN6fwY02K-8TVcs2jDQ3vdJkX594KOS8ndTe_DOx5trCCc5YCDRssBBYPq-sct6RJOKhjpF1HHUrw99UbxLE0rPjvqRZTl72KK4snaCeTXGeWWKCaopudrjY0h6HcUHvZBuXBXr-_iAQU58caEgOr542vIyindlkxtkqzaCMlV0Sha8_8inR5svltSuUknMncewWTlM8CpkA5Gm23Qdd3eg6m7t_A5Icdjf06q41phGfRVpE7grPcOhk"
// //       },
// //       body: JSON.stringify({
// //           "user_id": "4"
// //       })
// //       }).then((response) => response.json())
// //       .then((data) => {
// //         console.log(json)
// //         return json;
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
    
// //   }};

// // //   async getProfiles() {
// // //     try {
// // //       const response =  fetch('https://dev.rentalsandfriends.com/api/match/profile',
// // //       {
// // //         method: 'POST',
// // //         headers: {
// // //           Accept: 'application/json',
// // //           "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGI1ZmI2NTI3MzdhM2M4MzAyZDIwMTY2YzBmMWYxMzk5NTkzOWI0YzQ0YjA0ZjIxYmQ4Mjc2OTk5NWQ1MDNkMTFmZjRjNzJlMmQyZmU3ODAiLCJpYXQiOjE2NjU3NTEyNzkuNjg3ODA4LCJuYmYiOjE2NjU3NTEyNzkuNjg3ODEyLCJleHAiOjE2OTcyODcyNzkuNjQ4NjcsInN1YiI6IjgiLCJzY29wZXMiOltdfQ.k3c0eha3jnwi2g8zAwkGrovFiu8KMb4YuQrOqy-WhDZbnQr4otvgERlk4GNzZ74mhWZFGEcjO3eGxhcNagc_h74Mw4VUSA1cVzpY3a0S13C5cBwFg25_bUjZNML1MOFXNyKw_u9QQK2hWd9MT5DBTE2RB-s_pL6BhkTsI0mGbalCXFTstSZr1gHQT1JzDnHrkYIhqBk2r6Ug8xodmvSv7qhgd2_-MCpEhkf5J6qc1Vdun1MrExeD87IO-eLdPQZ-ov5Wbfaudpn_CS9qmQPf7zm2uZetgApTA06xgF0dP1InE0gZsoRlcWvTYLwv3Zl3YZBEA8k_pkV3xyEWRznhuZG9Urhh5vbSDo0V2k48ZT32_Lw6dXYfJ3tVQgizLOrEjnwquGEV-BKI1sslnpG5qXleKSHmsXyMM0YbxjkLRbzFdEsbnZnaN6fwY02K-8TVcs2jDQ3vdJkX594KOS8ndTe_DOx5trCCc5YCDRssBBYPq-sct6RJOKhjpF1HHUrw99UbxLE0rPjvqRZTl72KK4snaCeTXGeWWKCaopudrjY0h6HcUHvZBuXBXr-_iAQU58caEgOr542vIyindlkxtkqzaCMlV0Sha8_8inR5svltSuUknMncewWTlM8CpkA5Gm23Qdd3eg6m7t_A5Icdjf06q41phGfRVpE7grPcOhk"
// // // },
// // //         body: JSON.stringify({
// // //             "user_id": "4"
// // //         })
// // //         .then((response) => response.json())
// // //         .then((json) => 

// // //         console.log(json)
// // //         return json;
        
// // //       }); 
// //     //   const json = await response.json();
// //     //   this.setState({ data: json.profdata });
// //     //   console.log(data);
// //     // } catch (error) {
// //     //   console.log(error);
// //     // } finally {
// //     //   this.setState({ isLoading: false });
// //     // }
  

// //   componentDidMount() {
// //     fetch('https://dev.rentalsandfriends.com/api/match/profile',
// //     {
// //       method: 'POST',
// //       headers: {
// //         Accept: 'application/json',
// //         "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGI1ZmI2NTI3MzdhM2M4MzAyZDIwMTY2YzBmMWYxMzk5NTkzOWI0YzQ0YjA0ZjIxYmQ4Mjc2OTk5NWQ1MDNkMTFmZjRjNzJlMmQyZmU3ODAiLCJpYXQiOjE2NjU3NTEyNzkuNjg3ODA4LCJuYmYiOjE2NjU3NTEyNzkuNjg3ODEyLCJleHAiOjE2OTcyODcyNzkuNjQ4NjcsInN1YiI6IjgiLCJzY29wZXMiOltdfQ.k3c0eha3jnwi2g8zAwkGrovFiu8KMb4YuQrOqy-WhDZbnQr4otvgERlk4GNzZ74mhWZFGEcjO3eGxhcNagc_h74Mw4VUSA1cVzpY3a0S13C5cBwFg25_bUjZNML1MOFXNyKw_u9QQK2hWd9MT5DBTE2RB-s_pL6BhkTsI0mGbalCXFTstSZr1gHQT1JzDnHrkYIhqBk2r6Ug8xodmvSv7qhgd2_-MCpEhkf5J6qc1Vdun1MrExeD87IO-eLdPQZ-ov5Wbfaudpn_CS9qmQPf7zm2uZetgApTA06xgF0dP1InE0gZsoRlcWvTYLwv3Zl3YZBEA8k_pkV3xyEWRznhuZG9Urhh5vbSDo0V2k48ZT32_Lw6dXYfJ3tVQgizLOrEjnwquGEV-BKI1sslnpG5qXleKSHmsXyMM0YbxjkLRbzFdEsbnZnaN6fwY02K-8TVcs2jDQ3vdJkX594KOS8ndTe_DOx5trCCc5YCDRssBBYPq-sct6RJOKhjpF1HHUrw99UbxLE0rPjvqRZTl72KK4snaCeTXGeWWKCaopudrjY0h6HcUHvZBuXBXr-_iAQU58caEgOr542vIyindlkxtkqzaCMlV0Sha8_8inR5svltSuUknMncewWTlM8CpkA5Gm23Qdd3eg6m7t_A5Icdjf06q41phGfRVpE7grPcOhk"
// //       },
// //       body: JSON.stringify({
// //           user_id: "4"
// //       })
// //       }).then((response) => response.json())
// //       .then((json) => {
// //         console.log(json)
// //         return json;
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //   }

// //   render() {
// //     const { data, isLoading } = this.state;

// //     return (
// //       <View style={{ flex: 1, padding: 24 }}>
// //         {isLoading ? <ActivityIndicator/> : (
// //           <FlatList
// //             data={data}
// //             keyExtractor={({ id }, index) => id}
// //             renderItem={({ item }) => (
// //               <Text>{item.display_name}, {item.hometown}</Text>
// //             )}
// //           />
// //         )}
// //       </View>
// // //       <View style={{flexDirection: 'row', textAlign: 'left', fontSize: 15, backgroundColor:'grey'}}>
// // //         data = {data}
// // //       {/* <Image source={{uri: data.media(1)}} style={{width: 70, height: 70, borderRadius:70}} /> */}
// // //       {/* <Text style={{ backgroundColor:'lightblue', alignSelf: "center" }}></Text> */}
// // //       <Text> {data.display_name} </Text>
// // // </View>
// //     );
// //   };

// // // const Profiles = () => {
// // //   const [isLoaded, setIsLoaded] = useState(true);
// // //   const [myData, setMyData] = useState([]);

// // //   const getUserData = async () => {
// // //     try {
// // //       const response = await fetch(
// // //         "https://dev.rentalsandfriends.com/api/match/profile" , {
// // //           "method": "POST",
// // //           "headers": {
// // //             "Accept": "application/json",
// // //             "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGI1ZmI2NTI3MzdhM2M4MzAyZDIwMTY2YzBmMWYxMzk5NTkzOWI0YzQ0YjA0ZjIxYmQ4Mjc2OTk5NWQ1MDNkMTFmZjRjNzJlMmQyZmU3ODAiLCJpYXQiOjE2NjU3NTEyNzkuNjg3ODA4LCJuYmYiOjE2NjU3NTEyNzkuNjg3ODEyLCJleHAiOjE2OTcyODcyNzkuNjQ4NjcsInN1YiI6IjgiLCJzY29wZXMiOltdfQ.k3c0eha3jnwi2g8zAwkGrovFiu8KMb4YuQrOqy-WhDZbnQr4otvgERlk4GNzZ74mhWZFGEcjO3eGxhcNagc_h74Mw4VUSA1cVzpY3a0S13C5cBwFg25_bUjZNML1MOFXNyKw_u9QQK2hWd9MT5DBTE2RB-s_pL6BhkTsI0mGbalCXFTstSZr1gHQT1JzDnHrkYIhqBk2r6Ug8xodmvSv7qhgd2_-MCpEhkf5J6qc1Vdun1MrExeD87IO-eLdPQZ-ov5Wbfaudpn_CS9qmQPf7zm2uZetgApTA06xgF0dP1InE0gZsoRlcWvTYLwv3Zl3YZBEA8k_pkV3xyEWRznhuZG9Urhh5vbSDo0V2k48ZT32_Lw6dXYfJ3tVQgizLOrEjnwquGEV-BKI1sslnpG5qXleKSHmsXyMM0YbxjkLRbzFdEsbnZnaN6fwY02K-8TVcs2jDQ3vdJkX594KOS8ndTe_DOx5trCCc5YCDRssBBYPq-sct6RJOKhjpF1HHUrw99UbxLE0rPjvqRZTl72KK4snaCeTXGeWWKCaopudrjY0h6HcUHvZBuXBXr-_iAQU58caEgOr542vIyindlkxtkqzaCMlV0Sha8_8inR5svltSuUknMncewWTlM8CpkA5Gm23Qdd3eg6m7t_A5Icdjf06q41phGfRVpE7grPcOhk"
// // //           },
// // //           body: JSON.stringify({
// // //             "user_id": "4"
// // //           })
// // //         }
// // //       );
// // //       const realData = await response.json();
// // //       setMyData(realData);
// // //       setIsLoaded(false);
// // //       // console.log(realData);
// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };

// // //   useEffect(() => getUserData(), []);

// // //   const showUserData = ({ item }) => {
// // //     return (
// // //       <View style={styles.card}>
// // //         <View style={styles.imgContainer}>
// // //           <ImageBackground
// // //              style={styles.imgStyle} source={{ uri: item.media(1) }} >
// // //              <View style={styles.textView}>
// // //                 <Text style={styles.imageText}>{item.display_name}, {item.gender}</Text>
// // //               </View>
// // //           </ImageBackground>
// // //         </View>

// // //         <View>
// // //           <View style={styles.bioDataContainer}>
// // //             <Text style={styles.bioData}> {item.ethnicity} </Text>
// // //             <Text style={styles.bioData}> {item.hometown} </Text>

   

// // //           </View>

// // //           <View style={styles.mainContain}>
// // //             <Text style={styles.myName}> {item.relationship_status} </Text>
// // //             <Text style={styles.myName}> {item.dietary_preference} </Text>
// // //             <Text style={styles.myName}> {item.work} </Text>
// // //             <Text style={styles.myName}> {item.pets} </Text>
// // //             <Text style={styles.myName}> {item.smoking} </Text>
// // //             <Text style={styles.myName}> {item.drinking} </Text>
// // //             <Text style={styles.myName}> {item.work} </Text>
// // //           </View>
// // //         </View>
// // //       </View>
// // //     );
// // //   };

// // //   return (
// // //     <View>
// // //       {/* <Text style={styles.mainHeader}>List of Students</Text> */}
// // //       <Text style={styles.myName}>
// // //         keyExtractor={(item) => item.id}
// // //         data={myData}
// // //         renderItem={showUserData}
// // //         horizontal
// // //         showsHorizontalScrollIndicator={false}
// // //       </Text>
// // //     </View>
// // //   );
// // // };
// // }
// // const styles = StyleSheet.create({
// //   mainContainer: {
// //     width: "100%",
// //     minHeight: "100%",
// //     paddingVertical: 50,
// //     backgroundColor: "#ebedee",
// //   },
// //   card: {
// //     width: 250,
// //     height: 350,
// //     backgroundColor: "#fff",
// //     borderRadius: 5,
// //     margin: 20,
// //   },
// //   bioDataContainer: {
// //     width: "100%",
// //     display: "flex",
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     backgroundColor: "#353535",
// //     paddingVertical: 10,
// //     // fontFamily: "JosefinSans_400Regular",
// //   },
// //   idNumber: {
// //     fontSize: 20,
// //     color: "rgba(255, 255, 255, 0.5)",
// //     // fontFamily: "JosefinSans_400Regular",
// //     paddingRight: 10,
// //   },
// //   bioData: {
// //     fontSize: 30,
// //     color: "#fff",
// //     // fontFamily: "JosefinSans_400Regular",
// //   },
// //   mainHeader: {
// //     fontSize: 30,
// //     color: "#a18ce5",
// //     textAlign: "center",
// //     // fontFamily: "JosefinSans_400Regular",
// //   },
// //   imgContainer: {
// //     padding: 10,
// //   },
// //   imgStyle: {
// //     width: "100%",
// //     height: 180,
// //   },
// //   mainContain: {
// //     padding: 10,
// //     backgroundColor: "#353535",
// //     borderBottomLeftRadius: 5,
// //     borderBottomRightRadius: 5,
// //   },
// //   myName: {
// //     fontSize: 14,
// //     color: "#fff",
// //     marginBottom: 10,
// //     alignSelf: "flex-start",
// //     textTransform: "capitalize",
// //     // fontFamily: "JosefinSans_400Regular",
// //   },
// // });

// // export default Profiles;