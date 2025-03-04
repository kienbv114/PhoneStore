import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View style={{ alignItems: 'center' }}>
        <View style={{
          padding: 30,
          backgroundColor: "#f0f0f0",
          borderRadius: 99,
          marginRight: 15,
          alignItems: 'center'
        }}>
          {category.icon ? (
            <Image 
              source={{ uri: category.icon }} 
              style={{ width: 40, height: 40 }} 
              onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
            />
          ) : (
            <Text>🖼️</Text>
          )}
        </View>
        <Text style={{
          fontSize: 15,
          fontFamily: 'outfit',
          textAlign: 'center',
          marginTop: 5
        }}>
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
