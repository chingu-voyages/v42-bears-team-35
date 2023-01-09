import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  return (
    <>
      <Text>Login</Text>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Email"
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          placeholder="password"
        />
      </View>
      <View style={styles.inputContainer}>
        <Button title="Login" onPress={() => navigation.navigate("Main")} />
      </View>
      <View>
        <Text onPress={() => navigation.navigate("Main")}>
          create new account
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
