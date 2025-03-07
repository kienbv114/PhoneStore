import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const LoginScreen: React.FC = () => {
  const handleSignIn = () => {
    router.push('./SigninScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <Image
          source={require("../assets/images/dienthoai.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Your Ultimate <Text style={{ color: "#FF6F00" }}>Phone Sales Catalog</Text> App
        </Text>
        <Text style={styles.subtitle}>Find your favorite</Text>
        <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
          <Text style={styles.btnText}>Explore Now My Baby</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 350,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  subContainer: {
    padding: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 35,
    fontFamily: "outfit",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "outfit",
    textAlign: "center",
    marginVertical: 15,
  },
  btn: {
    backgroundColor: "#FF9671",
    padding: 20,
    borderRadius: 99,
  },
  btnText: {
    textAlign: "center",
    fontFamily: "outfit",
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginScreen;