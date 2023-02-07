import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import Grid from "../../components/Grid"
import Navbar from "../../components/Navbar"

const regDone = StyleSheet.create({
    bg: {
        height: '100%',
        backgroundColor: "#222020"
    },
    white: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center",
        marginTop: 16
    }
})

export default SignupComplete = () => {
    return (
        <SafeAreaView>
            <Navbar />
        <View style={regDone.bg}>
            <Text style={regDone.white}>Awesome! You're all done!</Text>
            <Grid />
        </View>
        </SafeAreaView>
    )
}