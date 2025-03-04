import { View, SafeAreaView } from "react-native";
import React from "react";
import CartScreen from "../../components/Shopping_cart/CartScreen";

export default function CartPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CartScreen />
    </SafeAreaView>
  );
}
