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

const SignupScreen: React.FC = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
 
  const handleSignup = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        throw new Error("Mật khẩu không khớp");
      }
      if (!username || !password || !fullName) {
        throw new Error("Vui lòng điền đầy đủ thông tin");
      }
      await signup(username, password, fullName);
      alert("Đăng ký thành công! Quay lại đăng nhập.");
      router.replace("/SigninScreen");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Đăng ký thất bại.");
    } finally {
      setLoading(false);
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
            <Text style={styles.title}>Đăng ký</Text>
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!loading}
              />
                <TextInput
                style={styles.input}
                placeholder="Tên đầy đủ"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                editable={!loading}
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
             <TextInput
                style={styles.input}
                placeholder="xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!loading}
              />
              <TouchableOpacity
                style={[styles.btn, loading && styles.btnDisabled]}
                onPress={handleSignup}
                disabled={loading}
              >
                <LinearGradient
                  colors={["#FF6F00", "#FF8C42"]}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>
                    {loading ? "Đang xử lý..." : "Đăng ký"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => router.push('/SigninScreen')}>
              <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
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
  btnDisabled: {
    opacity: 0.7,
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

export default SignupScreen;