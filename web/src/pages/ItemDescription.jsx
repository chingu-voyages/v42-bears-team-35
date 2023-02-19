import { useState } from "react";
import { Image, Pressable, Text, TextInput, ScrollView, SafeAreaView, StyleSheet, View, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from '../constants/cartSlice'
import Navbar from "../components/Navbar";
import Review from "../components/Review"
import { useEffect } from "react";

export default ItemDescription = ({ navigation, route } ) => {
  const item = route.params
  const { width } = useWindowDimensions()

  const cart = useSelector(state => state.cart.value)
  const [orderQuantity, setOrderQuantity] = useState(1);
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    const numberInCart = cart.find(itemInCart => itemInCart.id === item.id )
    setOrderQuantity(numberInCart ? numberInCart.quantity : 1)
  }, [cart, item])
  
  const style = StyleSheet.create({
    dark: {
      backgroundColor: "#222020"
    },
    container: {
      width: "100%",
      padding: 20,
      display: "flex",
      flexDirection: "row",
      paddingBottom: 0
    },
    right: {
      display: "flex",
      flexDirection: "column",
      width:  "58%",
      padding: 0,
      marginLeft: "5%"
    },
    prices: {
      display: "flex",
      flexDirection: "column",
      color: "#fff"
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
          
    },
    rowBottom: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-end",
      width: "100%",
      marginTop: 12,
    },
    stars: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      height: 84,
      color: "#fff"

    },
    imageHeading: {
      display: "flex",
      flexDirection: "row",
    },
    mainImage: {
      width: width * .34,
      height: width * .34,
      borderRadius: 9,
    },
    smallRed: {
      color: "#f40",
      position: "absolute",
      top: -12,
      right: -16,
      padding: 4
    },
    h2: {
      fontSize: 32,
      margin: 0,
      color: "#fff"
    },
    grey: {
      fontSize: 20,
      color: "#c9c9c9",
      textDecorationColor: "#000",
      textDecorationLine: "line-through",
      alignItems: "flex-end",
    },
    price: {
      fontSize: 20,
      alignItems: "flex-end",
      padding: 0,
      color: "#fff"

    },
    fullStar: {
      color: "#F1C644",
    },
    reviewCount: {
      marginLeft: 12,
      color: "#fff"

    },
    imageSelector: {
      width: "100%",
      padding: 24,
      display: "flex",
      flexDirection: "row",
      paddingBottom: 12,
    },
    secondaryImage: {
      height: 52,
      width: 52,
      marginRight: 24,
      borderRadius: 9,
    },
    unselectedImage: {
      height: 52,
      width: 52,
      marginRight: 24,
      borderRadius: 9,
    },
    p: {
      fontSize: 20,
      color: "#fff"

    },
    text: {
      width: "100%",
      padding: 24,
      paddingTop: 12,
      paddingBottom: 12,
    },
    signButton: {
      backgroundColor: "#d9d9d9",
      padding: 20,
      paddingTop: 16,
      paddingBottom: 16,
      borderRadius: 9,
      marginRight: 8,
    },
    greenButton: {
      backgroundColor: "#57D491",
      padding: width * .075,
      paddingTop: 16,
      paddingBottom: 16,
      borderRadius: 9,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 20,
      fontWeight: "900",
    },
    numberInput: {
      fontSize: 20,
      borderRadius: 9,
      width: 56,
      marginRight: 8,
      textAlign: "center",
      backgroundColor: "#fff"

    },
    reviews: {
      width: "100%",
      padding: 24,
    },
    h3: {
      fontSize: 24,
      marginBottom: 8,
      color: "#fff"
    },
    starsNoPadding: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: 4,
    },
    starsMinWidth: {
      width: 84,
      display: "flex",
      flexDirection: "row",
    },
    barWidth0: {
      backgroundColor: "#d9d9d9",
      width: 8,
      height: 20,
      marginRight: 8,
    },
    barWidth10: {
      backgroundColor: "#d9d9d9",
      width: 16,
      height: 20,
      marginRight: 8,
    },
    barWidth20: {
      backgroundColor: "#d9d9d9",
      width: 24,
      height: 20,
      marginRight: 8,
    },
    barWidth30: {
      backgroundColor: "#d9d9d9",
      width: 32,
      height: 20,
      marginRight: 8,
    },
    barWidth40: {
      backgroundColor: "#d9d9d9",
      width: 40,
      height: 20,
      marginRight: 8,
    },
    barWidth50: {
      backgroundColor: "#d9d9d9",
      width: 48,
      height: 20,
      marginRight: 8,
    },
    barWidth60: {
      backgroundColor: "#d9d9d9",
      width: 56,
      height: 20,
      marginRight: 8,
    },
    barWidth70: {
      backgroundColor: "#d9d9d9",
      width: 64,
      height: 20,
      marginRight: 8,
    },
    barWidth80: {
      backgroundColor: "#d9d9d9",
      width: 72,
      height: 20,
      marginRight: 8,
    },
    barWidth90: {
      backgroundColor: "#d9d9d9",
      width: 80,
      height: 20,
      marginRight: 8,
    },
    barWidth100: {
      backgroundColor: "#d9d9d9",
      width: 88,
      height: 20,
      marginRight: 8,
    },
  });
  return (
    <SafeAreaView>
      <ScrollView bounces={true} style={style.dark}>
        <Navbar />
        <View style={style.container}>
            <Image 
                source={{uri: item.imageUrl}}
                style={style.mainImage}
                />
            <View style={style.right}>
                    <View style={style.row}>
                        <Text style={style.h2}>{item.productName.join(' ')}</Text>
                        <Text style={style.smallRed}>New</Text>
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
                            <Text style={style.grey}>{(item.discount && item.price).toLocaleString("us-EN", {style: "currency", currency: "USD"})}</Text>
                            <Text style={style.price}>{(item.price - parseFloat(item.price * (item.discount / 100))).toLocaleString("us-EN", {style: "currency", currency: "USD"})}</Text>
                        </View>
                </View>
            </View>
        </View>
        <View style={style.imageSelector}>
            
            
        </View>
        <View style={style.text}>
            <Text style={style.p}>{item.productDescription}</Text>
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
                onPress={() => update(dispatch, item, cart, orderQuantity)}
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
            {item.reviews.map(r => <Review name={r.name} date={r.date} rating={r.rating} review={r.review} key={item.productName.join('-') + '-' + r.name + '-' + r.date.valueOf()}/>)}
        </View>
    </ScrollView>
    </SafeAreaView>
  );
};

function update(dispatch, item, cart, orderQuantity) {
  const newItem = {...item}
  newItem.quantity = orderQuantity
  const newCart = cart.filter(cartItem => cartItem.id != newItem.id)      
  dispatch(updateCart([...newCart, newItem]))
}