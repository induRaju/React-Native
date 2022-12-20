import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback,ScrollView,Dimensions,SafeAreaView,StatusBar, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../contants/Colors';
import Divider from '../components/Divider';
import FBIcon from '../assets/svg/fb.svg';
import GoogleIcon from '../assets/svg/google.svg';


//connect with state
import { connect } from 'react-redux';
import { RegisterRequest } from '../actions/RegisterActions';

import Title from '../components/Title';
const { height } = Dimensions.get('window');

class Register extends Component {
 
  constructor(props) {
    super(props);
    
    this.state = {
      emailText: '',
      pwdText: false,
      ConfirmPwd:"",
      secureword:true,
      secureword1:true,
      checkValidEmail:'',
      checkValidPwd:'',
      pwdErrorMsg:'',
     confirmpwdvalid:'',
     screenHeight: 0,
     
  };
  }
  onClickRegister=(prop) =>
  {
    if (this.state.checkValidEmail === false && this.state.checkValidPwd === false && this.state.confirmpwdvalid=== false) {
      const payload = {
        email: this.state.emailText,
        password: this.state.pwdText,
        password_confirmation: this.state.ConfirmPwd
    };
    this.props.RegisterRequest(payload);
    prop.navigation.navigate('GetStarted1');
  } else {
      alert(checkPassowrd);
  }
  }
  onChangeusername = (val) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    this.setState({
        emailText: val
    });
    if(val==='')
    {
      this.setState({
        checkValidEmail: false
    });
    }
    if (re.test(val) || regex.test(val)) {
        this.setState({
            checkValidEmail: false
        });
    } else {
        this.setState({
            checkValidEmail: true
        });
    }
}
  updatesecureword = () => {
    this.setState({
        secureword: !this.state.secureword
    });
  }
    updatesecureword1 = () => {
      this.setState({
          secureword1: !this.state.secureword1
      });
}
checkPasswordValidity = value => {
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    return 'Password must not contain Whitespaces.';
  }

  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(value)) {
    return 'Password must have at least one Uppercase Character.';
  }

  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  if (!isContainsLowercase.test(value)) {
    return 'Password must have at least one Lowercase Character.';
  }

  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(value)) {
    return 'Password must contain at least one Digit.';
  }

  const isValidLength = /^.{8,16}$/;
  if (!isValidLength.test(value)) {
    return 'Password must be 8-16 Characters Long.';
  }
}

onClickFb = () => {
  alert('Fb is pressed');
}

onClickGoogle = () => {
  alert('Google is pressed')
}
onChangePwdText = (val) => {
  this.setState({
      pwdText: val,
      ConfirmPwd:'',
      confirmpwdvalid:false
  });
  if(val==='')
  this.setState({
    checkValidPwd: true
});
  const checkPassowrd = this.checkPasswordValidity(val);
  if(checkPassowrd) {
      this.setState({
          checkValidPwd: true,
          pwdErrorMsg: checkPassowrd
      });
  } else {
      this.setState({
          checkValidPwd: false
      });
  }
}

ConfirmPwdChange=(event)=> 
{ 
  this.setState(
    {
      ConfirmPwd:event
    }
  )
  if(event === this.state.pwdText)
  {
    this.setState(
      {
        confirmpwdvalid:false
      }
    )
  }
  else
  {
    this.setState(
      {
        confirmpwdvalid:true
      }
    )
  }
}
onContentSizeChange = (contentWidth, contentHeight) => {
  // Save the content height in state
  this.setState({ screenHeight: contentHeight });
};
Alreadyregistered=(props)=>
{
  props.navigation.navigate('Login');
}
 
  render() {
    // const { state, actions } = this.props;
    const scrollEnabled=true
   return(
    
    <SafeAreaView style={styles.con}>
 {/* <StatusBar/> */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollview}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
   <View style={styles.container}>
   <View style={{left: '12.62%', top: '2%'}}>
            <Image
                style={{marginLeft: 40}}
                source={require('../assets/png/splash_login.png')}
            />
        </View>
     <View style={{left: '12.62%', marginTop: 20}}>
            <Title textMsg={'Register'}/>
        </View>        
        <View style={styles.inputView}>
            <View style={{marginTop:10}}>
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => this.onChangeusername(val)}
                    value={this.state.emailText}
                    placeholder="Email Id*"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={35}
                />
               
            </View>
            <View style={{marginTop:10}}>
            {this.state.checkValidEmail && 
                    <Text style={styles.errorMsg}>please enter valid email id</Text>
                }
                </View>
            <View style={{flexDirection: 'row',marginTop:10}}>
                <TextInput
                    style={styles.passwordStyle}
                    onChangeText={(val) => this.onChangePwdText(val)}
                    value={this.state.pwdText}
                    placeholder="Password*"
                    autoCapitalize="none"
                    secureTextEntry={this.state.secureword ? true : false}
                    autoCorrect={false}
                    maxLength={16}
                    password
                />
                <TouchableOpacity style={styles.iconStyle} onPress={this.updatesecureword}>
                    {this.state.secureword ?
                        <Ionicons name='eye-off-sharp' color={Color.grey} size={20}/>
                    :
                        <Ionicons name='eye' color={Color.grey} size={20}/>
                    }
                </TouchableOpacity>
              
            </View>
            <View style={{marginTop:10}}>
            {this.state.checkValidPwd && 
                    <Text style={styles.errorMsg}>{this.state.pwdErrorMsg}</Text>
                }
                </View>
            <View style={{flexDirection: 'row',marginTop:10}}>
            { (this.state.checkValidPwd || this.state.pwdText===false) &&
              <View style={{width:'100%',height:55}}>
                <TextInput
                    style={[styles.passwordStyle,{backgroundColor: '#E5E4E2'}]}
                    placeholder="Confirm Password*"
                    autoCapitalize="none"
                    secureTextEntry={this.state.secureword1 ? true : false}
                    autoCorrect={false}
                    maxLength={16}
                    password
                    editable = {false}
                />
                </View>
            
            }
        
            {this.state.checkValidPwd===false  &&
            <View style={{width:'100%',height:55}}>
              <TextInput
                    style={[styles.passwordStyle]}
                    onChangeText={(value)=>this.ConfirmPwdChange(value)}
                    value={this.state.ConfirmPwd}
                    placeholder="confirmPassword*"
                    autoCapitalize="none"
                    secureTextEntry={this.state.secureword1 ? true : false}
                    autoCorrect={false}
                    maxLength={16}
                    password  
                />
                 <TouchableOpacity style={styles.iconStyle} onPress={this.updatesecureword1}>
                    {this.state.secureword1 ?
                        <Ionicons name='eye-off-sharp' color={Color.grey} size={20}/>
                    :
                        <Ionicons name='eye' color={Color.grey} size={20}/>
                    }
                </TouchableOpacity>
                </View>
                
            }
          
            </View>
      
          <View style={{marginTop:10}} >
                {this.state.confirmpwdvalid && !this.state.checkValidPwd &&
                    <Text style={styles.errorMsg}>Please does not match</Text>
                }
                </View>
               
            </View>
                <TouchableOpacity style={styles.already_reg} onPress={()=>this.Alreadyregistered(this.props)} >
                <Text style={{textDecorationLine: 'underline'}}>Already Registered?</Text>
            </TouchableOpacity>
            <View style={styles.buttonView}>
           { this.state.confirmpwdvalid===false && this.state.checkValidEmail===false &&  this.state.checkValidPwd===false && this.state.ConfirmPwd!=''
           && this.state.pwdText!=false &&this.state.emailText!='' && this.state.pwdText!=false  ?
           (
                <TouchableWithoutFeedback
                onPress={()=>this.onClickRegister(this.props)}
                >
                <Text style={[styles.nextbutton,{backgroundColor: Color.black}]}>Register</Text>
               </TouchableWithoutFeedback>
           ): (
               <TouchableWithoutFeedback disabled>
                <Text style={[styles.nextbutton,{backgroundColor: Color.grey}]}>Register</Text>
               </TouchableWithoutFeedback>
           )
           }
        </View>
        {/* <Divider style={{ marginTop: 10}}/>
        <View style={styles.fb_buttonView}>
            <TouchableOpacity onPress={this.onClickFb}>
                <View style={{marginLeft: 22, marginTop: 10, flexDirection: 'row'}}>
                    <FBIcon width={25} height={23} fill={Color.white} />
                    <Text style={styles.fb_Button}>Register with Facebook</Text>
                </View>
                
            </TouchableOpacity>
        </View>
        <View style={styles.g_buttonView}>
            <TouchableOpacity onPress={this.onClickGoogle} >
                <View style={{marginLeft: 30, marginTop: 10, flexDirection: 'row'}}>
                    <GoogleIcon width={25} height={23} fill={Color.white} />
                    <Text style={styles.g_Button}>Register with Google</Text>
                </View>
            </TouchableOpacity>
        </View>  */}
        
       
            </View>
     </ScrollView>  
     </SafeAreaView>
      
   )
    
  }
}



const styles = StyleSheet.create({
    
      container: {
        flex: 1,
        marginTop: 20
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
      left: '12.62%',
      marginTop: 5,
      width: '80%'
    },
    input: {
      height: 40,
      borderWidth: 2,
      padding: 10,
    },
    passwordStyle: {
     marginTop:15,
      flex:1,
      height: 40,
      borderWidth: 2,
      padding: 10,
  },
  g_Button: {
    color: Color.black,
    fontSize: 15,
    textAlign: 'center',
    marginLeft: 18,
},
g_buttonView: {
  left: '12.62%',
  height: 40,
  marginTop: 60,
  width: '80%',
  backgroundColor: Color.white,
  borderRadius: 10,
  borderWidth: 1,
  shadowColor: Color.shadow_color,
  shadowOffset: {width: -3, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 4
},
fb_Button: {
  color: Color.white,
  fontSize: 15,
  textAlign: 'center',
  marginLeft: 18
},
fb_buttonView: {
  left: '13%',
  height: 40,
  marginTop: 60,
  width: '80%',
  backgroundColor: Color.Button_blue,
  borderRadius: 10,
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
  top:'3%',
  width:'80%',
  height:40,
  left:'12.62%',
  backgroundColor:'black'

},
already_reg: {
  marginTop: 30,
  height: 30,
  left:'57%',
  
},
nextbutton:
{
  color: Color.white,
  fontSize: 15,
  textAlign: 'center',
  padding: 10,
}
  });



//   const mapStateToProps = (state) => {
//     return {
//         loginapiMsg: state.loginapiMsg
//     }
// }

const mapDispatchToProps = {
  RegisterRequest,
}


export default connect(null, mapDispatchToProps)(Register);