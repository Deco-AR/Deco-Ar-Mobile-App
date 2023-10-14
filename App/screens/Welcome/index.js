import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {welcomeBg} from '../../assets/images';
import styles from './styles';

export default function Welcome({navigation}) {
  return (
    <ImageBackground source={welcomeBg} style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <Text style={styles.brandDescription}>
          Behind Every Attractive Wall there's a Story.
        </Text>
        <Text style={styles.brandSlogan}>Make YOUR NOW.</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.containerHeading}>Let's Get Started</Text>
        <TouchableOpacity
          style={styles.buttonSolid}
          onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
