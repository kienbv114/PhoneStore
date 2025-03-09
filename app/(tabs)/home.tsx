import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Slider from '../../components/Home/Slider';
import CategoryList from '../../components/Home/CategoryList';
import OutstandingProduct from '../../components/Home/OutstandingProduct';

const data = [
  { key: 'slider', component: <Slider /> },
  { key: 'categoryList', component: <CategoryList /> },
  { key: 'outstandingProduct', component: <OutstandingProduct /> },
];

export default function Home() {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => item.component}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
});