import { View, Image, Pressable, StyleSheet, Text, SafeAreaView, } from "react-native"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { ROUTES } from "../constants"

const grid = StyleSheet.create({
    grid: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        height: "85%"
    },
    gridItem: {
        width: "30%",
        height: "36%",
        marginBottom: "8%",
        display: "relative"
    },
    image: {
        height: "100%",
        width: "100%"
    },
    name: {
        backgroundColor: "#fff",
        display: "block",
        position: "relative",
        width: "100%",
        textAlign: "center",
        top: "100%",
        left: 0,
        zIndex: 5,

    }
})

export default Grid = ({ products }) => {
    const navigation = useNavigation()
    //const products = useSelector(state => state.product.value)
    //fetch 9 random items
    return (
        <SafeAreaView>
            <View style={grid.grid}>
                {products.map(item =>
                    <Pressable
                        key={'grid-item-' + item.id}
                        style={grid.gridItem}
                        onPress={() => navigation.navigate(ROUTES.ITEM_DESCRIPTION, { item })} >
                        <View key={item.id} >
                            <Text style={grid.name}>{item.productName.join(' ')}</Text>
                            <Image source={{ uri: item.imageUrl }} style={grid.image} />
                        </View>
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    )
}