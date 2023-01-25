import { View, Text, Image, StyleSheet, Pressable, Systrace, useWindowDimensions} from 'react-native'
import Quantity from './Quantity'


export default CartItem = ({image, name, discount, price, quantity}) => {
    const { width } = useWindowDimensions()
    const style = StyleSheet.create({
        box: {
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#121212",
            borderRadius: 9,
            padding: 6,
            paddingTop: 12,
            width: "100%"
        },
        image: {
            borderRadius: 9,
            margin: 12,
            width: 90,
            height: 140,
            backgroundColor: "grey"
        },
        column: {
            display: "flex",
            padding: 20,
        },
        discount: {
            color: "#E44040",
            fontSize: 12,
            fontWeight: "900"
        },
        name: {
            fontSize: 24,
            color: "white",
            textDecorationColor: "white",
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
            marginTop: 12,
            marginBottom: 12,
            maxWidth: width * .5,
            letterSpacing: 0.5
        },
        row: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center"
        },
        price: {
            fontWeight: "900",
            fontSize: 16,
            color: "white"
        }
    })

    return (
        <View style={style.box}>
            <Image source={{ uri: image}} />
            <View style={style.image}></View>
            <View style={style.column}>
                <Text style={style.discount}>{discount > 0 && discount + '% OFF'}</Text>
                <Pressable>
                    <Text style={style.name}>{name.join(" ")}</Text>
                </Pressable>
                <View style={style.row}>
                    <Text style={style.price}>{(price - parseFloat(price * (discount / 100))).toLocaleString("us-EN", {style: "currency", currency: "USD"})}</Text>
                    <Quantity currentQuantity={quantity} />
                </View>
            </View>
        </View>
    )
}