import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {ProductPlaceholder, ProfilePicPlaceholder} from '../../assets/images';
import {colors, fonts} from '../../theme';
import {SvgXml} from 'react-native-svg';

export default function Category({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <SvgXml xml={ProfilePicPlaceholder} width="44" height="44" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.containerHeading}>Catagory</Text>
        <CategoryCard
          title={'WALL SCENERY'}
          photo={'https://i.ibb.co/j8DnkKt/image.png'}
        />
        <CategoryCard
          title={'WALL ART'}
          photo={'https://i.ibb.co/HpbWPnh/image.png'}
        />
        <CategoryCard
          title={'POSTERS'}
          photo={'https://i.ibb.co/mJM64Hw/image.png'}
        />
      </View>
    </View>
  );
}

const CategoryCard = ({photo, title}) => {
  return (
    <View
      style={{
        backgroundColor: colors.theme._200,
        width: '100%',
        height: 130,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
      }}>
      <Image
        source={photo ? {uri: photo} : ProductPlaceholder}
        width={115}
        height={90}
        resizeMode="stretch"
        resizeMethod="scale"
        style={{width: 115, height: 90}}
      />
      <Text
        style={{
          fontSize: fonts.size.p,
          fontFamily: fonts.type.bold,
          color: colors.dark,
        }}>
        {title}
      </Text>
    </View>
  );
};
