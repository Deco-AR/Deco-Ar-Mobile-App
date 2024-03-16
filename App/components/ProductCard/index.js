import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {LoveIcon, ProductPlaceholder} from '../../assets/images';
import {SvgXml} from 'react-native-svg';
import {colors, fonts} from '../../theme';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import localStorage from '../../utils/localStorage';

export default function ProductCard({
  photo,
  title,
  price,
  unit,
  description,
  _id,
  delivery,
}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isFavourite, setIsFavourite] = useState(false);

  const handleAddToFavourite = () => {
    setIsFavourite(!isFavourite);
    let favourites = JSON.parse(localStorage.getString('favourites') || '[]');

    let filteredFavourites = isFavourite
      ? favourites.filter(item => item?._id !== _id)
      : [...favourites, {photo, title, price, _id}];

    localStorage.set('favourites', JSON.stringify(filteredFavourites));

    ToastAndroid.show(
      isFavourite ? 'Removed from favourites' : 'Added to favourites',
      ToastAndroid.SHORT,
    );
  };

  useEffect(() => {
    if (isFocused) {
      setIsFavourite(
        JSON.parse(localStorage.getString('favourites') || '[]').some(
          item => item?._id === _id,
        ),
      );
    }
  } , [isFocused]);

  return (
    <Pressable
      style={{width: 150}}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          photo,
          title,
          price,
          unit,
          description,
          _id,
          delivery,
        })
      }>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={handleAddToFavourite}
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            zIndex: 1,
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isFavourite ? colors.error : 'transparent',
          }}>
          <SvgXml xml={LoveIcon} width={20} height={20} />
        </TouchableOpacity>
        <Image
          source={photo ? {uri: photo} : ProductPlaceholder}
          resizeMode="stretch"
          resizeMethod="scale"
          style={{width: 150, height: 200}}
        />
      </View>
      <Text
        style={{
          color: colors.dark,
          fontFamily: fonts.type.medium,
          fontSize: fonts.size.h6,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: colors.dark,
          opacity: 0.8,
          fontFamily: fonts.type.medium,
          fontSize: fonts.size.p,
        }}>
        {unit}
        {price}
      </Text>
    </Pressable>
  );
}
