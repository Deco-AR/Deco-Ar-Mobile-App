import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {SvgXml} from 'react-native-svg';
import {
  eyeOff,
  eyeOn,
  googleIcon,
  passIcon,
  formVector,
  userIcon,
  emailIcon,
} from '../../assets/images';

export default function SignUp({navigation}) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formValidation = () => {
    if (formData.username === '') {
      setError('username cannot be empty');
      return false;
    } else if (formData.email === '') {
      setError('email cannot be empty');
      return false;
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('invalid email');
      return false;
    } else if (formData.password === '') {
      setError('password cannot be empty');
      return false;
    } else if (formData.confirmPassword === '') {
      setError('confirm password cannot be empty');
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      setError('passwords do not match');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleSignUp = () => {
    if (formValidation()) {
      navigation.navigate('Verify Code');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <SvgXml xml={formVector} width="250" height="180" />
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView>
          <Text style={styles.containerHeading}>SIGN UP</Text>
          <View style={styles.taglineContainer}>
            <Text style={styles.tagline1}>Already Have An Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
              <Text style={styles.tagline2}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputs}>
            <View style={styles.inputContainer}>
              <Image source={userIcon} />
              <TextInput
                placeholder="username"
                style={styles.input}
                value={formData.username}
                onChangeText={text =>
                  setFormData({...formData, username: text})
                }
              />
            </View>
            <View style={styles.hr} />
            <View style={styles.inputContainer}>
              <Image source={emailIcon} />
              <TextInput
                placeholder="email"
                style={styles.input}
                value={formData.email}
                onChangeText={text => setFormData({...formData, email: text})}
              />
            </View>
            <View style={styles.hr} />
            <View style={styles.inputContainer}>
              <Image source={passIcon} />
              <TextInput
                placeholder="password"
                style={styles.input}
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={text =>
                  setFormData({...formData, password: text})
                }
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}>
                {showPassword ? (
                  <SvgXml xml={eyeOn} width={24} height={24} />
                ) : (
                  <SvgXml xml={eyeOff} width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.hr} />
            <View style={styles.inputContainer}>
              <Image source={passIcon} />
              <TextInput
                placeholder="confirm password"
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={text =>
                  setFormData({...formData, confirmPassword: text})
                }
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}>
                {showConfirmPassword ? (
                  <SvgXml xml={eyeOn} width={24} height={24} />
                ) : (
                  <SvgXml xml={eyeOff} width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={handleSignUp}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={() => navigation.navigate('Home')}>
            <Image source={googleIcon} />
            <Text style={styles.buttonText}>SIGN UP WITH GOOGLE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
