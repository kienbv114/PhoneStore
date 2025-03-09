import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../components/context/AuthContext";
import { router } from "expo-router";

const SigninScreen: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    try {
      await login(username, password);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error(error);
      alert("Đăng nhập thất bại");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://via.placeholder.com/400x200" }}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(255, 111, 0, 0.8)", "rgba(255, 140, 66, 0.8)"]}
          style={styles.overlay}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Đăng nhập</Text>
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
                <LinearGradient
                  colors={["#FF6F00", "#FF8C42"]}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>Đăng nhập</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => router.push("/SignupScreen")}>
              <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
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
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "outfit",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    textTransform: "uppercase",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "outfit",
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  btn: {
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 10,
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
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    fontFamily: "outfit",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default SigninScreen;