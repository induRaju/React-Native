import React, { Component } from 'react';
import Color from '../contants/Colors';
import Title from '../components/Title';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ActivityIndicator, StatusBar } from 'react-native';
import { RadioButton } from '../components/RadioButton';
import { goalChangeRequest } from '../actions/PreferencesEditActions'
import { logoutRequest } from '../actions/LogoutAction';
import { SafeAreaView } from 'react-native-safe-area-context';

class GoalSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedGoal: this.props.route.params?.goal,
      radioOptions: [
        { id: 1, value: 1, name: "I have a vacant room looking for flatmate", selected: this.props.route.params?.goal===1 },
        { id: 2, value: 2, name: "I am looking for a vacant room with flat mate", selected: this.props.route.params?.goal===2 },
      ]

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Rendering the component only if passed props value is changed
    // console.log('nextState', nextState.emailText, this.state.emailText);
    console.log("kjlogout",nextProps.logoutapiMsg,this.props.logoutapiMsg)
    console.log("kjgoalapi1",nextProps.goalChangeApiMsg,this.props.goalChangeApiMsg)
    if (nextProps.goalChangeApiMsg !== this.props.goalChangeApiMsg) {
        if(nextProps.goalChangeApiMsg === 'success' || nextProps.goalChangeApiMsg === 'changed') {

          console.log("this is goal1 thing dont come here always ------------------------------------------------")
          if(this.state.selectedGoal!=2){
            this.props.logoutRequest({Authorization: this.props.data_values?.Authorization});
          }
        } else if(nextProps.goalChangeApiMsg === 'error'){
                alert("goal change was not successful");
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


  onRadioBtnClick = (item) => {
    let updatedState = this.state.radioOptions.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    this.setState((prevState) => { return { ...prevState, ...{ radioOptions: updatedState } } });
    this.setState((prevState) => { return { ...prevState, ...{ selectedGoal: item.id } } });
  };
  onClickNext = (props) => {
    if(this.state.selectedGoal===2){
        this.props.navigation.navigate('goalselect2');
    }
    else{
        this.setState({isLoading: true});
        this.props.navigation.setOptions({headerShown: false})
        const payload={
            Authorization:this.props.data_values?.Authorization,
            goal_id:1
        }
        this.props.goalChangeRequest(payload);
    }
  }
  render() {
    console.log("------------------",this.props.route.params?.goal);
    
    {console.log(this.state.selectedGoal,this.props.route.params?.goal===this.state.selectedGoal)}
    return (
      <SafeAreaView style={styles.con}>
      <StatusBar/>
      {this.state.isLoading && <View style={styles.loading}>
                  {<ActivityIndicator size='large' color={"black"} />}
                </View>
       }
       {!this.state.isLoading &&
      <View style={styles.container}>
        <View style={{ margin: 15 }}>
          <Title textMsg={'Choose your goal!'} />
          <Text style={styles.smallText2}>Your Goal</Text>
        </View>
        <View style={styles.radioContainer}>
          {this.state.radioOptions.map((item) => (
            <RadioButton
              onPress={() => this.onRadioBtnClick(item)}
              selected={item.selected}
              key={item.id}
            >
              {item.name}
            </RadioButton>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonView}>
            {(this.props.route.params?.goal && this.props.route.params?.goal!==this.state.selectedGoal && this.state.selectedGoal !== '') ? (
                <TouchableWithoutFeedback onPress={() => this.onClickNext(this.props)} >
                    <Text style={styles.nextButton}>NEXT</Text>
                </TouchableWithoutFeedback>) :
              (
                <TouchableWithoutFeedback style={{ opacity: 0.1 }} onPress={() => this.onClickNext(this.props)} disabled>
                    <Text style={[styles.nextButton, { backgroundColor: Color.grey }]}>NEXT</Text>
                </TouchableWithoutFeedback>)
            }
          </View>
        </View>
      </View>
       }
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonView: {
    height: 40,
    marginTop: 60,
    width: '80%',
    backgroundColor: Color.black,
    borderRadius: 5,
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
  con:{
    flex :1,
    backgroundColor:'white'
  },  
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  RadioForm: {
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  nextButton: {
    color: Color.white,
    fontSize: 15,
    textAlign: 'center',
    padding: 10
  },
  text: {
    lineHeight: 30,
    fontSize: 20,
    marginVertical: 5
  },
  radioContainer: {
    marginHorizontal: "auto",
    maxWidth: 500,
    marginTop: 10,
    marginLeft: 15
  }
});

function mapStateToProps(state) {
    return {
      data_values: state,
      goalChangeApiMsg: state.goalChangeApiMsg,
      logoutApiMsg: state.logoutApiMsg,
    };
}

const mapDispatchToProps = {
    goalChangeRequest,
    logoutRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(GoalSelecter);