import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useStripe} from '@stripe/stripe-react-native';

import {ProfilePicPlaceholder} from '../../assets/images';
import styles from './styles';
import {colors, fonts} from '../../theme';
import RadioButton from '../../components/RadioButton';
import localStorage from '../../utils/localStorage';
import api from '../../apis';

export default function Pay({navigation, route}) {
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const data = route.params;
  let cart = JSON.parse(localStorage.getString('cart') || '[]');

  const fetchPaymentSheetParams = async () => {
    let customer_id = 'cus_OWSON6RxWhiXQ0';
    try {
      const response = await fetch(
        'http://35.154.49.30:5000/api/payment/payment-sheet',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item: {price: parseInt(data?.totalPrice || 0) * 100},
            customer_id,
          }),
        },
      );
      console.log(response, 'response');
      const {paymentIntent, ephemeralKey, customer} = await response.json();
      console.log(paymentIntent, ephemeralKey, customer, 'response');
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (e) {
      return {
        paymentIntent: '',
        ephemeralKey: '',
        customer: '',
      };
    }
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Deco AR',
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Payment Error: ${error.code}`, error.message);
    } else {
      await handleCreateOrder();
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      let uid = JSON.parse(localStorage.getString('user') || '{}')?.uid;
      await api.post('/order', {
        customer: {user: uid},
        items: cart[0]?._id || '',
        quantity: cart?.length,
        total: data?.totalPrice,
        status: 'in_progress',
        date: new Date(),
      });
      localStorage.set('cart', JSON.stringify([]));
      showToast('Order Placed');
      navigation.navigate('Home');
    } catch (e) {
      showToast('An Error Occured');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <SvgXml xml={ProfilePicPlaceholder} width="44" height="44" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.containerHeading}>Delivery Address</Text>
        <View style={styles.profilePreviewCard}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                gap: 35,
                alignItems: 'center',
              }}>
              <Text style={styles.displayName}>
                <Text style={{fontWeight: 'bold'}}>Name: </Text>
              </Text>
              <TextInput
                style={{
                  width: 200,
                  height: 40,
                  borderBottomWidth: 1,
                  borderBottomColor: '#D3D3D3',
                }}
                placeholder="Enter Name"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 35,
                alignItems: 'center',
              }}>
              <Text style={styles.displayName}>
                <Text style={{fontWeight: 'bold'}}>Phone: </Text>
              </Text>
              <TextInput
                keyboardType="number-pad"
                style={{
                  width: 200,
                  height: 40,
                  borderBottomWidth: 1,
                  borderBottomColor: '#D3D3D3',
                }}
                placeholder="Enter Phone Number"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.displayName}>
                <Text style={{fontWeight: 'bold'}}>Address: </Text>
              </Text>
              <TextInput
                style={{
                  width: 200,
                  height: 40,
                  borderBottomWidth: 1,
                  borderBottomColor: '#D3D3D3',
                }}
                placeholder="Enter Address"
              />
            </View>
          </View>
        </View>
        <Text style={styles.containerHeading}>Payment Method</Text>
        <View style={{justifyContent: 'space-between', gap: 20}}>
          <View style={styles.profilePreviewCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text style={styles.displayName}>Cash on Delivery</Text>
              <RadioButton
                isCheck={paymentMethod === 'COD'}
                onPress={() => setPaymentMethod('COD')}
              />
            </View>
          </View>
          <View style={styles.profilePreviewCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text style={styles.displayName}>Pay with Card</Text>
              <RadioButton
                isCheck={paymentMethod === 'Card'}
                onPress={() => setPaymentMethod('Card')}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 0,
            width: Dimensions.get('screen').width * 0.9,
            marginHorizontal: Dimensions.get('screen').width * 0.05,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts?.type?.bold,
              color: colors.dark,
              fontSize: fonts.size.h6,
            }}>
            ${data?.totalPrice || 0}
          </Text>
          <Pressable
            onPress={openPaymentSheet}
            style={{
              width: 120,
              height: 40,
              borderRadius: 30,
              backgroundColor: colors.theme._300,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}>
            {loading ? (
              <ActivityIndicator size={'small'} color={'#FFFFFF'} />
            ) : (
              <Text style={{color: colors.dark, fontFamily: fonts.type.bold}}>
                Place Order
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
