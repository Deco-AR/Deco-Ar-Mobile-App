import React, {useState} from 'react';
import {View, Text, Image, Dimensions, Pressable} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  EyeIcon,
  ProductPlaceholder,
  ProfilePicPlaceholder,
} from '../../assets/images';
import styles from './styles';
import {colors, fonts} from '../../theme';
import localStorage from '../../utils/localStorage';

export default function ProductDetails({route}) {
  let data = route.params || {};

  const [selectedSize, setSelectedSize] = useState('s');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getString('cart') || '[]');
    let cartItem = {
      ...data,
      quantity,
      selectedSize,
    };
    cart?.push(cartItem);
    localStorage.set('cart', JSON.stringify(cart));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.brandName}>DECO-AR</Text>
          <SvgXml xml={ProfilePicPlaceholder} width="44" height="44" />
        </View>
        <View>
          <Image
            source={data.photo ? {uri: data.photo} : ProductPlaceholder}
            width={Dimensions.get('screen').width}
            height={300}
            style={{left: -18, top: 20}}
            resizeMethod="scale"
            resizeMode="stretch"
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: 'rgba(0, 0, 0, 0.90)',
              fontFamily: fonts.type.bold,
              fontSize: fonts.size.h5,
              width: Dimensions.get('screen').width * 0.5,
            }}>
            {data?.title}
          </Text>
          <Pressable
            style={{
              width: 98,
              height: 40,
              borderRadius: 30,
              backgroundColor: colors.dark,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}>
            <SvgXml xml={EyeIcon} width={16} height={11} />
            <Text style={{color: colors.white}}>Preview</Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: 'rgba(0, 0, 0, 0.90)',
            fontFamily: fonts.type.bold,
            fontSize: fonts.size.h6,
            marginTop: 16,
          }}>
          Size
        </Text>
        <View style={styles.filtersContainer}>
          <Pressable
            onPress={() => setSelectedSize('s')}
            style={[
              styles.filter,
              selectedSize === 's' ? styles.selectedSizeBg : styles.filterBg,
            ]}>
            <Text
              style={[
                selectedSize === 's'
                  ? styles.selectedSizeText
                  : styles.filterText,
              ]}>
              S
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSelectedSize('m')}
            style={[
              styles.filter,
              selectedSize === 'm' ? styles.selectedSizeBg : styles.filterBg,
            ]}>
            <Text
              style={[
                selectedSize === 'm'
                  ? styles.selectedSizeText
                  : styles.filterText,
              ]}>
              M
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSelectedSize('l')}
            style={[
              styles.filter,
              selectedSize === 'l' ? styles.selectedSizeBg : styles.filterBg,
            ]}>
            <Text
              style={[
                selectedSize === 'l'
                  ? styles.selectedSizeText
                  : styles.filterText,
              ]}>
              L
            </Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: 'rgba(0, 0, 0, 0.90)',
            fontFamily: fonts.type.bold,
            fontSize: fonts.size.h6,
          }}>
          Description
        </Text>
        <Text
          style={{
            color: 'rgba(0, 0, 0, 0.90)',
            fontFamily: fonts.type.regular,
            fontSize: fonts.size.p,
          }}>
          {data?.description?.replaceAll(/<[^>]*>/g, '')}
        </Text>
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
            {data?.unit}
            {data?.price}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 80,
                height: 40,
                alignItems: 'center',
                backgroundColor: colors.theme._300,
                borderRadius: 30,
              }}>
              <Pressable
                onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.dark, fontFamily: fonts.type.bold}}>
                  -
                </Text>
              </Pressable>
              <Text
                style={{
                  color: colors.dark,
                  fontFamily: fonts.type.bold,
                  fontSize: fonts.size.h6,
                }}>
                {quantity}
              </Text>
              <Pressable
                onPress={() => setQuantity(quantity + 1)}
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.dark, fontFamily: fonts.type.bold}}>
                  +
                </Text>
              </Pressable>
            </View>
            <Pressable
              onPress={handleAddToCart}
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
              <Text style={{color: colors.dark, fontFamily: fonts.type.bold}}>
                Add to Cart
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
