import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {successfullVector, successIcon} from '../../assets/images';
import styles from './styles';

export default function Successfull({navigation}) {
  const handleVerify = () => {
    navigation.navigate('Sign In');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <SvgXml xml={successfullVector} width="100%" height="100%" />
      </View>
      <View style={styles.bottomContainer}>
        <SvgXml xml={successIcon} width="100" height="100" />
        <Text style={styles.containerHeading}>SUCCESSFULLY</Text>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline1}>Now you can login</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={handleVerify}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tagline2}>skip</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
