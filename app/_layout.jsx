import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import LoginScreen from "../components/LoginScreen";
import { View, Text } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    isLoggedIn ? (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    ) : (
      <LoginScreen setIsLoggedIn={setIsLoggedIn} /> 
    )
  );
}
