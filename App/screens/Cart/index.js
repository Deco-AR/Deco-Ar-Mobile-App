import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {ProductPlaceholder, ProfilePicPlaceholder} from '../../assets/images';
import styles from './styles';
import localStorage from '../../utils/localStorage';
import {colors, fonts} from '../../theme';
import {useIsFocused} from '@react-navigation/native';

export default function Cart({navigation}) {
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);

  let cartItems = JSON.parse(localStorage.getString('cart') || '[]');

  const handleRemoveCartItem = id => {
    let newCartItems = cartItems?.filter(item => item?._id !== id);
    localStorage.set('cart', JSON.stringify(newCartItems));
    setRefresh(prev => !prev);
  };

  const totalPrice = cartItems?.reduce((acc, product) => {
    const productPrice =
      parseFloat(product?.price || 0) * (product?.quantity || 0);
    return acc + productPrice;
  }, 0);

  // Calculate the total delivery price
  const totalDeliveryPrice = cartItems?.reduce((acc, product) => {
    return acc + product?.delivery?.charges || 0;
  }, 0);

  // Calculate the grand total
  const grandTotal = totalPrice + totalDeliveryPrice;

  useLayoutEffect(() => {}, [isFocused, refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <SvgXml xml={ProfilePicPlaceholder} width="44" height="44" />
      </View>
      <View style={styles.bottomContainer}>
        {cartItems?.length > 0 ? (
          <>
            <ScrollView>
              <Text style={styles.containerHeading}>My Cart</Text>
              {cartItems?.map((item, idx) => (
                <CartItem
                  {...item}
                  removeItem={handleRemoveCartItem}
                  key={item?._id + idx}
                />
              ))}
            </ScrollView>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}>
              <Text
                style={{
                  fontFamily: fonts.type.medium,
                  fontSize: fonts.size.h6,
                  color: colors.dark,
                }}>
                Total:
              </Text>
              <Text
                style={{
                  fontFamily: fonts.type.bold,
                  fontSize: fonts.size.h6,
                  color: colors.dark,
                }}>
                ${totalPrice || 0}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}>
              <Text
                style={{
                  fontFamily: fonts.type.medium,
                  fontSize: fonts.size.h6,
                  color: colors.dark,
                }}>
                Shipping:
              </Text>
              <Text
                style={{
                  fontFamily: fonts.type.bold,
                  fontSize: fonts.size.h6,
                  color: colors.dark,
                }}>
                ${totalDeliveryPrice || 0}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: colors.dark,
                marginVertical: 15,
              }}
            />
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}>
              <Text
                style={{
                  fontFamily: fonts.type.medium,
                  fontSize: fonts.size.h6,
                  color: colors.dark,
                }}>
                Grand Total:
              </Text>
              <Text
                style={{
                  fontFamily: fonts.type.bold,
                  fontSize: fonts.size.h6,
                  color: colors.dark,
                }}>
                ${grandTotal || 0}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Pay', {totalPrice})}
              style={{
                width: '100%',
                height: 56,
                backgroundColor: colors.theme._300,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: fonts.size.h6,
                  fontFamily: fonts.type.bold,
                  color: colors.dark,
                }}>
                Checkout
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <Text style={{fontSize: fonts.size.h4}}>No Items in Cart</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const CartItem = ({
  _id,
  photo,
  thumbnail,
  title,
  quantity,
  price,
  removeItem,
  onPress = () => {},
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <Image
          source={thumbnail ? {uri: thumbnail} : ProductPlaceholder}
          width={120}
          height={80}
          style={{borderRadius: 10, width: 120, height: 80}}
        />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuItemText}>{title}</Text>
        <Text style={styles.menuItemText}>${price}</Text>
      </View>
      <View
        style={{
          height: 90,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 70,
            height: 30,
            alignItems: 'center',
            backgroundColor: colors.theme._300,
            borderRadius: 30,
          }}>
          <Pressable
            onPress={() => {
              if (currentQuantity > 1) {
                setCurrentQuantity(currentQuantity - 1);
              } else {
                removeItem(_id);
              }
            }}
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.dark, fontFamily: fonts.type.medium}}>
              -
            </Text>
          </Pressable>
          <Text
            style={{
              color: colors.dark,
              fontFamily: fonts.type.medium,
              fontSize: fonts.size.label,
            }}>
            {currentQuantity}
          </Text>
          <Pressable
            onPress={() => setCurrentQuantity(currentQuantity + 1)}
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.dark, fontFamily: fonts.type.medium}}>
              +
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};
