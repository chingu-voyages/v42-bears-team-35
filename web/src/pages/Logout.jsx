import { Text, View, StyleSheet} from "react-native"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateUser } from "../constants/userSlice"
import { SafeAreaView } from "react-native-safe-area-context"
import Navbar from "../components/Navbar"


export default Logout = ({ navigator }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateUser(null))
    }, [])

    const style = StyleSheet.create({
        box: {
            backgroundColor: "#222020",
            width: "100%",
            height: "100%"
        }, 
        text: {
            color: "#fff",
            textAlign: "center",
            fontSize: 20,
            margin: 12
        }
    })

    return (
        <SafeAreaView>
            <Navbar />
        <View style={style.box}>
            <Text style={style.text}>Logged out successfully</Text>
        </View>
        </SafeAreaView>
        
    )
}