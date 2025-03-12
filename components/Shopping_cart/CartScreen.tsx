import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  categoryId: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const CartScreen = () => {
  const { productId, productName, productPrice, productImage } =
    useLocalSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (productId && productName && productPrice && productImage) {
      const price = Number(productPrice);
      if (!isNaN(price)) {
        const productToAdd: Product = {
          id: productId as string,
          name: productName as string,
          price: price,
          image: productImage as string,
          rating: 0,
          categoryId: 0,
        };
        setCartItems((prevItems) => {
          const existingItem = prevItems.find(
            (item) => item.product.id === productId
          );
          if (existingItem) {
            return prevItems.map((item) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevItems, { product: productToAdd, quantity: 1 }];
          }
        });
      }
    }
  }, [productId, productName, productPrice, productImage]);

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.product.image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.price}>
          {item.product.price.toLocaleString("vi-VN")} VNĐ
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.product.id, -1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.product.id, 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => removeFromCart(item.product.id)}
          style={{ alignItems: "flex-end" }}
        >
          <Text style={styles.removeButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const updateQuantity = (productId: string, change: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    const total = calculateTotal();
    router.push({
      pathname: "/payment",
      params: { totalAmount: total },
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ width: 30, paddingTop: 5 }}
          onPress={() => router.push({ pathname: "/product" })}
        >
          <Ionicons name="arrow-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.title}>Giỏ hàng</Text>
      </View>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.product.id}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Tổng cộng:</Text>
            <Text style={styles.totalPrice}>
              {calculateTotal().toLocaleString("vi-VN")} VNĐ
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fd",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    color: "#FF6F00",
  },
  removeButton: {
    color: "red",
    marginTop: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    color: "#FF6F00",
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#FF6F00",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    padding: 5,
    marginRight: 10,
    marginLeft: 10,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    color: "#666",
  },
});

export default CartScreen;
