import React from 'react';
import { View } from 'react-native';
import Slider from '../../components/Home/Slider' ;
import CategoryList from '../../components/Home/CategoryList';
import OutstandingProduct from '../../components/Home/OutstandingProduct';

export default function Home() {
  return (
    <View>
      <Slider />
      <CategoryList/>
      <OutstandingProduct/>
    </View>
  );
}