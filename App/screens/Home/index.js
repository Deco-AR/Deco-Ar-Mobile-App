import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {ProfilePicPlaceholder, SearchIcon} from '../../assets/images';
import styles from './styles';
import ProductCard from '../../components/ProductCard';
import {getAllListedProducts} from '../../apis/product';

export default function Profile({navigation}) {
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      let response = await getAllListedProducts();
      setProductList(response || []);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.brandName}>DECO-AR</Text>
          <SvgXml xml={ProfilePicPlaceholder} width="44" height="44" />
        </View>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline1}>
            Behind Every Attractive Wall there's a Story.
          </Text>
          <Text style={styles.tagline2}>Make YOUR'S NOW.</Text>
        </View>
        <View style={styles.searchContainer}>
          <SvgXml
            xml={SearchIcon}
            width="26"
            height="26"
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        <View style={styles.filtersContainer}>
          <Pressable
            onPress={() => setSelectedFilter('trending')}
            style={[
              styles.filter,
              selectedFilter === 'trending'
                ? styles.selectedFilterBg
                : styles.filterBg,
            ]}>
            <Text
              style={[
                selectedFilter === 'trending'
                  ? styles.selectedFilterText
                  : styles.filterText,
              ]}>
              Trending Now
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSelectedFilter('all')}
            style={[
              styles.filter,
              selectedFilter === 'all'
                ? styles.selectedFilterBg
                : styles.filterBg,
            ]}>
            <Text
              style={[
                selectedFilter === 'all'
                  ? styles.selectedFilterText
                  : styles.filterText,
              ]}>
              All
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSelectedFilter('new')}
            style={[
              styles.filter,
              selectedFilter === 'new'
                ? styles.selectedFilterBg
                : styles.filterBg,
            ]}>
            <Text
              style={[
                selectedFilter === 'new'
                  ? styles.selectedFilterText
                  : styles.filterText,
              ]}>
              New
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator animating={isLoading} size="large" />
          </View>
        )}
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', gap: 20, flexWrap: 'wrap'}}>
            {productList.map(item => {
              return <ProductCard {...item} />;
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
