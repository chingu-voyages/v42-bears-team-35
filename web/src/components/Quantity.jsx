import { Image, Pressable, Text, View, StyleSheet } from "react-native"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateCart } from '../constants/cartSlice'

export default Quantity = ({ currentQuantity, id }) => {
    const cart = useSelector(state => state.cart.value)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(currentQuantity)

    function handleDelete(itemId, dispatch, cart) {
        const updatedCart = cart.filter((item) => item.id !== itemId)
        dispatch(updateCart(updatedCart))
    }

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
        },
        delete: {
            marginLeft: 6,
            height: 24,
            width: 24,
            marginRight: 12,
            marginTop: 8
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
                onPress={() => setQuantity(quantity + 1)}
                style={style.button}
            >
                <Text style={style.buttonText}>+</Text>
            </Pressable>
            {quantity == 0 &&
                <Pressable onPress={() => handleDelete(id, dispatch, cart)}>
                    <Image
                        source={require('../assets/trash-can.png')}
                        style={style.delete}
                    />
                </Pressable>}
        </View>
    )
}