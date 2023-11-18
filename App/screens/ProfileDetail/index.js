import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  ProfilePicPlaceholder,
  ProfileVector,
  UserPlaceholder,
} from '../../assets/images';
import styles from './styles';
import localStorage from '../../utils/localStorage';

export default function ProfileDetail({navigation}) {
  const handleLogout = () => {
    localStorage.clearAll();
    navigation.navigate('Sign In');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.brandName}>DECO-AR</Text>
          <SvgXml xml={ProfilePicPlaceholder} width="44" height="44" />
        </View>
        <SvgXml xml={ProfileVector} width="100%" height="100%" />
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView>
          <View style={styles.profilePicContainer}>
            <Image source={UserPlaceholder} width={85} height={85} />
            <Text style={styles.containerHeading}>Upload Image</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} />
          </View>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={handleLogout}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
