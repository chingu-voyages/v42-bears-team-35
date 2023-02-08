import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { updateUser } from "../../constants/userSlice";
import Navbar from "../../components/Navbar";
import { ROUTES } from "../../constants";


export default FirstPage = ({ navigation, route}) => {
  const { isVendor } = route && route.params || false

  const [submitted, setSubmitted] = useState(false)
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const dispatch = useDispatch()

  
  
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: "#222020",
      minHeight: "100%",
      paddingTop: 24
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
      color: "white",
      fontWeight: "600"
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
    p: {
        color: "#fff",
        alignSelf: "flex-start",
        marginLeft: "5%",
        marginBottom: 24,
        fontSize: 20
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
    },
    progress: {
        width: "90%",
        marginLeft: "5%",
        height: 6,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#e5e5e5",
        position: 'absolute',
        top: 120,
        left: 0,
        borderRadius: 6
    },
    greenBar: {
        width: "33%",
        backgroundColor: "#57D491",
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6
    }
  });
  
  return (
    <SafeAreaView>
      <Navbar />
      <View style={styles.container}>
        <View style={styles.flexDiv}>
          <Text style={styles.h1}>Sign Up</Text>
          <Text style={styles.p}>{isVendor ? "Start selling today" : "So you can save your faves!"}</Text>
          
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="Enter your email"
            value={email}
            inputMode="email"
            placeholderTextColor="#888"

          />
          <Text style={styles.error}>{(submitted & email.length < 6) ? "Enter a valid email" : ""}</Text>
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
            style={styles.greenButton}
          >
            <Text style={styles.greenButtonText} 
            onPress={() => nextStep(dispatch, email, password, navigation, setSubmitted)}
            >Sign up</Text>
          </Pressable>
        </View>
        <View style={styles.flexDiv}>
          <Pressable onPress={() => navigation.navigate('Login')}>
           <Text style={styles.bottom}>already a member? login</Text>
          </Pressable>
        </View>
      </View>
        <View style={styles.progress}>
            <View style={styles.greenBar}></View>
        </View>
    </SafeAreaView>
  );
};

function nextStep(dispatch, email, password, navigation, setSubmitted) {
    dispatch(updateUser({email, password}))
    setSubmitted(true)
    navigation.navigate('AddressInput', {isRegister: true})
  }
