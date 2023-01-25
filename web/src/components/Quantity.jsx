import { Pressable, Text, View, StyleSheet } from "react-native"
import { useState } from "react"

export default Quantity = ({currentQuantity}) => {
    const [quantity, setQuantity] = useState(currentQuantity)
    const style = StyleSheet.create({
        row: {
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-end",
            marginLeft: 6
        },
        q: {
            color: "white",
            fontSize: 24,
            padding: 6
        },
        button: {
            backgroundColor: "#222020",
            borderRadius: 6
        },
        buttonText: {
            color: "white",
            fontSize: 24,
            padding: 12,
            paddingTop: 6,
            paddingBottom: 6,
        }
    })
    return (
        <View style={style.row}>
            <Pressable 
                onPress={() => setQuantity(quantity > 0 ? quantity - 1 : quantity)}
                style={style.button}
            >
            <Text style={style.buttonText}>-</Text>
            </Pressable>
            <Text style={style.q}>{quantity}</Text>
            <Pressable
                onPress={() => setQuantity(quantity + 1) }
                style={style.button}
            >
                <Text style={style.buttonText}>+</Text>
            </Pressable>
        </View>
    )
}