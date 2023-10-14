import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import styles from './styles';
import {SvgXml} from 'react-native-svg';
import {
  eyeOff,
  eyeOn,
  googleIcon,
  passIcon,
  shoppingCartVector,
  userIcon,
} from '../../assets/images';

export default function SignIn({navigation}) {
  const [formData, setFormData] = useState({username: '', password: ''});
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formValidation = () => {
    if (formData.username === '') {
      setError('username cannot be empty');
      return false;
    } else if (formData.password === '') {
      setError('password cannot be empty');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleLogin = () => {
    if (formValidation()) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <SvgXml xml={shoppingCartVector} width="100%" height="100%" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.containerHeading}>SIGN IN</Text>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline1}>Don’t Have An Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.tagline2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Image source={userIcon} />
            <TextInput
              placeholder="username"
              style={styles.input}
              value={formData.username}
              onChangeText={text => setFormData({...formData, username: text})}
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
              onChangeText={text => setFormData({...formData, password: text})}
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
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Forgot Password')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={() => navigation.navigate('Home')}>
          <Image source={googleIcon} />
          <Text style={styles.buttonText}>SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
