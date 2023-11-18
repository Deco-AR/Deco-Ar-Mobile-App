import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {successfullVector, successIcon} from '../../assets/images';
import styles from './styles';

export default function Category({navigation}) {
  const handleVerify = () => {
    navigation.navigate('Sign In');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
      </View>
      <View style={styles.bottomContainer} />
    </View>
  );
}
