import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import { Category } from "../../services/api"; // Nhập Category từ api.ts

interface CategoryItemProps {
  category: Category;
  onCategoryPress: (category: Category) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onCategoryPress }) => {
  return (
    <TouchableOpacity style={styles.categoryItem} onPress={() => onCategoryPress(category)}>
      <Image source={category.icon || require("../../assets/images/logoIphone3.png")} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: "center",
    padding: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: "outfit",
    color: "#2c3e50",
    marginTop: 5,
    textAlign: "center",
  },
});

export default CategoryItem;