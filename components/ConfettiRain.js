import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';


const { width, height } = Dimensions.get('window');

export default function ConfettiRain() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Animations/Confetti.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    top: -150,
    left: 0,
    zIndex: 999,
  },
  animation: {
    width,
    height,
  },
});
