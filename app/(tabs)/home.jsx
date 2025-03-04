import React from 'react';
import { View } from 'react-native';
import Category from '../../components/Home/Category';
import Slider from '../../components/Home/Slider' ;

export default function Home() {
  return (
    <View>
      <Slider />
      <Category/>
    </View>
  );
}