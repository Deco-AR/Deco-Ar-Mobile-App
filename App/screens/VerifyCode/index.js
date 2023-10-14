import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './styles';
import {SvgXml} from 'react-native-svg';
import {verificationVector} from '../../assets/images';

export default function VerifyCode({navigation}) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const formValidation = () => {
    if (code === '') {
      setError('code cannot be empty');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleVerify = () => {
    if (formValidation()) {
      navigation.navigate('Successfull');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <SvgXml xml={verificationVector} width="100%" height="100%" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.containerHeading}>VERIFICATION</Text>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline1}>You will get a OTP via Email</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="enter verification code here"
              keyboardType="numeric"
              style={styles.input}
              value={code}
              onChangeText={text => setCode(text)}
            />
          </View>
        </View>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={handleVerify}>
          <Text style={styles.buttonText}>VERIFY</Text>
        </TouchableOpacity>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline1}>Don’t Have An Account?</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.tagline2}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.tagline2}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
