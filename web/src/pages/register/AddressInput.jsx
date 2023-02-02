import React, { useState } from "react";
import { Text, TextInput, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";

export default AddressInput = ({ navigation, route }) => {
  const isRegister = route.params

  const [submitted, setSubmitted] = useState(false)
  const [name, onNameChange] = useState("")
  const [street, onStreetChange] = useState("");
  const [city, onCityChange] = useState("");
  const [state, onStateChange] = useState("");
  const [zipCode, onZipCodeChange] = useState("")

  const dispatch = useDispatch()


  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: "#222020",
      minHeight: "100%",
    },
    flexDiv: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: "5%",
      paddingBottom: 0
    },
    bold: {
      fontSize: 20,
      fontWeight: "800",
      color: "#57D491"
    },
    input: {
      height: 48,
      padding: 10,
      width: "100%",
      borderRadius: 6,
      borderWidth: 2,
      fontSize: 20,
      borderColor: "#ddd",
      borderWidth: 2,
      backgroundColor: "#222020",
      color: "#fff",
      placeholder: "#fff"
    },
    label: {
      alignSelf: "flex-start",
      fontSize: 20,
      color: "#fff"

    },
    small: {
        alignSelf: "flex-start",
        fontSize: 20,
        color: "#fff",  
        marginTop: 8,
        marginBottom: 6
      },
    h1: {
      fontSize: 20,
      fontWeight: "800",
      alignSelf: "flex-start",
      color: "#fff",
      marginBottom: 16
    },
    p: {
        color: "#fff",
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
        position: "absolute",
        bottom: 120,
        left: 0,
        borderRadius: 6
    },
    greenBar: {
        width: "66%",
        backgroundColor: "#57D491",
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6
    },
    row: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        marginLeft: "5%",
        justifyContent: "space-between"
    },
    col: {
        width: "46%"
    }
  });
  
  return (
    <SafeAreaView>
      <Navbar />
      <View style={styles.container}>
        <View style={styles.flexDiv}>
          <Text style={styles.h1}>Shipping Address</Text>
          <Text style={styles.small}>Full Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onNameChange}
            placeholder="Fabiola S. Thompson"
            value={name}
            autoComplete="name"
          />
          <Text style={styles.small}>Street</Text>
          <TextInput
            style={styles.input}
            onChangeText={onStreetChange}
            placeholder="123 Easy Street"
            value={street}
            autoComplete="street-address"
          />
          <Text style={styles.error}>{submitted & street.length == 0 ? "Field cannot be empty" : ""}</Text>
        </View>
        <View style={styles.flexDiv}>
          <Text style={styles.small}>City</Text>
          <TextInput
            style={styles.input}
            onChangeText={onCityChange}
            value={city}
            placeholder="Columbus"
            autoComplete="address-line1"
          />
          <Text style={styles.error}>{submitted & city.length == 0 ? "Field cannot be empty" : ""}</Text>

        </View>
        <View style={styles.row}>
            <View style={styles.col}>
            <Text style={styles.small}>State</Text>
          <TextInput
            style={styles.input}
            onChangeText={onStateChange}
            value={state}
            placeholder="OH"
            autoComplete="address-line2"
          />
            </View>
            <View style={styles.col}>
            <Text style={styles.small}>Zip</Text>
          <TextInput
            style={styles.input}
            onChangeText={onZipCodeChange}
            value={zipCode}
            placeholder="43210"
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={5}
          />
            </View>
        </View>
        <View style={styles.flexDiv}>
          <Pressable
            style={styles.greenButton}
          >
            <Text style={styles.greenButtonText} 
            onPress={() => nextStep(dispatch, navigation, setSubmitted)}
            >Sign up</Text>
          </Pressable>
        </View>
        <View style={styles.flexDiv}>
          <Text style={styles.bottom}>or login</Text>
        </View>
      </View>
        { isRegister && 
        <View style={styles.progress}>
            <View style={styles.greenBar}></View>
        </View>
        }
    </SafeAreaView>
  );
};

function nextStep(dispatch,  navigation, setSubmitted) {
    //dispatch(updateUser({email, password}))
    console.log('go to pay')
    setSubmitted(true)
    //navigation.navigate('AddressInput')
}
