// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { getProductById, Product } from "../../services/api";

// export default function ProductDetail() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [imageLoading, setImageLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const foundProduct = await getProductById(id as string);
//         setProduct(foundProduct);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) {
//       fetchProduct();
//     } else {
//       setError("Không tìm thấy ID sản phẩm.");
//       setLoading(false);
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#FF6F00" />
//         <Text style={styles.loadingText}>Đang tải...</Text>
//       </View>
//     );
//   }

//   if (error || !product) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.noProductsText}>
//           {error || "Sản phẩm không tồn tại"}
//         </Text>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => router.back()}
//         >
//           <Text style={styles.backButtonText}>Quay lại</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#2c3e50" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{product.name}</Text>
//         <View style={{ width: 24 }} /> {/* Placeholder để cân bằng layout */}
//       </View>

//       <View style={styles.imageContainer}>
//         {imageLoading && (
//           <ActivityIndicator
//             style={styles.imageLoading}
//             size="large"
//             color="#FF6F00"
//           />
//         )}
//         <Image
//           source={{ uri: product.image }}
//           style={styles.productImage}
//           onLoadStart={() => setImageLoading(true)}
//           onLoadEnd={() => setImageLoading(false)}
//           onError={() => {
//             setImageLoading(false);
//             console.log(`Failed to load image for ${product.name}`);
//           }}
//         />
//       </View>

//       <View style={styles.productInfo}>
//         <Text style={styles.productName}>{product.name}</Text>
//         <Text style={styles.productPrice}>
//           {product.price.toLocaleString("vi-VN")} VNĐ
//         </Text>
//         <Text style={styles.productRating}>Đánh giá: {product.rating} ★</Text>
//         <TouchableOpacity style={styles.addButton}>
//           <Ionicons name="cart-outline" size={20} color="#fff" />
//           <Text style={styles.addButtonText}>Thêm vào giỏ hàng</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fd",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 15,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontFamily: "outfit",
//     fontWeight: "700",
//     color: "#2c3e50",
//     textAlign: "center",
//     flex: 1,
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f8f9fd",
//   },
//   imageContainer: {
//     position: "relative",
//     width: "100%",
//     alignItems: "center",
//   },
//   imageLoading: {
//     position: "absolute",
//     top: "40%",
//   },
//   productImage: {
//     width: "100%",
//     height: 300,
//     borderRadius: 15,
//     marginBottom: 10,
//   },
//   productInfo: {
//     padding: 20,
//     alignItems: "center",
//   },
//   productName: {
//     fontSize: 24,
//     fontFamily: "outfit",
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//     color: "#2c3e50",
//   },
//   productPrice: {
//     fontSize: 18,
//     fontFamily: "outfit",
//     color: "#FF6F00",
//     marginBottom: 5,
//     textAlign: "center",
//   },
//   productRating: {
//     fontSize: 16,
//     fontFamily: "outfit",
//     color: "#666",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   addButton: {
//     flexDirection: "row",
//     backgroundColor: "#FF6F00",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   addButtonText: {
//     color: "#fff",
//     fontFamily: "outfit",
//     fontWeight: "600",
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   loadingText: {
//     fontSize: 16,
//     fontFamily: "outfit",
//     color: "#666",
//     textAlign: "center",
//     marginTop: 10,
//   },
//   noProductsText: {
//     fontSize: 16,
//     fontFamily: "outfit",
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   backButton: {
//     backgroundColor: "#FF6F00",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   backButtonText: {
//     fontSize: 16,
//     fontFamily: "outfit",
//     color: "#fff",
//     fontWeight: "600",
//   },
// });