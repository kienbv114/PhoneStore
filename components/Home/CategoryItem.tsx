import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface Category {
  id: number;
  name: string;
  icon: string | any;
}

interface CategoryItemProps {
  category: Category;
  onCategoryPress: (category: Category) => void;
}

export default function CategoryItem({ category, onCategoryPress }: CategoryItemProps) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)} style={styles.container}>
      <View style={styles.iconContainer}>
        {category.icon ? (
          <Image
            source={typeof category.icon === 'string' ? { uri: category.icon } : category.icon}
            style={styles.icon}
          />
        ) : (
          <Text style={styles.placeholderIcon}>🖼️</Text>
        )}
      </View>
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholderIcon: {
    fontSize: 24,
  },
  categoryText: {
    fontSize: 15,
    fontFamily: 'outfit',
    textAlign: 'center',
    color: '#333',
    width: 70,
  },
});
