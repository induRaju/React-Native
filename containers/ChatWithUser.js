import {React,  Component,useState, useCallback, useEffect,useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback,Image } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Bubble, GiftedChat,InputToolbar,Send } from 'react-native-gifted-chat';  
import  IndividualChat from '../components/IndividualChat';
import { useDispatch,useSelector } from 'react-redux';
//import { Icon } from 'react-native-vector-icons/Icon';
import {loginuser} from '../actions/ChatWithUserActions';
import {ChatWithUser} from '../actions/ChatWithUserActions';
import {sendmessages} from '../actions/ChatWithUserActions';

//import {useNavigation} from 'react-navigation-hooks';
import { useNavigation } from '@react-navigation/native'


const ChatWithUserScreen = ()=>
{
   const [messages,setMessages]=useState([]);
  // const [count,setcount]=useState(0)
   const dispatch=useDispatch();
       const senduserid=useSelector(state=>state.send_userid);
       console.log("user_id"+senduserid)
       const navigation= useNavigation();
       const Authorization=useSelector(state=>state.Authorization)
       const profile=useSelector(state=>state.profile)
       const mes=useSelector(state=>state.messages)
       const [loading,setLoading]=useState(true);
      
  //   useEffect(() => {
  //      console.log("useEffect");
       
       
  //       console.log("senduserid....",senduserid)
  //      if( profile===null ||profile===undefined)
  //      {
  //      console.log("inprofile")
  //       const payload1={
  //           Authorization:Authorization,
  //           user_id:senduserid
  //       }
       
  //       dispatch(loginuser(payload1));
        
  //      }
  //      if(profile!==null||profile!==undefined)
  //      console.log("profile4"+profile)
  //       const payload={
  //         Authorization:Authorization,
  //         user_id:senduserid
  //     }
  //    if(mes===undefined)
  //       dispatch(ChatWithUser(payload));
      
  //      var arr=[]
    
  //    if(mes!==undefined && mes.messages.length>0)
  //   {  let i=0;
  //     console.log("messa"+mes.messages[0].from_user_id)
  //     mes.messages.forEach(element => {
      
  //       console.log("cnt",i++)
  //       arr.push( {
  //         _id:i,
  //         text:element.message,
  //         createdAt:element.sent_at,
  //         user:{
  //           _id:element.from_user_id
  //         }
  //       }) 
    
      
  //   })
  //   var arr1=arr.slice().reverse()
  //   setMessages(arr1);
  //   console.log("mes1"+arr[0]?._id)
  //   console.log("mes2"+messages[0]?._id)
 
    
  // }
  
 

      // } ,[mes,profile])
      function usePrevious() {
        const ref = useRef();
        useEffect(() => {
          ref.current = mes?.messages?.length;
        });
        return ref.current;
      }
      const prevmes=usePrevious()
       useFocusEffect(
        useCallback(() => {
          
          
       console.log("useEffect");
       
     navigation.addListener('blur', () => {
        navigation.navigate('Chatstack')
      });
        console.log("senduserid....",senduserid)
       if( profile===null ||profile===undefined)
       {
       console.log("inprofile")
        const payload1={
            Authorization:Authorization,
            user_id:senduserid
        }
       
        dispatch(loginuser(payload1));
        
       }
       
       if(profile!==null||profile!==undefined)
       console.log("profile4"+profile)
        const payload={
          Authorization:Authorization,
          user_id:senduserid
      }
     if(mes===undefined)
       { dispatch(ChatWithUser(payload));

       }
      //  console.log("messages",mes?.messages[0])
      // var ele={}
       var arr=[]
      
     if(mes!==undefined && mes.messages.length>0)
    {  let i=0;
   
      console.log("messa"+mes.messages[0].from_user_id)
      mes.messages.forEach(element => {
      
        console.log("cnt",i++)
        arr.push( {
          _id:i,
          text:element.message,
          createdAt:element.sent_at,
          user:{
            _id:element.from_user_id
          }
        }) 
     //  });
      
    })
    var arr1=arr.slice().reverse()
    setMessages(arr1);
    console.log("mes1"+arr[0]?._id)
    console.log("mes2"+messages[0]?._id)
  }
          console.log('Screen was focused');

          console.log("send67",senduserid)
          const pay={
            Authorization:Authorization,
            user_id:senduserid
        }
        console.log("prevmes",prevmes)
        let e=15000;
    if(mes?.messages?.length!=prevmes)
    {
      console.log("prevmes",prevmes)
          e=5000;
      console.log("e"+e)
      }
    
   let interval = setInterval(() => {
      dispatch(ChatWithUser(pay))
   }, e);
         

    
          return () => {
    
            console.log('Screen was unfocused');
            console.log("bye")
              clearInterval(interval)
           //   navigation.navigate('Chatstack')
              
            // Useful for cleanup functions
    
          };

        }, [senduserid,mes,profile])

      
      );
     
      const onSend = useCallback((messages = []) => {
       
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const payload={
          Authorization:Authorization,
          from_user_id: profile.user_id,
          to_user_id:senduserid,
          message:messages
        }
        console.log("payload"+payload)
         dispatch(sendmessages(payload))
        
      })
     const renderInputToolbar =(props)=>{
        console.log("inputtool");
       return <InputToolbar {...props} containerStyle={styles.inputToolbar} />
      }
      const rendersend=(props)=>
      {
        console.log("send")
        return <Send {...props} ><View style={{marginRight: 10, marginBottom: 5}}> 
        <Image source={require('../assets/png/send-icon.png')} style={{
            width: 20,
            height: 20,
          }}></Image>
          </View>
    </Send>
    
      }

  const renderBubble=(props)=>{
   return(
   <Bubble {...props}
    wrapperStyle={{
      right:{
        backgroundColor:'lightgrey'
      },
      left:{
        backgroundColor:'lightgrey'
      }
    }}
    textStyle={{
      right:
      {color:'black'},
      left:
      {color:'black'}
    }}
  
    ></Bubble>
   );
  }
return (
    
   
    <View style={{flex: 1,marginBottom: 20,height:'90%'}}>
    
    
     <IndividualChat navigation={navigation} ></IndividualChat>
    
    <GiftedChat  
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: profile?.user_id,
      }}
      renderInputToolbar={renderInputToolbar}
      alwaysShowSend={true}
      renderSend={rendersend}
      renderBubble={renderBubble}
      scrollToBottom={true}
      alignTop={true}
    />
    </View>
    
  )
 /* return (
    <View>
      <Text>Request screen</Text>
    </View>
  );*/
    }
    const styles = StyleSheet.create({
        inputToolbar: {
            position:'relative',
           // marginTop:'1%' ,
            marginLeft: 15,
            //paddingTop:'-2%',
            marginRight: 15,
            marginBottom: 10,
            borderWidth: 0,
           // height:'80%',
            
            borderColor: 'grey',
            borderRadius: 20
           
        },
        sendIcon: {
            fontSize: 25,
            color: '#3A97F9'
        }
        })
      
        
    export default ChatWithUserScreen;
         