import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductItem = ({ item }) => {
  return (
    <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image
          resizeMethod="contain"
          source={{ uri: item.thumbnail }}
          style={styles.productImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.productDescription}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  imageContainer: {
    borderWidth: 1,
    width: '30%',
    backgroundColor: 'black',
    // opacity: 0.77,
    borderRadius: 10,
    height: 95,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  textContainer: {
    width: '70%',
    marginLeft: 10,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productDescription: {
    color: 'black',
    fontSize: 14,
    marginVertical: 5,
    fontWeight: '700',
    marginTop: '5%',
  },
});

export default ProductItem;
