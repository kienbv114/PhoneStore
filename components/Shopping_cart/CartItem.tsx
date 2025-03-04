import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CartItemProps {
  image: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ image, name, description, price, quantity, onIncrease, onDecrease, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image style={styles.productImage} source={{ uri: image }} />
      </View>
      <View style={styles.productDetails}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{name}</Text>
          <TouchableOpacity onPress={onRemove}>
            <Ionicons name="trash-outline" size={24} color="#d9534f" />
          </TouchableOpacity>
        </View>
        <Text style={styles.productDescription}>{description}</Text>
        <View style={styles.priceQuantityContainer}>
          <Text style={styles.productPrice}>{price * quantity}$</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={onDecrease} disabled={quantity <= 1}>
              <Ionicons name="remove-circle-outline" size={24} color={quantity > 1 ? "#007bff" : "#ccc"} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={onIncrease}>
              <Ionicons name="add-circle-outline" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// =====================
// Styles
// =====================
const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    marginBottom: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#343a40",
    flex: 1,
  },
  productDescription: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  productPrice: {
    color: "#d9534f",
    fontSize: 16,
    fontWeight: "bold",
  },
  priceQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    color: "#343a40",
    marginHorizontal: 8,
  },
});

export default CartItem;
