import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CartItem from "./CartItem"; 

const initialCartItems = [
  {
    id: "1",
    image: "https://via.placeholder.com/100",
    name: "Product 1",
    description: "This is product 1",
    price: 499,
    quantity: 1,
  },
  {
    id: "2",
    image: "https://via.placeholder.com/100",
    name: "Product 2",
    description: "This is product 2",
    price: 999,
    quantity: 1,
  },
];

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id: string, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => setCartItems([])}>
          <Text style={styles.deleteButtonText}>Delete All</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            {...item}
            onIncrease={() => updateQuantity(item.id, 1)}
            onDecrease={() => updateQuantity(item.id, -1)}
            onRemove={() => removeItem(item.id)}
          />
        )}
        ListFooterComponent={
          <>
            {/* Hiển thị tổng tiền */}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>
                ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
              </Text>
            </View>

            {/* Nút thanh toán */}
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>CheckOut</Text>
            </TouchableOpacity>
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#d9534f",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#dee2e6",
    marginTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
  },
  totalPrice: {
    fontSize: 18,
    color: "#d9534f",
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});

export default CartScreen;
