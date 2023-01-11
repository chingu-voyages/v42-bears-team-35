import React, { useState } from "react";
import { Text, TextInput, View, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Navbar from './Navbar'

const Login = ({ navigation }) => {
  const {height, width} = useWindowDimensions()

  const style = StyleSheet.create({
    h1: {
      fontSize: 20,
      fontWeight: "800",
      marginTop: 8,
      marginBottom: 24
    },
    container: {},
    input: {
      width: width - 48,
      border: 2,
      borderWidth: 2,
      borderRadius: 9,
      padding: 12,
      fontSize: 20
    },
    flexDiv: {
      width: width,
      display: "flex",
      flexDirection: "column",
      padding: 24,
      paddingBottom: 12
    },
    centeredDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
      paddingTop: 12
    },
    label: {
      marginTop: 8,
      marginBottom: 8,
      fontSize: 20
    },
    greenButton: {
      width: 200,
      backgroundColor: "#57D491",
      padding: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 9
    },
    greenButtonText: {
      fontSize: 20
    },
    bold: {
      fontWeight: "800",
      fontSize: 20
    },
    bottom: {
      fontSize: 20
    }
  })

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  function conditionalNavigation() {
    navigation.navigate("Product Description");
  }

  return (
    <View style={style.container}>
      <Navbar />
      <View style={style.flexDiv}>
        <Text style={style.h1}>Login</Text>
        <Text style={style.label}>Email</Text>
        <TextInput
          style={style.input}
          onChangeText={onChangeEmail}
          placeholder="Email"
          value={email}
        />
      </View>
      <View style={style.flexDiv}>
        <Text style={style.label}>Password</Text>
        <TextInput
          style={style.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          placeholder="password"
        />
      </View>
      <View style={style.centeredDiv}>
        <Pressable
          onPress={() => conditionalNavigation()}
          style={style.greenButton}
        >
          <Text style={style.greenButtonText}>Login</Text>
        </Pressable>
      </View>
      <View style={style.centeredDiv}>
        <Text style={style.bold}>create new account</Text>
      </View>
      <View style={style.centeredDiv}>
        <Text style={style.bottom}>continue as guest</Text>
      </View>
    </View>
  );
  
};

export default Login;
