import { View, Image, Pressable, StyleSheet, Text, SafeAreaView, } from "react-native"
import { useSelector } from "react-redux"
import { useState } from "react"
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
        height: "80%",
        width: "90%",
        borderRadius: 6,
    },
    name: {
        color: "#fff",
        display: "block",
        position: "relative",
        width: "100%",
        textAlign: "center",
       
    },
    id: {
        backgroundColor: "black",
        borderRadius: 9,
        display: "grid",
        flexDirection: 'column-reverse',
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
    }
})

export default Grid = ({ products }) => {
    const navigation = useNavigation()

    return (
        <SafeAreaView>
            <View style={grid.grid}>
                {products.map(item =>
                    <Pressable
                        key={'grid-item-' + item.id}
                        style={grid.gridItem}
                        onPress={() => navigation.navigate(ROUTES.ITEM_DESCRIPTION, { item })} >
                        <View key={item.id} style={grid.id}>
                            <Text style={grid.name}>{item.tags.join(' ')}</Text>
                            <Image source={{ uri: item.imageUrl }} style={grid.image} />
                        </View>
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    )
}