import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({ setIsLoggedIn }) {
  const fakeLogin = async () => {
    await SecureStore.setItemAsync("userToken", "fake_token");
    setIsLoggedIn(true);
  };

  return (
    <View>
      <View style={styles.centeredContainer}>
        <Image 
          source={require('./../assets/images/dienthoai.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Your Ultimate <Text style={{ color: "#FF6F00" }}>Phone Sales Catalog</Text> App
        </Text>
        <Text style={styles.subtitle}>Find your favorite</Text>
        <TouchableOpacity style={styles.btn} onPress={fakeLogin}>
          <Text style={styles.btnText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 350,
    borderRadius: 20,
    borderColor: '#000',
  },
  subContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 35,
    fontFamily: 'outfit',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'outfit',
    textAlign: 'center',
    marginVertical: 15,
  },
  btn: {
    backgroundColor: "#FF6F00",
    padding: 20,
    borderRadius: 99,
  },
  btnText: {
    textAlign: 'center',
    fontFamily: 'outfit',
    color: "#fff",
    fontSize: 16,
  }
});
