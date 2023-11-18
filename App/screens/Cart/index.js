import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {successfullVector, successIcon} from '../../assets/images';
import styles from './styles';

export default function Cart({navigation}) {
  const handleVerify = () => {
    navigation.navigate('Sign In');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer} />
      <View style={styles.bottomContainer} />
    </View>
  );
}
