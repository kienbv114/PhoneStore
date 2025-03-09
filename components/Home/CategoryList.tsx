import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { router } from "expo-router";
import { getCategories, Category } from "../../services/api";

interface IconMap {
  [key: string]: any;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const iconMap: IconMap = {
    iphone: require("../../assets/images/logoIphone3.png"),
    samsung: require("../../assets/images/samsung.png"),
    xiaomi: require("../../assets/images/xiaomi7.png"),
    oppo: require("../../assets/images/oppo2.png"),
    huawei: require("../../assets/images/Huawei-Logo.png"),
    realme: require("../../assets/images/realme.png"),
    lenovo: require("../../assets/images/new-lenovo-logo.png"),
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const categoriesWithIcons = data.map((category: Category) => ({
          ...category,
          icon: getCategoryIcon(category.icon || category.name.toLowerCase()) || undefined,
        }));
        setCategories(categoriesWithIcons);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getCategoryIcon = (iconName: string): any => {
    try {
      const icon = iconMap[iconName.toLowerCase()] || null;
      if (!icon) {
        console.warn(`Icon not found for ${iconName}, using default`);
      }
      return icon;
    } catch (error) {
      console.error(`Error loading icon for ${iconName}:`, error);
      return null;
    }
  };

  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: "/(tabs)/product",
      params: { categoryId: category.id.toString(), categoryName: category.name },
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Đang tải danh mục...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh Mục Nổi Bật</Text>
      </View>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryItem category={item} onCategoryPress={handleCategoryPress} />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 12,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FF6F00",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit",
    color: "#fff",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  flatListContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 12,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: "outfit",
    color: "#7f8c8d",
    fontStyle: "italic",
  },
});