import { SafeAreaView, Text, StyleSheet } from "react-native"
import { useEffect } from "react"
export default VendorSignUpOne = ({ navigation }) => {

    const style = StyleSheet.create({ 
        bg: {
            background: "#222020",
        }
    })
    useEffect(() => {
        navigation.navigate('Register', {isVendor: true})
    })
    return (<SafeAreaView style={style.bg}><Text>Logging in?</Text></SafeAreaView>)
}