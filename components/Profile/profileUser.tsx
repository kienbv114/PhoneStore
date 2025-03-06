import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bạn chưa đăng nhập</Text>
        <TouchableOpacity 
          style={styles.btn}
          onPress={() => router.push('/SigninScreen')}
        >
          <Text style={styles.btnText}>Đi đến Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hồ sơ cá nhân</Text>
      <Text style={styles.info}>Tên đăng nhập: {user.username}</Text>
      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Text style={styles.btnText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  info: {
    fontSize: 16,
    fontFamily: "outfit",
    marginVertical: 10,
    color: "#666",
  },
  btn: {
    backgroundColor: "#FF6F00",
    padding: 15,
    borderRadius: 99,
    marginTop: 20,
    alignSelf: "center",
  },
  btnText: {
    textAlign: "center",
    fontFamily: "outfit",
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;