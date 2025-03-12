import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import {
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
} from "../../services/api";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.id) {
        try {
          const data = await getUserById(user.id);
          setUserDetails(data);
          setUsername(data.username || "");
          setPassword(data.password || "");
          setFullName(data.fullName || "");
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };
    fetchUserDetails();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!username.trim()) {
      alert("Tên đăng nhập không được để trống!");
      return;
    }
    if (!password.trim()) {
      alert("Mật khẩu không được để trống!");
      return;
    }

    try {
      const existingUsers = await getUsers();
      const usernameExists = existingUsers.some(
        (u: any) => u.username === username && u.id !== user.id
      );
      if (usernameExists) {
        alert("Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.");
        return;
      }

      const updatedData = {
        username,
        password,
        fullName: fullName.trim() || undefined,
      };

      const updatedUser = await updateUser(user.id, updatedData);
      setUserDetails(updatedUser);
      setIsEditing(false);
      alert("Cập nhật tài khoản thành công!");
    } catch (error) {
      alert("Cập nhật tài khoản thất bại!");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.id);
      logout();
      alert("Tài khoản đã được xóa!");
    } catch (error) {
      alert("Xóa tài khoản thất bại!");
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={{ uri: "https://via.placeholder.com/400x800" }}
          style={styles.background}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(255, 111, 0, 0.7)", "rgba(255, 140, 66, 0.7)"]}
            style={styles.overlay}
          >
            <View style={styles.notLoggedInContainer}>
              <View style={styles.card}>
                <Text style={styles.notLoggedInText}>Bạn chưa đăng nhập</Text>
                <Text style={styles.notLoggedInSubtitle}>
                  Vui lòng đăng nhập để tiếp tục
                </Text>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => router.push("/SigninScreen")}
                >
                  <LinearGradient
                    colors={["#FF6F00", "#FF8C42"]}
                    style={styles.btnGradient}
                  >
                    <Text style={styles.btnText}>Đi đến Đăng nhập</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#FF6F00", "#FF8C42"]} style={styles.header}>
        <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }} // Thay bằng ảnh thật nếu có
            style={styles.avatar}
          />
          <Ionicons
            name="person-circle"
            size={100}
            color="#FF6F00"
            style={styles.avatarIcon}
          />
        </View>
        {userDetails ? (
          <View style={styles.card}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Tên đăng nhập:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Nhập tên đăng nhập..."
                  placeholderTextColor="#999"
                />
              ) : (
                <Text style={styles.info}>{userDetails.username}</Text>
              )}
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Mật khẩu:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Nhập mật khẩu..."
                  placeholderTextColor="#999"
                  secureTextEntry
                />
              ) : (
                <Text style={styles.info}>********</Text>
              )}
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Tên đầy đủ:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Nhập tên đầy đủ..."
                  placeholderTextColor="#999"
                />
              ) : (
                <Text style={styles.info}>
                  {userDetails.fullName || "Chưa cập nhật"}
                </Text>
              )}
            </View>
          </View>
        ) : (
          <Text style={styles.loadingText}>Đang tải thông tin...</Text>
        )}
        <View style={styles.buttonGroup}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleUpdateProfile}
              >
                <Text style={styles.btnText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setIsEditing(false);
                  setUsername(userDetails?.username || "");
                  setPassword(userDetails?.password || "");
                  setFullName(userDetails?.fullName || "");
                }}
              >
                <Text style={styles.btnText}>Hủy</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.btnText}>Cập nhật tài khoản</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.btnText}>Xóa tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.btnText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
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
  notLoggedInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: "center",
  },
  notLoggedInText: {
    fontSize: 24,
    fontFamily: "outfit",
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  notLoggedInSubtitle: {
    fontSize: 16,
    fontFamily: "outfit",
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  loginBtn: {
    borderRadius: 25,
    overflow: "hidden",
    width: "80%",
  },
  btnGradient: {
    paddingVertical: 15,
    alignItems: "center",
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "outfit",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  content: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FF6F00",
  },
  avatarIcon: {
    position: "absolute",
    opacity: 0.2,
  },
  infoItem: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "outfit",
    color: "#333",
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    fontFamily: "outfit",
    color: "#666",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontFamily: "outfit",
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
  },
  buttonGroup: {
    width: "100%",
    alignItems: "center",
  },
  editBtn: {
    backgroundColor: "#FF6F00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  saveBtn: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cancelBtn: {
    backgroundColor: "#95a5a6",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  logoutBtn: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  btnText: {
    textAlign: "center",
    fontFamily: "outfit",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingText: {
    fontSize: 18,
    fontFamily: "outfit",
    color: "#666",
    textAlign: "center",
  },
});

export default ProfileScreen;
