import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from './../../constants/Colors';
import CategoryItem from './CategoryItem';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fakeCategories = [
      { id: 1, name: "Phones", icon: "" },
      { id: 2, name: "Laptops", icon: "" },
      { id: 3, name: "Accessories", icon: "" }
    ];
    setCategories(fakeCategories);
  }, []);

  const handleCategoryPress = (category) => {
    console.log("Selected Category:", category);
  };

  return (
    <View>
      <View style={{
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
      }}>
        <Text style={{
          fontSize: 20,
          fontFamily: 'outfit'
        }}>
          Category
        </Text>
        <Text style={{ color: Colors.dark, fontFamily: 'outfit' }}>View All</Text>
      </View>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryItem category={item} onCategoryPress={handleCategoryPress} />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
}
