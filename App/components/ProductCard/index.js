import React from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import {LoveIcon, ProductPlaceholder} from '../../assets/images';
import {SvgXml} from 'react-native-svg';
import {colors, fonts} from '../../theme';
import {useNavigation} from '@react-navigation/native';

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
        {/* <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: colors.white,
          }}>
          <SvgXml
            stroke={colors.theme._300}
            xml={LoveIcon}
            width={20}
            height={20}
          />
        </View> */}
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
