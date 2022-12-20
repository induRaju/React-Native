import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';
import Color from '../contants/Colors';
// import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { forgetpwdRequest, forgetpwdClearState } from '../actions/ForgetPasswordActions';

// import * as appActions from '../actions';

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: '',
            checkValidEmail: false,
            showSuccessMsg: false,
            forgetapiMsg: null
        };
    }
 
    // static getDerivedStateFromProps(props, state) {
    //     console.log('lifecycle', props, state);
    //     if (props.forgetapiMsg !== state.forgetapiMsg) {
    //         if(props.forgetapiMsg === 'error') {
    //             alert("Email Id does not exist");
    //         }
    //       return {
    //         forgetapiMsg: props.forgetapiMsg,
    //         showSuccessMsg: props.forgetapiMsg === 'success' ? true : false
    //       };
    //     }
    
    //     return null;
    //   }

      shouldComponentUpdate(nextProps, nextState) {
        // Rendering the component only if passed props value is changed
        // console.log('nextProps', nextProps.forgetapiMsg, this.props.forgetapiMsg, this.state.forgetapiMsg);
        // console.log('nextState', nextState.emailText, this.state.emailText);
        if (nextProps.forgetapiMsg !== this.props.forgetapiMsg) {
            if(nextProps.forgetapiMsg === 'success') {
                this.setState ({
                    showSuccessMsg: nextProps.forgetapiMsg === 'success' ? true : false,
                    forgetapiMsg: nextProps.forgetapiMsg
                });
            } else if(nextProps.forgetapiMsg === 'error'){
                    alert("Email Id does not exist");
                    this.setState ({
                        showSuccessMsg: nextProps.forgetapiMsg === 'success' ? true : false,
                        forgetapiMsg: nextProps.forgetapiMsg
                    });
                }
          return true;
        }
        if(nextState !== this.state) {
            return true;
        }
          return false;
      }

      componentWillUnmount() {
        // console.log('component unmounted>>');
        this.setState ({
            showSuccessMsg: false,
            forgetapiMsg: null
        });
        // this.props.forgetpwdClearState();
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
    onClickResetLink = () => {
        const checkEmailFormat = this.checkValidEmail(this.state.emailText);
        // console.log('props>>', this.props);
        if ((checkEmailFormat === true && this.state.emailText !== '') || (this.state.emailText === '')) {
            this.setState({
                checkValidEmail: true
            })
        } else {
            this.setState({
                checkValidEmail: false
            });
            const payload = {
                email: this.state.emailText,
            };
            // console.log('props>>', this.props);
            this.props.forgetpwdRequest(payload);
        }
    };

  render() {
    // const { forgetapiMsg } = this.props;
    return (

      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <View style={{left: '12.62%', top: '2%'}}>
            <Image
                style={{marginBottom: 40}}
                source={require('../assets/png/splash_login.png')}
            />
        </View>
        <Text style={{marginRight: 75}}>Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</Text>
        
        {this.state.showSuccessMsg &&
            <Text style={styles.successMsg}>We have emailed your password reset link!</Text>
        }
        <View style={styles.inputView}>
            <View>
                <Text style={{marginRight: 75, paddingBottom: 10}}>Email</Text>
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
                    <Text style={styles.errorMsg}>please enter valid email</Text>
                }
            </View>
        </View>
        <View style={styles.buttonView}>
            <TouchableWithoutFeedback onPress={()=> this.onClickResetLink()}>
                <Text style={styles.resetButton}>EMAIL PASSWORD RESET LINK</Text>
            </TouchableWithoutFeedback>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Color.white
    },
    scrollStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        left: '12.62%',
    },
    inputView: {
        marginTop: 30,
        width: '80%'
      },
    input: {
        height: 40,
        borderWidth: 2,
        padding: 10,
      },
    buttonView: {
      height: 40,
      marginTop: 20,
      width: '60%',
      backgroundColor: Color.black,
      borderRadius: 5,
      marginLeft: 90
    },
    resetButton: {
        color: Color.white,
        fontSize: 15,
        textAlign: 'center',
        padding: 10
        }, 
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    successMsg: {
        marginTop: 20,
        marginRight: 75,
        color: Color.green
    }
  });

  const mapStateToProps = (state) => {
    return {
        forgetapiMsg: state.forgetapiMsg
    }
}

const mapDispatchToProps = {
    forgetpwdRequest,
    forgetpwdClearState,
}


export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);