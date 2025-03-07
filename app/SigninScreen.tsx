import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { router } from "expo-router";

const SigninScreen: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    try {
      await login(username, password);
      router.replace('/home') ;
    } catch (error) {
      console.error(error);
      alert("Đăng nhập thất bại");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
        <Text style={styles.btnText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('./SignupScreen')}>
        <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
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
    color: "#FF9671",
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
  btnText: {
    textAlign: "center",
    fontFamily: "outfit",
    color: "#FF9671",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#FF9671",
    fontFamily: "outfit",
    fontSize: 14,
  },
});

export default SigninScreen;