import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { updateUser } from "../constants/userSlice";
import Navbar from "../components/Navbar";
import { ROUTES } from "../constants";

const FAKE_USER = {
  email: "test@thetest.com",
}


const Login = ({ navigation }) => {
  const dispatch = useDispatch()

  const [submitted, onSubmitted] = useState(false)
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  function login() {
    if (email.length <= 3) return
    if (password.length < 8) return 
    dispatch(updateUser(FAKE_USER))
    onSubmitted(true)
    navigation.navigate(ROUTES.SLIDES)
  }
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: "#222020",
      minHeight: "100%",
    },
    flexDiv: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%"
    },
    bold: {
      fontSize: 20,
      fontWeight: "800",
      margin: 16,
      color: "#57D491"
    },
    input: {
      height: 48,
      padding: 10,
      width: "90%",
      borderRadius: 6,
      borderWidth: 2,
      fontSize: 20,
      marginTop: 16,
      marginBottom: 16,
      borderColor: "#ddd",
      borderWidth: 3,
      backgroundColor: "#222020",
      color: "white"
    },
    label: {
      alignSelf: "flex-start",
      margin: 16,
      marginLeft: "5%",
      fontSize: 20,
      marginBottom: 4,
      color: "#fff"

    },
    h1: {
      fontSize: 20,
      margin: 16,
      marginTop: 32,
      marginLeft: "5%",
      fontWeight: "800",
      alignSelf: "flex-start",
      color: "#fff"

    },
    greenButton: {
      backgroundColor: "#57D491",
      color: "#000",
      width: "80%",
      height: 48,
      fontSize: 20,
      textAlign: "center",
      padding: 8,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      borderRadius: 6,
      textAlign: "center",
      marginTop: 24,
      marginBottom: 12,
    },
    greenButtonText: {
      fontSize: 20,
      textAlign: "center",
    },
    bottom: {
      alignSelf: "center",
      margin: 36,
      fontSize: 20,
      fontWeight: "600",
      color: "#fff",
    },
    error: {
      color: "#E44040",
      textAlign: "left"
    }
  });
  
  return (
    <SafeAreaView>
      <Navbar />
      <View style={styles.container}>
        <View style={styles.flexDiv}>
          <Text style={styles.h1}>Login</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="Enter your email"
            value={email}
            inputMode="email"
            placeholderTextColor="#888"
          />
          <Text style={styles.error}>{submitted & email.length < 6 ? "Enter a valid email" : ""}</Text>
        </View>
        <View style={styles.flexDiv}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
            placeholder="Enter your password"
            placeholderTextColor="#888"
          />
          <Text style={styles.error}>{submitted & password.length <= 8 ? "Password must be at least 8 characters" : ""}</Text>

        </View>
        <View style={styles.flexDiv}>
          <Pressable
            onPressOut={() => login()}
            style={styles.greenButton}
          >
            <Text style={styles.greenButtonText}>Login</Text>
          </Pressable>
        </View>
        <View style={styles.flexDiv}>
          <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.bold}>create new account</Text>
          </Pressable>
        </View>
        <Text style={styles.bottom}>continue as guest</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
