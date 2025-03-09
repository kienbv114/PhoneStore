import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import dbData from "../../db.json";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  categoryId: number;
}

const ProductFormScreen: React.FC = () => {
  const { categoryId, categoryName } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const loadProducts = () => {
      try {
        const allProducts = dbData.products;
        const filtered = categoryId
          ? allProducts.filter(
            (product) => product.categoryId === Number(categoryId)
          )
          : allProducts.filter((product) => product.rating >= 0);
        const sorted = filtered.sort((a, b) => b.rating - a.rating);
        setProducts(sorted);
        setFilteredProducts(sorted);
      } catch (error) {
        console.error("Error loading products from db.json:", error);
      }
    };
    loadProducts();
  }, [categoryId]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);
  

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      activeOpacity={0.9}
      onPress={() => router.push({ pathname: "/product", params: { id: item.id, shouldRefresh: "true" } })}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.productImage}
          source={{ uri: item.image }}
          resizeMode="cover"
          onError={(e) => console.log(`Failed to load image: ${e.nativeEvent.error}`)}
        />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#fff" />
          <Text style={styles.ratingBadgeText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>
          {item.price.toLocaleString("vi-VN")} VNĐ
        </Text>
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
        <Text style={styles.headerTitle}>
          {categoryName ? `${categoryName} Phones` : "All Phones"}
        </Text>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={22} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProductsText}>Không tìm thấy sản phẩm</Text>
        </View>
      )}
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
    fontFamily: "outfit",
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
    fontFamily: "outfit",
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
    fontFamily: "outfit",
    marginLeft: 4,
    fontWeight: "600",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontFamily: "outfit",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: "outfit",
    fontWeight: "700",
    color: "#FF6F00",
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
    fontFamily: "outfit",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 6,
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noProductsText: {
    fontSize: 16,
    fontFamily: "outfit",
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProductFormScreen;