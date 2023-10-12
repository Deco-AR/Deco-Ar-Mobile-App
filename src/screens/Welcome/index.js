import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {welcomeBg} from '../../assets/images';
import styles from './styles';

export default function Welcome() {
  return (
    <ImageBackground source={welcomeBg} style={styles.container}>
      <Text style={styles.brandName}>DECO-AR</Text>
    </ImageBackground>
  );
}
