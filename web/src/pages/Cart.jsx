import { StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#222020"
    }
})

export default Cart => () => {
    // user can see all items in cart
    return (
        <ScrollView style={style.container}>

        </ScrollView>
    )
}