import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  ProfilePicPlaceholder,
  ProfileVector,
  UserPlaceholder,
} from '../../assets/images';
import styles from './styles';
import localStorage from '../../utils/localStorage';
import RadioButton from '../../components/RadioButton';
import { getProfileById, updateProfile } from '../../apis/profile';

export default function ProfileDetail({ navigation }) {
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: '',
    gender: 'male',
    dob: {
      day: 15,
      month: 'January',
      year: 1990,
    },
    about: '',
    address: {
      city: '',
      country: '',
      state: '',
      street: '',
      zip: '',
    },
  });

  const handleSave = async () => {
    setIsLoading(true);
    if (formData.email === '') {
      Alert.alert('Please fill email');
      return;
    } else if (formData.name === '') {
      Alert.alert('Please fill name');
      return;
    }
    try {
      let uid = JSON.parse(localStorage.getString('user') || '{}')?.uid;
      await updateProfile({ id: uid, data: formData });
      navigation.navigate('Profile');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    let uid = JSON.parse(localStorage.getString('user') || '{}')?.uid;
    const user = await getProfileById(uid);
    console.log(uid, user, 'TEST');
    setFormData({ ...formData, ...user });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={text => setFormData({ ...formData, name: text })}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={text => setFormData({ ...formData, email: text })}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender:</Text>
            <View
              style={[
                styles.radioBtnContainer,
                formData.gender === 'male'
                  ? styles.radioBtnChecked
                  : styles.radioBtnUnChecked,
              ]}>
              <RadioButton
                isCheck={formData.gender === 'male'}
                onPress={() => setFormData({ ...formData, gender: 'male' })}
              />
              <Text style={styles.radioBtnLabel}>Male</Text>
            </View>
            <View
              style={[
                styles.radioBtnContainer,
                formData.gender === 'female'
                  ? styles.radioBtnChecked
                  : styles.radioBtnUnChecked,
              ]}>
              <RadioButton
                isCheck={formData.gender === 'female'}
                onPress={() => setFormData({ ...formData, gender: 'female' })}
              />
              <Text style={styles.radioBtnLabel}>Female</Text>
            </View>
            <View />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Country:</Text>
            <TextInput
              style={styles.input}
              value={formData.address.country}
              onChangeText={text =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, country: text },
                })
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>State:</Text>
            <TextInput
              style={styles.input}
              value={formData.address.state}
              onChangeText={text =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, state: text },
                })
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City:</Text>
            <TextInput
              style={styles.input}
              value={formData.address.city}
              onChangeText={text =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, city: text },
                })
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Zip Code:</Text>
            <TextInput
              style={styles.input}
              value={formData.address.zip}
              onChangeText={text =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, zip: text },
                })
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street Address:</Text>
            <TextInput
              style={styles.input}
              value={formData.address.street}
              onChangeText={text =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, street: text },
                })
              }
            />
          </View>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={handleSave}>
            {loading ?
              <ActivityIndicator animating={loading} color="white" />
              :
              <Text style={styles.buttonText}>Save</Text>
            }
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
