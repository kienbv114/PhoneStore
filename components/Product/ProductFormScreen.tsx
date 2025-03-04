import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ProductFormScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thêm / Chỉnh sửa sản phẩm</Text>
      </View>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Tên sản phẩm" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Giá" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Mô tả" value={description} onChangeText={setDescription} multiline />
        <TextInput style={styles.input} placeholder="Số lượng" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Màu sắc" value={color} onChangeText={setColor} />
        <TextInput style={styles.input} placeholder="Hình ảnh (URL)" value={image} onChangeText={setImage} />

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', width, height },
  header: { backgroundColor: '#d9534f', paddingVertical: 15, alignItems: 'center', marginBottom: 10, shadowOpacity: 0.15, shadowOffset: { width: 0, height: 3 }, shadowRadius: 5, elevation: 5  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  form: { backgroundColor: '#fff', padding: 15, marginHorizontal: 12, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 5 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 15, padding: 10, fontSize: 16, backgroundColor: '#f8f9fa', borderRadius: 5 },
  submitButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  submitButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
});

export default ProductFormScreen;