import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from './../../constants/Colors';
import CategoryItem from './CategoryItem';
import { router } from 'expo-router';
import { getCategories } from '../../services/api';

interface Category {
  id: number;
  name: string;
  icon: string | any;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const iconMap: { [key: string]: any } = {
    iphone: require('../../assets/images/logoIphone3.png'),
    samsung: require('../../assets/images/samsung.png'),
    xiaomi: require('../../assets/images/xiaomi7.png'),
    oppo: require('../../assets/images/oppo2.png'),
    huawei: require('../../assets/images/Huawei-Logo.png'),
    realme: require('../../assets/images/realme.png'),
    lenovo: require('../../assets/images/new-lenovo-logo.png'),
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const categoriesWithIcons = data.map((category: Category) => ({
          ...category,
          icon: getCategoryIcon(category.icon || category.name.toLowerCase()),
        }));
        setCategories(categoriesWithIcons);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getCategoryIcon = (iconName: string): any => {
    try {
      return iconMap[iconName] || null;
    } catch (error) {
      console.error(`Error loading icon for ${iconName}:`, error);
      return null;
    }
  };

  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: '/(tabs)/product',
      params: { categoryId: category.id, categoryName: category.name },
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading categories...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>List of Catogories</Text>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    overflow: 'hidden',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'#FF9671',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit',
    color: '#fff',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  loadingContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#666',
  },
});