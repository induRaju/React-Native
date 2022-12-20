import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import Color from '../contants/Colors';

// import * as appActions from '../actions';

class InitialScreen extends Component {
  constructor(props) {
    super(props);
  }

  onClickLogin = (props) => {
    props.navigation.navigate('Login');
  }

  onClickRegister = () => {
    this.props.navigation.navigate('Register');
  }

 
  render() {
    // const { state, actions } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.buttonView}>
            <TouchableWithoutFeedback onPress={()=> this.onClickLogin(this.props)}>
                <Text style={styles.loginButton}>LOGIN</Text>
            </TouchableWithoutFeedback>
        </View>
        <View style={styles.buttonView}>
            <TouchableWithoutFeedback onPress={()=> this.onClickRegister(this.props)}>
                <Text style={styles.loginButton}>REGISTER</Text>
            </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    buttonView: {
        left: '12.62%',
        height: 40,
        marginTop: 60,
        width: '80%',
        backgroundColor: Color.black,
        borderRadius: 5,
    },
    loginButton: {
        color: Color.white,
        fontSize: 15,
        textAlign: 'center',
        padding: 10
    }
  });

// function mapStateToProps(state) {
//   return {
//     state: state
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(appActions.actions, dispatch)
//   };
// }


// export default connect(mapStateToProps, mapDispatchToProps)(initialScreen);

export default InitialScreen;