import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import dbData from '../../db.json';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  categoryId: number;
}

export default function OutstandingProduct() {
  const outstandingProducts = dbData.products.filter(
    (product) => product.rating > 0
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.productRating}>{item.rating}</Text>
          <Text style={styles.ratingLabel}> ★</Text>
        </View>
        <Text style={styles.productPrice}>
          {item.price.toLocaleString('vi-VN')} ₫
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Outstanding Product</Text>
      </View>
      {outstandingProducts.length > 0 ? (
        <FlatList
          data={outstandingProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noProductsText}>Không có sản phẩm nào</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f0f2f5',
    
  },
  titleContainer: {
    backgroundColor: '#FF6F00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  productItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    margin: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    maxWidth: '47%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  productImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  productRating: {
    fontSize: 13,
    fontWeight: '500',
    color: '#f39c12',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#f39c12',
    marginLeft: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#e74c3c',
    marginTop: 6,
  },
  noProductsText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
  },
});