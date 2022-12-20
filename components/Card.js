import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Tile } from 'react-native-elements'
import Layout from '../contants/Layout'
import Color from '../contants/Colors';

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587

export const Card = ({ dob, display_name, gender }) => (
  // console.log(dob,display_name,gender);
  <Tile
    imageSrc={require('../assets/png/w1.jpg')}
    imageContainerStyle={styles.imageContainer}
    activeOpacity={0.9}
    title={display_name}
    titleStyle={styles.title}
    caption={dob}
    captionStyle={styles.caption}
    containerStyle={styles.container}
    animateCardOpacity
    vertical
    featured
  />

              

)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    imageContainer: {
      width: Layout.window.width - 30,
      //height: Layout.window.height - 350,
      borderRadius: 20,
      overflow: 'hidden', // this does magic
    },
    title: {
      position: 'absolute',
      left: 10,
      bottom: 30,
    },
    caption: {
      position: 'absolute',
      left: 10,
      bottom: 10,
    },
  })