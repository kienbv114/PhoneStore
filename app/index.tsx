import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const LoginScreen: React.FC = () => {
  const handleSignIn = () => {
    router.push("/home");
  };

  return (
    <ImageBackground
      source={{ uri: "https://via.placeholder.com/400x800" }}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(255, 111, 0, 0.7)", "rgba(255, 140, 66, 0.7)"]}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Image
              source={require("../assets/images/dienthoai.png")}
              style={styles.image}
            />
            <Text style={styles.title}>
              Your Ultimate{" "}
              <Text style={styles.highlight}>Phone Sales Catalog</Text> App
            </Text>
            <Text style={styles.subtitle}>Discover your favorite phones today!</Text>
            <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
              <LinearGradient
                colors={["#FF6F00", "#FF8C42"]}
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>Explore Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 250,
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: "outfit",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
    fontWeight: "bold",
  },
  highlight: {
    color: "#FF6F00",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "outfit",
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    fontStyle: "italic",
  },
  btn: {
    borderRadius: 25,
    overflow: "hidden",
    width: "80%",
  },
  btnGradient: {
    paddingVertical: 15,
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    fontFamily: "outfit",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoginScreen;