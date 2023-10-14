import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {SvgXml} from 'react-native-svg';
import {verificationVector} from '../../assets/images';
import {sendOtp, verifyCode} from '../../apis/auth';

export default function VerifyCode({navigation, route}) {
  const params = route.params;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleVerify = async () => {
    if (formValidation()) {
      try {
        setLoading(true);
        await verifyCode(params.email, code);
        navigation.navigate('Successfull');
      } catch (e) {
        setError(e.response.data.message || 'Something went wrong');
      } finally {
        setCode('');
        setLoading(false);
      }
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      await sendOtp(params.email);
    } catch (e) {
      setError(e.response.data.message || 'Something went wrong');
    } finally {
      setLoading(false);
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
          disabled={loading}
          onPress={handleVerify}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>VERIFY</Text>
          )}
        </TouchableOpacity>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline1}>Didn't get the code?</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.tagline2}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.tagline2}>Go Back</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
