import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {LoveIcon, ProductPlaceholder} from '../../assets/images';
import {SvgXml} from 'react-native-svg';
import {colors, fonts} from '../../theme';

export default function ProductCard({photo, title, price, unit}) {
  return (
    <View style={{width: 150}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
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
        </View>
        <Image
          source={{uri: 'https://i.ibb.co/SRq3Xjt/product-3.png'}}
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
        {unit}{price}
      </Text>
    </View>
  );
}

{
  /* <a href="https://imgbb.com/"><img src="https://i.ibb.co/SRq3Xjt/product-3.png" alt="product-3" border="0"></a>
    <a href="https://imgbb.com/"><img src="https://i.ibb.co/MprQqtX/product-2.png" alt="product-2" border="0"></a>
    <a href="https://imgbb.com/"><img src="https://i.ibb.co/7RXCHDW/product-1.png" alt="product-1" border="0"></a> */
}
