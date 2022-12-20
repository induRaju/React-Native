import React, { useRef } from 'react'
import { View, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
// import Profiles from "../components/Profiles";
// import { Card, IconButton } from '../components'
// import styles from './App.styles'
const Act = () => {
  const useSwiper = useRef(null).current
  const handleOnSwipedLeft = () => useSwiper.swipeLeft()
  const handleOnSwipedTop = () => useSwiper.swipeTop()
  const handleOnSwipedRight = () => useSwiper.swipeRight()
  return (
    
    <Swiper
      ref={useSwiper}
      animateCardOpacity
      containerStyle={styles.container}
      cards={Profiles}
      renderCard={card => <Card card={card} />}
      cardIndex={0}
      backgroundColor="white"
      stackSize={2}
      infinite
      showSecondCard
      animateOverlayLabelsOpacity
    //   overlayLabels={{
    //     left: {
    //       title: 'NOPE',
    //       element: <OverlayLabel label="NOPE" color="#E5566D" />,
    //       style: {
    //         wrapper: styles.overlayWrapper,
    //       },
    //     },
    //     right: {
    //       title: 'LIKE',
    //       element: <OverlayLabel label="LIKE" color="#4CCC93" />,
    //       style: {
    //         wrapper: {
    //           ...styles.overlayWrapper,
    //           alignItems: 'flex-start',
    //           marginLeft: 30,
    //         },
    //       },
    //     },
    //   }}
    />
    )
};


<View style={styles.buttonsContainer}>
    <IconButton
      name="close"
      onPress={handleOnSwipedLeft}
      color="white"
      backgroundColor="#E5566D"
    />
    <IconButton
      name="heart"
      onPress={handleOnSwipedRight}
      color="white"
      backgroundColor="#4CCC93"
    />
  </View>