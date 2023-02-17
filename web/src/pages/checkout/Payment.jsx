import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, View, Pressable, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { updateUser } from "../../constants/userSlice";
import Navbar from "../../components/Navbar";
import { ROUTES } from "../../constants";

export default Checkout = ({ navigation }) => {
    const { height } = useWindowDimensions()
    const dispatch = useDispatch()

    const [submitted, onSubmitted] = useState(false)
    const [cardNumber, onCardNumber] = useState('');
    const [expirationDate, onExpirationDate] = useState('');
    const [cvc, onCvc] = useState('');
    const [validAddress, onValidAddress] = useState(true);
    const [street, onStreet] = useState('');
    const [city, onCity] = useState('');
    const [state, onState] = useState('');
    const [zip, onZip] = useState('');

    function login() {
        //dispatch(updateUser(FAKE_USER))
        onSubmitted(true)
        //navigation.navigate(ROUTES.SLIDES)
    }
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            backgroundColor: "#222020",
            height: height - 70,        },
        flexDiv: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
        bottomDiv: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
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
            color: "#fff",
            marginTop: 8
        },
        h1: {
            fontSize: 20,
            margin: 16,
            marginTop: 38,
            marginLeft: "5%",
            fontWeight: "800",
            alignSelf: "flex-start",
            color: "#fff"

        },
        greenButton: {
            backgroundColor: "#57D491",
            color: "#000",
            width: "90%",
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
            marginBottom: 56
        },
        error: {
            color: "#E44040",
            textAlign: "left"
        },
        row: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "90%",
        },
        halfRow: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%"
        },
        half: {
            width: "47%",
            height: 48,
            padding: 10,
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
        icon: {
            width: 40,
            height: 30,
            marginTop: 36,
        },
        check: {
            width: 42,
            height: 42,
            borderColor: "#ddd",
            borderWidth: 3,
            borderRadius: 6,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        checkMark: {
            color: "#fff",
            fontSize: 36,
            lineHeight: 39,
            backgroundColor: "#222020",
        }
    });

    return (
        <SafeAreaView style={{backgroundColor: "#222020", flex: 1}}>
            <Navbar />
            <ScrollView style={styles.container}>
                <View style={styles.flexDiv}>
                    <Text style={styles.h1}>Let's get you checked out!</Text>
                    <View style={styles.row}>
                        <Text style={{ ...styles.h1, marginLeft: 0 }}>Payment</Text>
                        <Image
                            source={require('../../assets/card.png')}
                            style={styles.icon}
                        />
                    </View>
                    <Text style={styles.label}>Card Number</Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={onCardNumber}
                        placeholder="···· ···· ···· 1234"
                        value={cardNumber}
                        inputMode="cardNumber"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.flexDiv}>
                    <View style={styles.halfRow}>
                        <Text style={{ ...styles.label, marginLeft: 0 }}>Expiration Date</Text>
                        <Text style={{ ...styles.label, marginRight: "35%" }}>CVC</Text>
                    </View>
                    <View style={styles.halfRow}>
                        <TextInput
                            style={styles.half}
                            onChangeText={onExpirationDate}
                            placeholder="12/29"
                            value={expirationDate}
                            inputMode="numeric"
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={styles.half}
                            onChangeText={onCvc}
                            placeholder="···"
                            value={cvc}
                            inputMode="decimal"
                            placeholderTextColor="#888"
                        />
                    </View>
                </View>
                <View style={styles.flexDiv}>
                    <Text style={styles.h1}>Address</Text>
                    <Pressable style={styles.row} onPress={() => onValidAddress(!validAddress)}>
                        <View style={{ ...styles.check, borderColor: validAddress ? "#fff" : "#aaa" }}>
                            <Text style={styles.checkMark}>{validAddress ? "✓" : ""}</Text>
                        </View>
                        <Text style={{ ...styles.label, color: validAddress ? "#fff" : "#aaa" }}>Same as shipping address</Text>
                    </Pressable>
                    <Pressable style={styles.row} onPress={() => onValidAddress(!validAddress)}>
                        <View style={{ ...styles.check, borderColor: !validAddress ? "#fff" : "#aaa" }}>
                            <Text style={styles.checkMark}>{!validAddress ? "✓" : ""}</Text>
                        </View>
                        <Text style={{ ...styles.label, color: !validAddress ? "#fff" : "#aaa" }}>Use the address below</Text>
                    </Pressable>
                </View>

                <View style={styles.flexDiv}>
                    <Text style={{...styles.h1, color: !validAddress ? "#fff" : "#aaa" }}>Billing Address</Text>
                    <Text style={{...styles.label, color: !validAddress ? "#fff" : "#aaa" }}>Street</Text>

                    <TextInput
                        style={{ ...styles.input, borderColor: !validAddress ? "#fff" : "#aaa" }}
                        onChangeText={onStreet}
                        placeholder="987 Mine Street"
                        value={street}
                        inputMode="text"
                        placeholderTextColor="#888"
                        editable={!validAddress ? "true" : "false"}
                    />
                    <Text style={{ ...styles.label, color: !validAddress ? "#fff" : "#aaa" }}>City</Text>
                    <TextInput
                        style={{...styles.input, borderColor: !validAddress ? "#fff" : "#aaa" }}
                        onChangeText={onCity}
                        placeholder="Springfield"
                        value={city}
                        inputMode="text"
                        placeholderTextColor="#888"
                        aria-disabled={!validAddress ? "false" : "true"}
                        editable={!validAddress ? "true" : "false"}
                    />
                    <View style={styles.halfRow}>
                        <Text style={{...styles.label, marginLeft: 0, color: !validAddress ? "#fff" : "#aaa" }}>Zip</Text>
                        <Text style={{...styles.label, marginRight: 0, color: !validAddress ? "#fff" : "#aaa" }}>State</Text>
                    </View>
                    <View style={styles.halfRow}>
                        <TextInput
                            style={{ ...styles.half, borderColor: !validAddress ? "#fff" : "#aaa" }}
                            onChangeText={onZip}
                            placeholder="12340"
                            value={zip}
                            inputMode="numeric"
                            placeholderTextColor="#888"
                            autoComplete="postal-code"
                            aria-disabled={!validAddress ? "false" : "true"}
                            editable={!validAddress ? "true" : "false"}
                        />
                        <TextInput
                            style={{ ...styles.half, borderColor: !validAddress ? "#fff" : "#aaa" }}
                            onChangeText={onState}
                            placeholder="Ohio"
                            value={state}
                            inputMode="decimal"
                            placeholderTextColor="#888"
                            aria-disabled={!validAddress ? "false" : "true"}
                            editable={!validAddress ? "true" : "false"}
                        />
                    </View>
                   
                </View>
                <View style={styles.bottomDiv}>
                    <Pressable
                        onPressOut={() => login()}
                        style={styles.greenButton}
                    >
                        <Text style={styles.greenButtonText}>Login</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
