import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider } from "../components/context/AuthContext";

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF6F00" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="SigninScreen" />
        <Stack.Screen name="SignupScreen" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
