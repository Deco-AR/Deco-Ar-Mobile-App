import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  EyeIcon,
  ProductPlaceholder,
  ProfilePicPlaceholder,
} from '../../assets/images';
import styles from './styles';
import { colors, fonts } from '../../theme';
import localStorage from '../../utils/localStorage';
import { getProductReviews } from '../../apis/product';
import ReviewCard from '../../components/ReviewCard';

export default function ProductDetails({ route, navigation }) {
  let data = route.params || {};

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const [selectedSize, setSelectedSize] = useState('s');
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getString('cart') || '[]');
    let cartItem = {
      ...data,
      quantity,
      selectedSize,
    };
    cart?.push(cartItem);
    localStorage.set('cart', JSON.stringify(cart));
    showToast('Item added to cart');
  };

  async function fetchProductReviews() {
    const reviews = await getProductReviews(data._id);
    console.log(reviews);
    setReviews(reviews || []);
  }

  useEffect(() => {
    fetchProductReviews();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.brandName}>DECO-AR</Text>
        </View>
        <View>
          <Image
            source={
              data.thumbnail || data.photo
                ? { uri: data.thumbnail || data.photo }
                : ProductPlaceholder
            }
            width={Dimensions.get('screen').width}
            height={300}
            style={{ left: -18, top: 20 }}
            resizeMethod="scale"
            resizeMode="stretch"
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.scrollBottom}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                color: 'rgba(0, 0, 0, 0.90)',
                fontFamily: fonts.type.bold,
                fontSize: fonts.size.h5,
                width: Dimensions.get('screen').width * 0.5,
              }}
            >
              {data?.title}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('ARSetup', {
                  ...data,
                  uri: data?.photo,
                  mtlUri: data?.mtlUri,
                })
              }
              style={{
                width: 98,
                height: 40,
                borderRadius: 30,
                backgroundColor: colors.dark,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <SvgXml xml={EyeIcon} width={16} height={11} />
              <Text style={{ color: colors.white }}>Preview</Text>
            </Pressable>
          </View>
          <Text
            style={{
              color: 'rgba(0, 0, 0, 0.90)',
              fontFamily: fonts.type.bold,
              fontSize: fonts.size.h6,
              marginTop: 16,
            }}
          >
            Size
          </Text>
          <View style={styles.filtersContainer}>
            <Pressable
              onPress={() => setSelectedSize('s')}
              style={[
                styles.filter,
                selectedSize === 's' ? styles.selectedSizeBg : styles.filterBg,
              ]}
            >
              <Text
                style={[
                  selectedSize === 's'
                    ? styles.selectedSizeText
                    : styles.filterText,
                ]}
              >
                S
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedSize('m')}
              style={[
                styles.filter,
                selectedSize === 'm' ? styles.selectedSizeBg : styles.filterBg,
              ]}
            >
              <Text
                style={[
                  selectedSize === 'm'
                    ? styles.selectedSizeText
                    : styles.filterText,
                ]}
              >
                M
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedSize('l')}
              style={[
                styles.filter,
                selectedSize === 'l' ? styles.selectedSizeBg : styles.filterBg,
              ]}
            >
              <Text
                style={[
                  selectedSize === 'l'
                    ? styles.selectedSizeText
                    : styles.filterText,
                ]}
              >
                L
              </Text>
            </Pressable>
          </View>
          <Text
            style={{
              color: 'rgba(0, 0, 0, 0.90)',
              fontFamily: fonts.type.bold,
              fontSize: fonts.size.h6,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              color: 'rgba(0, 0, 0, 0.90)',
              fontFamily: fonts.type.regular,
              fontSize: fonts.size.p,
              marginBottom: 10,
            }}
          >
            {data?.description?.replaceAll(/<[^>]*>/g, '')}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontFamily: fonts?.type?.bold,
                color: colors.dark,
                fontSize: fonts.size.h6,
              }}
            >
              {data?.unit}
              {data?.price}
            </Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 80,
                  height: 40,
                  alignItems: 'center',
                  backgroundColor: colors.theme._300,
                  borderRadius: 30,
                }}
              >
                <Pressable
                  onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ color: colors.dark, fontFamily: fonts.type.bold }}
                  >
                    -
                  </Text>
                </Pressable>
                <Text
                  style={{
                    color: colors.dark,
                    fontFamily: fonts.type.bold,
                    fontSize: fonts.size.h6,
                  }}
                >
                  {quantity}
                </Text>
                <Pressable
                  onPress={() => setQuantity(quantity + 1)}
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ color: colors.dark, fontFamily: fonts.type.bold }}
                  >
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
                }}
              >
                <Text
                  style={{ color: colors.dark, fontFamily: fonts.type.bold }}
                >
                  Add to Cart
                </Text>
              </Pressable>
            </View>
          </View>
          <Text
            style={{
              color: 'rgba(0, 0, 0, 0.90)',
              fontFamily: fonts.type.bold,
              fontSize: fonts.size.h6,
              marginTop: 20,
            }}
          >
            Reviews
          </Text>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  comment={review?.comment}
                  {...review?.user}
                />
              ))
            ) : (
              <Text>No reviews yet</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
