// import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
   <Tabs screenOptions={{headerShown:false}}>
        <Tabs.Screen name='home'
        options={{
          tabBarLabel:'Home',
          tabBarIcon:({color}) =><FontAwesome name="home" 
          size={24} color="black" />
        }}
        />
         <Tabs.Screen name='product'
        options={{
          tabBarLabel:'Product',
          tabBarIcon:({color}) =><FontAwesome name="product-hunt" 
          size={24} color="black" />
        }}
        />
        <Tabs.Screen name='cart'
        options={{
          tabBarLabel:'Cart',
          tabBarIcon:({color}) =><Entypo name="shopping-cart" 
          size={24} color="black" />
        }}
        />
         <Tabs.Screen name='profile'
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color}) =><MaterialCommunityIcons name="face-man-profile" 
          size={24} color="black" />
        }}
        />
   </Tabs>
  )
}