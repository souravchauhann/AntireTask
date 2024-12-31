import React, { useEffect, useState } from 'react';
import {
  Text,
  SectionList,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Keyboard
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProductsByCategory, fetchAllProducts, searchProducts } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setCategories,
  setProducts,
  addProducts,
  setSelectedCategory,
  setPagination,
  setSearchQuery,
  setHasMore,
} from '../../redux/slice';
import { Dropdown } from 'react-native-element-dropdown';
import ProductItem from '../../components/home/productRender';

const ProductList = () => {
  const dispatch = useDispatch();
  const {
    categories,
    products,
    selectedCategory,
    skip,
    searchQuery,
    hasMore,
  } = useSelector(state => state.products);

  // console.log(">>> Products >>>",products)
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sectionData = [{ data: products }];

  useEffect(() => {
    loadCategories();
  }, [])

  useEffect(() => {
    loadCachedData();
  }, [])

  useEffect(() => {
    loadProducts()
  }, [selectedCategory, skip, searchQuery, dispatch]);

  const loadCategories = async () => {
    const categoriesList = await fetchCategories();
    dispatch(setCategories(categoriesList));
  };

  const loadCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('products');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        dispatch(setProducts(parsedData));
      } else {
        loadProducts();
      }
    } catch (error) {
      console.error('Failed to load cached products', error);
    }
  };

  const loadProducts = async () => {
    setIsLoading(true);
    let productData;
    if (searchQuery) {
      productData = await searchProducts(searchQuery);
    } else if (selectedCategory === 'ALL') {
      productData = await fetchAllProducts(skip);
      await AsyncStorage.setItem('products', JSON.stringify(productData.products));
    } else {
      productData = await fetchProductsByCategory(selectedCategory, skip);
    }

    setIsLoading(false);

    if (productData) {
      if (skip === 1) {
        dispatch(setProducts(productData.products));
      } else {
        dispatch(addProducts(productData.products));
      }

      try {
        await AsyncStorage.setItem('products', JSON.stringify(productData.products));
      } catch (error) {
        console.error('Products not saved in async', error);
      }

      if (productData?.products?.length === 20) {
        dispatch(setHasMore(true));
      } else {
        dispatch(setHasMore(false));
      }
    }
  };

  const handleEndReached = () => {
    if (hasMore && !isLoading) {
      dispatch(setPagination(skip + 1));
    }
  };

  const handleCategoryChange = (categorySlug) => {
    Keyboard.dismiss();
    dispatch(setSelectedCategory(categorySlug));
    dispatch(setPagination(1));
    setDropdownVisible(false);
  };


  const handleSearch = (text) => {
    // console.log(">> inside function >>")
    dispatch(setSearchQuery(text));
    dispatch(setPagination(1));
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        animated
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Products</Text>
        <View style={styles.dropDownContainer}>
          <Dropdown
            containerStyle={{ fontSize: 10 }}
            style={styles.dropdown}
            data={[{ label: 'ALL', value: 'ALL' }, ...categories.map(category => ({ label: category.name, value: category.slug }))]}
            labelField="label"
            valueField="value"
            onChange={item => handleCategoryChange(item.value)}
            placeholder="Category"
            visible={dropdownVisible}
            onFocus={() => setDropdownVisible(true)}
            onBlur={() => setDropdownVisible(false)}
            itemTextStyle={{ fontSize: 11 }}
          />
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Products"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>
        {selectedCategory}
      </Text>
      <SectionList
        sections={sectionData}
        renderItem={({ item }) => <ProductItem item={item} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          isLoading && hasMore ? (
            <ActivityIndicator size="small" color="black" style={styles.footerIndicator} />
          ) : null
        }
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'rgba(17, 17, 26, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    marginTop: 30,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    width: "90%",
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: Platform.OS == "android" ? 18 : 12,
    backgroundColor: 'white',
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  footerIndicator: {
    marginBottom: 20,
  },
  dropdown: {
    height: 30,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 10,
  },
  dropDownContainer: {
    position: 'absolute',
    width: 100,
    bottom: 10,
    right: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
