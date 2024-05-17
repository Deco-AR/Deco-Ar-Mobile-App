import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  LoveIcon,
  ProductPlaceholder,
  ProfilePicPlaceholder,
} from "../../assets/images";
import styles from "./styles";
import api from "../../apis";
import { colors, fonts } from "../../theme";
import localStorage from "../../utils/localStorage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export default function MyFavourites({ navigation }) {
  const [loading, setIsLoading] = useState(false);
  // const [orders, setOrders] = useState([]);

  // const fetchUserFavourites = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await api.get('/orders');
  //     // setOrders(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserFavourites();
  // }, []);

  let favourites = JSON.parse(localStorage.getString("favourites") || "[]");
  const isFocused = useIsFocused();

  useFocusEffect(() => {
    favourites = JSON.parse(localStorage.getString("favourites") || "[]");
  }, [loading, isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <SvgXml xml={ProfilePicPlaceholder} width="44" height="44" />
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.containerHeading}>My Favourites</Text>
          <FlatList
            style={{ width: "100%" }}
            data={favourites}
            renderItem={({ item }) => (
              <FavouriteItem {...item} setIsLoading={setIsLoading} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}

const FavouriteItem = ({
  _id,
  photo,
  title,
  price,
  onPress = () => {},
  setIsLoading,
}) => {
  const [isFavourite, setIsFavourite] = useState(true);

  const handleAddToFavourite = () => {
    setIsFavourite(!isFavourite);
    let favourites = JSON.parse(localStorage.getString("favourites") || "[]");

    let filteredFavourites = isFavourite
      ? favourites.filter((item) => item?._id !== _id)
      : [...favourites, { photo, title, price, _id }];

    localStorage.set("favourites", JSON.stringify(filteredFavourites));

    ToastAndroid.show(
      isFavourite ? "Removed from favourites" : "Added to favourites",
      ToastAndroid.SHORT
    );
    setIsLoading((prev) => !prev);
  };

  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <TouchableOpacity
        onPress={handleAddToFavourite}
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          zIndex: 1,
          width: 24,
          height: 24,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isFavourite ? colors.error : "transparent",
        }}
      >
        <SvgXml xml={LoveIcon} width={15} height={15} />
      </TouchableOpacity>
      <View style={styles.menuIconContainer}>
        <Image
          source={photo ? { uri: photo } : ProductPlaceholder}
          width={120}
          height={80}
          style={{ borderRadius: 10 }}
        />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuItemText}>{title}</Text>
        <Text style={styles.menuItemText}>${price}</Text>
      </View>
    </Pressable>
  );
};
