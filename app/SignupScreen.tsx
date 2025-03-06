import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { router } from "expo-router";

const SignupScreen: React.FC = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      if (!username || !password) {
        throw new Error("Vui lòng điền đầy đủ thông tin");
      }
      
      await signup(username, password);
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
      <Text style={styles.title}>Đăng ký</Text>
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
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <TouchableOpacity 
        style={[styles.btn, loading && styles.btnDisabled]} 
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/SigninScreen')}>
        <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontFamily: "outfit",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontFamily: "outfit",
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#FF6F00",
    padding: 15,
    borderRadius: 99,
    marginTop: 10,
  },
  btnDisabled: {
    backgroundColor: "#FFB266",
    opacity: 0.7,
  },
  btnText: {
    textAlign: "center",
    fontFamily: "outfit",
    color: "#fff",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#FF6F00",
    fontFamily: "outfit",
    fontSize: 14,
  },
});

export default SignupScreen;