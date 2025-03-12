import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ProductFormScreen from "../../components/Product/ProductFormScreen";

export default function ListProduct() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push({pathname: "/home"})}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danh sách sản phẩm</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.content}>
        <ProductFormScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FF6F00",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "outfit",
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    padding: 5,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
});
