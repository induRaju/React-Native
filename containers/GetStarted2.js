import React, { Component } from 'react';
import Color from '../contants/Colors';
import Title from '../components/Title';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { RadioButton } from '../components/RadioButton';

import { connect } from 'react-redux';
import { goalSelect } from '../actions/YourGoalAction';

class GetStarted2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGoal: '',
      radioOptions: [
        { id: 1, value: 1, name: "I have a vacant room looking for flatmate", selected: false },
        { id: 2, value: 2, name: "I am looking for a vacant room with flat mate", selected: false },
        { id: 3, value: 3, name: "I am having a house to give for lease", selected: false }
      ]

    };
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
    const payload = {
      current_goal: this.state.selectedGoal
    }
    this.props.goalSelect(payload);
    this.props.navigation.navigate('GetStarted21');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ margin: 15, left: '5.62%' }}>
          <Title textMsg={'Get Started!'} />
          <Text style={styles.smallText1}>Step 2</Text>
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
            {this.state.selectedGoal === '' ? (
              <TouchableWithoutFeedback style={{ opacity: 0.1 }} onPress={() => this.onClickNext(this.props)}
                disabled>
                <Text style={[styles.nextButton, { backgroundColor: Color.grey }]}>NEXT</Text>
              </TouchableWithoutFeedback>) :
              (<TouchableWithoutFeedback onPress={() => this.onClickNext(this.props)} >
                <Text style={styles.nextButton}>NEXT</Text>
              </TouchableWithoutFeedback>)
            }
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flexDirection: 'column',
    flex:1,
  },
  buttonView: {
    height: 40,
    marginTop: 60,
    width: '80%',
    backgroundColor: Color.black,
    borderRadius: 5,
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
    left: '5.62%',

    // marginLeft: 15
  }
});

const mapDispatchToProps = {
  goalSelect,
}


export default connect(null, mapDispatchToProps)(GetStarted2);