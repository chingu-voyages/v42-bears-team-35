import { View, StyleSheet } from "react-native"



export default Popup = ({message, ifYes, ifNo}) => {

    const style = StyleSheet.create({
        box: {
            zIndex: 100,
            position: "absolute",
            top: "25%",
            left: "5%",
            width: "90%",
            height: "50%"
        }
    })
    return (
        <View style={style.box} >
            <Text>{message}</Text>
        </View>
    )
}