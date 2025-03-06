import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dbData from "../../db.json";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  category: string;
}

// Không cần RouteParams nữa vì không lọc theo category
const ProductFormScreen: React.FC = () => {
  // Lấy tất cả sản phẩm từ db.json
  const products: Product[] = dbData.products;

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productItem} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image style={styles.productImage} source={{ uri: item.image }} resizeMode="cover" />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#fff" />
          <Text style={styles.ratingBadgeText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Phones</Text>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={22} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#999"
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fd",
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  productList: {
    padding: 10,
  },
  productItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "47%",
    margin: "1.5%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  ratingBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingBadgeText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "600",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e74c3c",
    marginBottom: 8,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#FF6F00",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 6,
  },
});

export default ProductFormScreen;