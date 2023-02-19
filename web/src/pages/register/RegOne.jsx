import React, { useState } from "react";
import { Text, TextInput, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../../constants";

export default RegisterOne = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [state, setIt] = useState("ok")

  function conditionalNavigation() {
    navigation.navigate(ROUTES.FRONT);
  }

  function login() {
    navigation.navigate(ROUTES.LOGIN)
    setIt("DONE")
  }

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: "#fff",
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
    },
    input: {
      height: 48,
      padding: 10,
      width: "90%",
      borderRadius: 6,
      borderWidth: 2,
      fontSize: 20,
      marginTop: 16,
      marginBottom: 16
    },
    label: {
      alignSelf: "flex-start",
      margin: 16,
      marginLeft: "5%",
      fontSize: 20,
      marginBottom: 4,
    },
    h1: {
      fontSize: 20,
      margin: 16,
      marginTop: 32,
      marginLeft: "5%",
      fontWeight: "800",
      alignSelf: "flex-start",
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
      color: "#787",
    },
  });
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.flexDiv}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="Email"
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
            placeholder="password"
          />
        </View>
        <View style={styles.flexDiv}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
            placeholder="password"
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
j          <Pressable onPressOut={() => navigation.navigate(ROUTES.FRONT)}><Text>HAH</Text></Pressable>
        </View>
        <Text style={styles.bottom}>{state}</Text>
      </View>
    </SafeAreaView>
  );
};


