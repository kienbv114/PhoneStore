import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import ProductFormScreen from '../../components/Product/ProductFormScreen';

export default function ListProduct() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ProductFormScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    // paddingHorizontal: 16,
  },
});
