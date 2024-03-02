import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {ProfilePicPlaceholder} from '../../assets/images';
import styles from './styles';
import api from '../../apis';
import {colors} from '../../theme';

export default function MyOrders({navigation}) {
  const [loading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/orders');
      console.log(response.data, 'orders');
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <SvgXml xml={ProfilePicPlaceholder} width="44" height="44" />
      </View>
      <View style={styles.bottomContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.theme._300} />
        ) : (
          <ScrollView>
            <Text style={styles.containerHeading}>My Orders</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
