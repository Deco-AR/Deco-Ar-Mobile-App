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
import {sendOtp} from '../../apis/auth';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      await sendOtp(email);
      navigation.navigate('Verify Code', {email});
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
        <Text style={styles.containerHeading}>FORGOT PASSWORD</Text>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline1}>You will get a OTP via Email</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="enter your email address here"
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
        </View>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          disabled={loading}
          onPress={handleSendOTP}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>SEND CODE</Text>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
        <Text style={styles.tagline2}>Go Back</Text>
      </TouchableOpacity> */}
      </View>
    </View>
  );
}
