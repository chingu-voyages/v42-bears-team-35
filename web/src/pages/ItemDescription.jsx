import { Image, Text, View, StyleSheet, useWindowDimensions, Pressable, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Review from "../components/Review";

const ProductDescription = ({ navigation }) => {
const [orderQuantity, setOrderQuantity] = useState(1)
const {height, width} = useWindowDimensions()

const style = StyleSheet.create({
    container: {
        width: width,
        padding: 20,
        display: "flex",
        flexDirection: "row",
        paddingBottom: 0
    },
    right: {
        display: "flex",
        flexDirection: "column",
        width: (width * .6) - 40,
        paddingTop: 0,
        paddingLeft: 0
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
        width: (width * .6) - 40
    },
    rowBottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        width: (width * .6) - 60,
        marginTop: 12
    },
    stars: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        height: 84,
        paddingLeft: 24,
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
        alignItems: "flex-end",
        padding: 0
    },
    fullStar: {
        color: "#F1C644"
    },
    reviewCount: {
        marginLeft: 12
    },
    imageSelector: {
        width: width,
        padding: 24,
        display: "flex",
        flexDirection: "row",
        paddingBottom: 12
    },
    secondaryImage: {
        height: 52,
        width: 52,
        marginRight: 24,
        borderRadius: 9
    },
    unselectedImage: {
        height: 52,
        width: 52,
        marginRight: 24,
        borderRadius: 9,

    },
    p: {
        fontSize: 20
    },
    text: {
        width: width,
        padding: 24,
        paddingTop: 12,
        paddingBottom: 12
    },
    signButton: {
        backgroundColor: "#d9d9d9",
        padding: 20,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 9,
        marginRight: 8
    },
    greenButton: {
        backgroundColor: "#57D491",
        width: "40%",
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 9,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "900"
    },
    numberInput: {
        fontSize: 20,
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 9,
        width: 56,
        marginRight: 8,
        textAlign: "center"
    },
    reviews: {
        width: width,
        padding: 24
    },
    h3: {
        fontSize: 24,
        marginBottom: 8
    },
    starsNoPadding: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 4
    },
    starsMinWidth: {
        width: 84,
        display: "flex",
        flexDirection: "row"
    },
    barWidth0: {
        backgroundColor: "#d9d9d9",
        width: 8,
        height: 20,
        marginRight: 8
    },
    barWidth10: {
        backgroundColor: "#d9d9d9",
        width: 16,
        height: 20,
        marginRight: 8

    },
    barWidth20: {
        backgroundColor: "#d9d9d9",
        width: 24,
        height: 20,
        marginRight: 8
    },
    barWidth30: {
        backgroundColor: "#d9d9d9",
        width: 32,
        height: 20,
        marginRight: 8

    },
    barWidth40: {
        backgroundColor: "#d9d9d9",
        width: 40,
        height: 20,
        marginRight: 8

    },
    barWidth50: {
        backgroundColor: "#d9d9d9",
        width: 48,
        height: 20,
        marginRight: 8
    },
    barWidth60: {
        backgroundColor: "#d9d9d9",
        width: 56,
        height: 20,
        marginRight: 8
    },
    barWidth70: {
        backgroundColor: "#d9d9d9",
        width: 64,
        height: 20,
        marginRight: 8
    },
    barWidth80: {
        backgroundColor: "#d9d9d9",
        width: 72,
        height: 20,
        marginRight: 8
    },
    barWidth90: {
        backgroundColor: "#d9d9d9",
        width: 80,
        height: 20,
        marginRight: 8
    },
    barWidth100: {
        backgroundColor: "#d9d9d9",
        width: 88,
        height: 20,
        marginRight: 8
    },
})
const prop = {
    imageUrl: "./red-hat.jpg",
    productName: ["reddest", "barrette"],
    productDescription: "A fabulous red barret designed and made in France. Channel your inner french girl aesthetic with this hat",
    price: 30.99,
    discount: 5,
    dateAdded: new Date(),
    productRating: 4,
    reviews: [{
        name: "S",
        date: new Date(),
        rating: 5,
        review: "It's good"
    },
    {
        name: "Anonymous",
        date: new Date(),
        rating: 2,
        review: "It's garbage"
    },
    {
        name: "Tim",
        date: new Date(),
        rating: 4,
        review: "It's maroon, not red. Still pretty cute though."
    }
    ]
  }
  function conditionalNavigation() {
    navigation.navigate("Main");
  }
  return (
    <ScrollView bounces={true}>
        <View style={style.container}>
            <Image 
                source={require('../assets/red-hat.jpg')}
                style={style.mainImage}
                />
            <View style={style.right}>
            
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
                            <Text style={style.reviewCount}>5 reviews</Text>
                        </View>
                        <View style={style.prices}>
                            <Text style={style.grey}>{(prop.discount && prop.price).toLocaleString("us-EN", {style: "currency", currency: "USD"})}</Text>
                            <Text style={style.price}>{(prop.price - parseFloat(prop.price * (prop.discount / 100))).toLocaleString("us-EN", {style: "currency", currency: "USD"})}</Text>
                        </View>
                </View>
            </View>
        </View>
        <View style={style.imageSelector}>
            <Image 
                source={require('../assets/red-hat.jpg')}
                style={style.secondaryImage}
            />
            <Image 
                source={require('../assets/red-hat.jpg')}
                style={style.secondaryImage}
            />
            <Image 
                source={require('../assets/red-hat.jpg')}
                style={style.secondaryImage}
            />
            
        </View>
        <View style={style.text}>
            <Text style={style.p}>{prop.productDescription}</Text>
        </View>
        <View style={style.imageSelector }>
            <Pressable 
                style={style.signButton}
                onPress={() => setOrderQuantity(quantity => quantity == 0 ? 0 : quantity - 1)}
            >
                <Text style={style.buttonText}>-</Text>
            </Pressable>
            <TextInput 
                style={style.numberInput} 
                keyboardType="numeric"  
                value={orderQuantity.toString()}
                onChangeText={setOrderQuantity}
            />
            <Pressable 
                style={style.signButton}
                onPress={() => setOrderQuantity(quantity => quantity + 1)}
            >
                <Text style={style.buttonText}>+</Text>
            </Pressable>
            <Pressable 
                style={style.greenButton}
            >
                <Text style={style.p}>Put in cart</Text>
            </Pressable>
        </View>
        <View style={style.reviews}>
            <Text style={style.h3 }>Reviews</Text>
            <View style={style.starsNoPadding}>
                <Text style={style.fullStar}>★</Text>
                <Text style={style.fullStar}>★</Text>
                <Text style={style.fullStar}>★</Text>
                <Text style={style.fullStar}>★</Text>
                <Text style={style.fullStar}>★</Text>
                <Text style={style.reviewCount}>5 reviews</Text>
            </View>
            <Pressable style={style.starsNoPadding}>
                <View style={style.starsMinWidth}>
                    <Text style={style.fullStar}>★</Text>
                </View>
                <View style={style.starsNoPadding}>
                    <View style={style.barWidth0}></View>
                    <Text>0% </Text> 
                </View>
            </Pressable>
            <Pressable style={style.starsNoPadding}>
                <View style={style.starsMinWidth}>
                    <Text style={style.fullStar}>★</Text>
                    <Text style={style.fullStar}>★</Text>
                </View>
                <View style={style.starsNoPadding}>
                    <View style={style.barWidth100}></View>
                    <Text>100% </Text> 
                </View>
            </Pressable>
            <Pressable style={style.starsNoPadding}>
                <View style={style.starsMinWidth}>
                    <Text style={style.fullStar}>★</Text>
                    <Text style={style.fullStar}>★</Text>
                    <Text style={style.fullStar}>★</Text>
                </View>
                <View style={style.starsNoPadding}>
                    <View style={style.barWidth90}></View>
                    <Text>90% </Text> 
                </View>
            </Pressable>
            <Pressable style={style.starsNoPadding}>
                <View style={style.starsMinWidth}>
                    <Text style={style.fullStar}>★</Text>
                    <Text style={style.fullStar}>★</Text>
                    <Text style={style.fullStar}>★</Text>
                    <Text style={style.fullStar}>★</Text>
                </View>
                <View style={style.starsNoPadding}>
                    <View style={style.barWidth10}></View>
                    <Text>10% </Text> 
                </View>
            </Pressable>
            <Pressable style={style.starsNoPadding}>
                <View style={style.starsMinWidth}>
                    <Text style={style.fullStar}>★</Text>
                    <Text style={style.fullStar}>★</Text>
                    <Text style={style.fullStar}>★</Text>
                    <Text style={style.fullStar}>★</Text>
                    <Text style={style.fullStar}>★</Text>

                </View>
                <View style={style.starsNoPadding}>
                    <View style={style.barWidth50}></View>
                    <Text>50% </Text> 
                </View>
            </Pressable>
        </View>
        <View>
            {prop.reviews.map(r => <Review name={r.name} date={r.date} rating={r.rating} review={r.review} key={r.name + '-' + r.date.valueOf()}/>)}
        </View>
    </ScrollView>
  );



};


export default ProductDescription;
