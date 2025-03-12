import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../services/api"; // Thay bằng đường dẫn đến file API của bạn

interface Order {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  paymentMethod: string;
  totalAmount: number;
  items: any[];
  status: string;
  createdAt: string;
}

const PaymentScreen = () => {
  const { totalAmount, cartItems: cartItemsString } = useLocalSearchParams();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const cartItems = cartItemsString
    ? JSON.parse(cartItemsString as string)
    : [];

  const handlePayment = async () => {
    if (!customerName || !address || !phone) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      customerName,
      address,
      phone,
      paymentMethod,
      totalAmount: Number(totalAmount),
      items: cartItems,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await api.post("/orders", newOrder);
      if (response.status === 201) {
        // 201 là mã trạng thái khi tạo mới thành công
        alert("Thanh toán thành công!");
        router.push("/home");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      alert(`Lỗi kết nối server: ${error}`);
    }
  };

  const formatPrice = (price: string | string[]) => {
    const numPrice = Number(price);
    return numPrice.toLocaleString("vi-VN");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>

      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tổng tiền:</Text>
          <Text style={styles.summaryPrice}>
            {formatPrice(totalAmount)} VNĐ
          </Text>
        </View>
      </View>

      <View style={styles.customerInfo}>
        <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={customerName}
          onChangeText={setCustomerName}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ giao hàng"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.paymentMethods}>
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <TouchableOpacity
          style={[
            styles.methodButton,
            paymentMethod === "cash" && styles.selectedMethod,
          ]}
          onPress={() => setPaymentMethod("cash")}
        >
          <Text style={styles.methodText}>Thanh toán khi nhận hàng</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[
            styles.methodButton,
            paymentMethod === "card" && styles.selectedMethod,
          ]}
          onPress={() => setPaymentMethod("card")}
        >
          <Text style={styles.methodText}>Thẻ tín dụng</Text>
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
        <Text style={styles.confirmButtonText}>
          Xác nhận thanh toán ({formatPrice(totalAmount)} VNĐ)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles giữ nguyên như trước
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
  orderSummary: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryPrice: {
    fontSize: 16,
    color: "#FF6F00",
    fontWeight: "bold",
  },
  customerInfo: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  paymentMethods: {
    marginBottom: 20,
  },
  methodButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedMethod: {
    borderColor: "#FF6F00",
    borderWidth: 2,
  },
  methodText: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#FF6F00",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
