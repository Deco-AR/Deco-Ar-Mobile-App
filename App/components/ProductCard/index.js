import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { LoveIcon, ProductPlaceholder } from "../../assets/images";
import { SvgXml } from "react-native-svg";
import { colors, fonts } from "../../theme";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import localStorage from "../../utils/localStorage";

export default function ProductCard({
  photo,
  thumbnail,
  title,
  price,
  unit,
  description,
  _id,
  delivery,
  mtlUri = null,
}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isFavourite, setIsFavourite] = useState(false);

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
  };

  useEffect(() => {
    if (isFocused) {
      setIsFavourite(
        JSON.parse(localStorage.getString("favourites") || "[]").some(
          (item) => item?._id === _id
        )
      );
    }
  }, [isFocused]);

  return (
    <View style={{
      width: Dimensions.get('window').width * 0.4,
      overflow: "hidden"
    }}>
      <Pressable
        onPress={() =>
          navigation.navigate("ProductDetails", {
            thumbnail,
            photo,
            title,
            price,
            unit,
            description,
            _id,
            delivery,
            mtlUri,
          })
        }
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={handleAddToFavourite}
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              zIndex: 1,
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isFavourite ? colors.error : "transparent",
            }}
          >
            <SvgXml xml={LoveIcon} width={20} height={20} />
          </TouchableOpacity>
          <Image
            source={
              thumbnail || photo
                ? { uri: thumbnail || photo }
                : ProductPlaceholder
            }
            resizeMode="stretch"
            resizeMethod="scale"
            style={{ width: '100%', height: Dimensions.get('window').height * 0.25,borderRadius: 10, }}
          />
        </View>
        <View style={{
          padding: 7
        }}>
          <Text
            style={{
              color: colors.dark,
              fontFamily: fonts.type.medium,
              fontSize: fonts.size.p,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: colors.dark,
              opacity: 0.8,
              fontFamily: fonts.type.medium,
              fontSize: fonts.size.p,
              marginTop: 3
            }}
          >
            {unit}
            {price}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
