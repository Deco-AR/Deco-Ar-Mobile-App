import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { ProfilePicPlaceholder, SearchIcon } from "../../assets/images";
import styles from "./styles";
import ProductCard from "../../components/ProductCard";
import { getAllListedProducts } from "../../apis/product";

export default function Profile({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      if (searchQuery !== "") {
        let response = await getAllListedProducts("all");

        // Filter products based on search query only if there is a search query
        const filteredProducts = response.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProductList(filteredProducts || []);
      } else {
        let response = await getAllListedProducts(selectedFilter);
        setProductList(response);
      }
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedFilter, searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.brandName}>DECO-AR</Text>
          {/* <SvgXml xml={ProfilePicPlaceholder} width="44" height="44" /> */}
        </View>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline1}>
            Behind Every Attractive Wall there's a Story.
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <SvgXml
            xml={SearchIcon}
            width="26"
            height="26"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
        <View style={styles.filtersContainer}>
          <ScrollView
            scrollEnabled
            showsVerticalScrollIndicator={false}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <Pressable
              onPress={() => setSelectedFilter("all")}
              style={[
                styles.filter,
                selectedFilter === "all"
                  ? styles.selectedFilterBg
                  : styles.filterBg,
              ]}
            >
              <Text
                style={[
                  selectedFilter === "all"
                    ? styles.selectedFilterText
                    : styles.filterText,
                ]}
              >
                All
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedFilter("Posters")}
              style={[
                styles.filter,
                selectedFilter === "Posters"
                  ? styles.selectedFilterBg
                  : styles.filterBg,
              ]}
            >
              <Text
                style={[
                  selectedFilter === "Posters"
                    ? styles.selectedFilterText
                    : styles.filterText,
                ]}
              >
                Posters
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedFilter("Home")}
              style={[
                styles.filter,
                selectedFilter === "Home"
                  ? styles.selectedFilterBg
                  : styles.filterBg,
              ]}
            >
              <Text
                style={[
                  selectedFilter === "Home"
                    ? styles.selectedFilterText
                    : styles.filterText,
                ]}
              >
                Home Decor
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedFilter("Quotes")}
              style={[
                styles.filter,
                selectedFilter === "Quotes"
                  ? styles.selectedFilterBg
                  : styles.filterBg,
              ]}
            >
              <Text
                style={[
                  selectedFilter === "Quotes"
                    ? styles.selectedFilterText
                    : styles.filterText,
                ]}
              >
                Quotes and Calligraphy
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedFilter("Plants")}
              style={[
                styles.filter,
                selectedFilter === "Plants"
                  ? styles.selectedFilterBg
                  : styles.filterBg,
              ]}
            >
              <Text
                style={[
                  selectedFilter === "Plants"
                    ? styles.selectedFilterText
                    : styles.filterText,
                ]}
              >
                Plants and Nature
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator animating={isLoading} size="large" />
          </View>
        )}
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              flexWrap: "wrap",
              width: Dimensions.get("window").width * 1,
              marginBottom: 10,
            }}
          >
            {productList.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
