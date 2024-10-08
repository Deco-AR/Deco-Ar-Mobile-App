import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  FaqIcon,
  LogoutIcon,
  LoveIcon,
  OrdersIcon,
  ProfileIcon,
  ProfilePicPlaceholder,
  RightArrowIcon,
  UserPlaceholder,
} from '../../assets/images';
import styles from './styles';
import localStorage from '../../utils/localStorage';

export default function Profile({navigation}) {
  const handleLogout = () => {
    localStorage.clearAll();
    navigation.navigate('Sign In');
  };
  let user = JSON.parse(localStorage.getString('user') || '{}');
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView>
          <Text style={styles.containerHeading}>Porfile Details</Text>
          <View style={styles.profilePreviewCard}>
            <Image source={UserPlaceholder} width={55} height={55} />
            <View>
              <Text style={styles.displayName}>{user.name}</Text>
              <Text style={styles.tagline1}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.menuContainer}>
            <MenuItem
              text={'Profile Detail'}
              icon={ProfileIcon}
              onPress={() => navigation.navigate('PersonalDetail')}
            />
            <MenuItem
              text={'My Order'}
              icon={OrdersIcon}
              onPress={() => navigation.navigate('MyOrders')}
            />
            <MenuItem
              text={'My Favourites'}
              icon={LoveIcon}
              onPress={() => navigation.navigate('MyFavourites')}
            />
            {/* <MenuItem text={'FAQs'} icon={FaqIcon} /> */}
          </View>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={handleLogout}>
            <SvgXml xml={LogoutIcon} width="24" height="24" />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const MenuItem = ({icon, text, onPress = () => {}}) => {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <View style={styles.iconBg}>
          <SvgXml xml={icon} width={17} height={17} fill="#000" />
        </View>
        <Text style={styles.menuItemText}>{text}</Text>
      </View>
      <SvgXml xml={RightArrowIcon} />
    </Pressable>
  );
};
