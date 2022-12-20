import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  titleStyle: {
    // fontFamily: 'Comfortaa',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 30,
    color: '#000000'
  }
});

export default class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { textMsg } = this.props;

    return (
      <View>
          <Text style={styles.titleStyle}>{textMsg}</Text>
      </View>
    );
  }
}