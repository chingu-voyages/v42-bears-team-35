import React, { useState } from "react";
import { Text, TextInput, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles";
import { ROUTES } from "../constants";

const Login = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  function conditionalNavigation() {
    navigation.navigate(ROUTES.FRONT);
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.flexDiv}>
          <Text style={styles.h1}>Login</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="Enter your email"
            value={email}
          />
        </View>
        <View style={styles.flexDiv}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
            placeholder="Enter your password"
          />
        </View>
        <View style={styles.flexDiv}>
          <Pressable
            onPressOut={() => conditionalNavigation()}
            style={styles.greenButton}
          >
            <Text style={styles.greenButtonText}>Login</Text>
          </Pressable>
        </View>
        <View style={styles.flexDiv}>
          <Text style={styles.bold}>create new account</Text>
        </View>
        <Text style={styles.bottom}>continue as guest</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
