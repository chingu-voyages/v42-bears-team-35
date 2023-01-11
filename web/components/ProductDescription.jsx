import { Image, Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { useState } from "react";
import Navbar from "./Navbar";
import { DateTime } from "luxon"

const ProductDescription = ({ navigation }) => {

const {height, width} = useWindowDimensions()

const style = StyleSheet.create({
    container: {
        width: width,
        padding: 20,
    },
    column: {
        display: "flex",
        flexDirection: "column",
        width: (width * .6) - 40,
        padding: 20,
        paddingTop: 0
    },
    prices: {
        display: "flex",
        flexDirection: "column"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        width: (width * .6) - 60
    },
    rowBottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        width: (width * .6) - 60,
        marginTop: 36
    },
    stars: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        height: 100
    },
    imageHeading: {
        display: "flex",
        flexDirection: "row"
    },
    mainImage: {
        width: width * .4,
        height: width * .4,
        borderRadius: 9,
    },
    smallRed: {
        color: "#f40",
        alignSelf: "flex-start",
        marginLeft: 12
    },
    h2: {
        fontSize: 32
    },
    grey: {
        fontSize: 20,
        color: "#c9c9c9",
        textDecorationColor: "#000",
        textDecorationLine: "line-through",
        alignItems: "flex-end"
    },
    price: {
        fontSize: 20,
        alignItems: "flex-end"
    },
    fullStar: {
        color: "#F1C644"
    }
})
  const prop = {
    imageUrl: "./red-hat.jpg",
    productName: ["reddest", "barrette"],
    productDescription: "A fabulous red barret designed and made in France. Channel your inner french girl aesthetic with this hat",
    price: 30.99,
    discount: 5,
    dateAdded: new Date(),
    productRating: 4
  }
  function conditionalNavigation() {
    navigation.navigate("Main");
  }
  return (
    <>
      <Navbar />
      <View style={style.container}>

      <View style={style.imageHeading}>
        <Image 
            source={require('../assets/red-hat.jpg')}
            style={style.mainImage}
            />
            <View style={style.column}>
                <View style={style.row}>
                    <Text style={style.h2}>{prop.productName.join(' ')}</Text>
                    <Text style={style.smallRed}>NEW</Text>

                </View>
                <View style={style.rowBottom}>
                    <View style={style.stars}>
                        <Text style={style.fullStar}>★</Text>
                        <Text style={style.fullStar}>★</Text>
                        <Text style={style.fullStar}>★</Text>
                        <Text style={style.emptyStar}>☆</Text>
                        <Text style={style.emptyStar}>☆</Text>
                    </View>
                    <View style={style.prices}>
                        <Text style={style.grey}>{(prop.discount && prop.price).toLocaleString("us-EN", {style: "currency", currency: "USD"})}</Text>
                        <Text style={style.price}>{(prop.price - parseFloat(prop.price * (prop.discount / 100))).toLocaleString("us-EN", {style: "currency", currency: "USD"})}</Text>
                    </View>
                </View>
            </View>
        </View>
      <View style={style.flexDiv}>
        
      </View>
    </View>
    </>
  );



};


export default ProductDescription;
