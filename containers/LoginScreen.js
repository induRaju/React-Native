import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, TouchableWithoutFeedback, Image, BackHandler } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//connect with state
import { connect } from 'react-redux';
import { loginRequest } from '../actions/LoginActions';

import Title from '../components/Title';
import Divider from '../components/Divider';
import Color from '../contants/Colors';
import FBIcon from '../assets/svg/fb.svg';
import GoogleIcon from '../assets/svg/google.svg';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: '',
            pwdText: '',
            checkValidEmail: false,
            checkValidPwd: false,
            secureTextEntry: true,
            loginapiMsg: null
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        return true;
    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log("login screen", nextProps);
        if (nextProps.logoutApiMsg && nextProps.logoutApiMsg === 'success') {
            this.state.emailText = nextProps.emailText;
            this.state.pwdText = nextProps.password;
            return true;
        }
        // Rendering the component only if passed props value is changed
        // console.log('nextProps', nextProps.loginapiMsg, this.props.loginapiMsg);
        // console.log('nextState', nextState.emailText, this.state.emailText);
        if (nextProps.loginapiMsg !== this.props.loginapiMsg) {
            if(nextProps.loginapiMsg === 'success') {
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

    onChangeemailText = (val) => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        this.setState({
            emailText: val
        });

        if (re.test(val) || regex.test(val)) {
            this.setState({
                checkValidEmail: false
            })
        }
    }

    checkValidEmail = value => {

        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;


        if (re.test(value) || regex.test(value)) {
            return false;
        } else {
            return true;
        }
        
    }

    onChangePwdText = (val) => {
        this.setState({
            pwdText: val
        });
        if(val?.length >= 8) {
            this.setState({
                checkValidPwd: false
            })
        }
    }

    updateSecureTextEntry = () => {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        });
    }

    onClickLogin = (props) => {
        const checkEmailFormat = this.checkValidEmail(this.state.emailText);
        if (checkEmailFormat === true && this.state.emailText !== '' && this.state.pwdText?.length < 8) {
            this.setState({
                checkValidEmail: true,
                checkValidPwd: true
            })
        } else if (checkEmailFormat === true && this.state.emailText !== '') {
            this.setState({
                checkValidEmail: true
            })
        } else if(this.state.pwdText?.length < 8) {
            this.setState({
                checkValidPwd: true
            })
        } else if (checkEmailFormat === false && this.state.checkValidEmail === false && this.state.checkValidPwd === false) {
            const payload = {
                username: this.state.emailText,
                password: this.state.pwdText
            };
            this.props.loginRequest(payload);
        } else {
            alert("Please enter valid login information");
        }
    } 

    onClickNewUser = () => {
        this.props.navigation.navigate('Register');

    }

    onClickForget = (props) => {
        props.navigation.navigate('ForgetPassword');
    }

    onClickFb = () => {
        alert('Fb is pressed');
    }

    onClickGoogle = () => {
        alert('Google is pressed')
    }
    render() {
    return (
      <View style={styles.container}>
        <View style={{left: '12.62%', top: '2%'}}>
            <Image
                style={{marginLeft: 40}}
                source={require('../assets/png/splash_login.png')}
            />
        </View>
        <View style={{left: '12.62%', top: '6%'}}>
            <Title textMsg={'Login'}/>
        </View>
        <View style={styles.inputView}>
            <View style={{marginBottom: 50}}>
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => this.onChangeemailText(val)}
                    value={this.state.emailText}
                    placeholder="Email Id*"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={35}
                />
                {this.state.checkValidEmail && 
                    <Text style={styles.errorMsg}>please enter valid email id</Text>
                }
            </View>
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={styles.passwordStyle}
                    onChangeText={(val) => this.onChangePwdText(val)}
                    value={this.state.pwdText}
                    placeholder="Password*"
                    autoCapitalize="none"
                    secureTextEntry={this.state.secureTextEntry ? true : false}
                    autoCorrect={false}
                    maxLength={16}
                    password
                />
                <TouchableOpacity style={styles.iconStyle} onPress={this.updateSecureTextEntry}>
                    {this.state.secureTextEntry ?
                        <Ionicons name='eye-off-sharp' color={Color.grey} size={20}/>
                    :
                        <Ionicons name='eye' color={Color.grey} size={20}/>
                    }
                </TouchableOpacity>
            </View>
            { this.state.checkValidPwd &&
                <Text style={styles.errorMsg}>please enter valid password</Text>
            }
            <TouchableOpacity onPress={()=>this.onClickForget(this.props)}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

        </View>
        <View style={styles.buttonView}>
            {this.state.emailText === '' || this.state.pwdText === '' || this.state.checkValidEmail === true || this.state.checkValidPwd === true ? (
                <TouchableWithoutFeedback
                    onPress={()=>this.onClickLogin(this.props)} 
                    disabled
                >
                    <Text style={[styles.loginButton, {backgroundColor: Color.grey}]}>LOGIN</Text>
                </TouchableWithoutFeedback>
            ) : (
                <TouchableWithoutFeedback
                    onPress={()=>this.onClickLogin(this.props)} 
            >
                <Text style={[styles.loginButton, {backgroundColor: Color.black}]}>LOGIN</Text>
            </TouchableWithoutFeedback>
            )
            }
        </View>
                <TouchableOpacity onPress={()=> this.onClickNewUser(this.props)}>
                    <View style={{marginLeft: 20, marginTop: 10, flexDirection: 'row'}}>
                        <Text style={styles.new_user}>New User? click to Register</Text>
                    </View>
                </TouchableOpacity>
        {/* <Divider />
        <View style={styles.fb_buttonView}>
            <TouchableOpacity onPress={this.onClickFb}>
                <View style={{marginLeft: 20, marginTop: 10, flexDirection: 'row'}}>
                    <FBIcon width={25} height={23} fill={Color.white} />
                    <Text style={styles.fb_Button}>Log in with Facebook</Text>
                </View>
                
            </TouchableOpacity>
        </View>
        <View style={styles.g_buttonView}>
            <TouchableOpacity onPress={this.onClickGoogle} >
                <View style={{marginLeft: 20, marginTop: 10, flexDirection: 'row'}}>
                    <GoogleIcon width={25} height={23} fill={Color.white} />
                    <Text style={styles.g_Button}>Log in with Google</Text>
                </View>
            </TouchableOpacity>
        </View> */}
      </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    inputView: {
        left: '12.62%',
        marginTop: 60,
        width: '80%'
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
    forgot_button: {
        marginTop: 10,
        height: 30,
        textDecorationLine: 'underline',
        color: Color.Button_blue
    },
    new_user: {
        marginTop: 10,
        height: 30,
        paddingHorizontal: Platform.OS === 'ios' ? 90 : 120,
        // left: '300%',
        textDecorationLine: 'underline',
        color: Color.Button_blue
    },
    buttonView: {
        left: '12.62%',
        height: 40,
        marginTop: 60,
        width: '80%',
        borderRadius: 5,
    },
    loginButton: {
        color: Color.white,
        fontSize: 15,
        textAlign: 'center',
        padding: 10
    },
    fb_buttonView: {
        left: '12.62%',
        height: 40,
        marginTop: 35,
        width: '80%',
        backgroundColor: Color.Button_blue,
        borderRadius: 10,
    },
    fb_Button: {
        color: Color.white,
        fontSize: 15,
        textAlign: 'center',
        marginLeft: 18
    },
    g_buttonView: {
        left: '12.62%',
        height: 40,
        marginTop: 35,
        width: '80%',
        backgroundColor: Color.white,
        borderRadius: 10,
        borderWidth: 1,
        shadowColor: Color.shadow_color,
        shadowOffset: {width: -3, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    g_Button: {
        color: Color.black,
        fontSize: 15,
        textAlign: 'center',
        marginLeft: 18
    },
    iconStyle: {
        position:'absolute',
        top: '15%',left: '90%'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    }
  });

const mapStateToProps = (state) => {
    return {
        loginapiMsg: state.loginapiMsg,
        logoutApiMsg: state.logoutApiMsg,
        username: state.username,
        password: state.password
    }
}

const mapDispatchToProps = {
    loginRequest,
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);