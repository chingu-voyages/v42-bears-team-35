import { useState } from "react";
import { Image, Pressable, Text, TextInput, ScrollView, StyleSheet, View, SafeAreaView, useWindowDimensions } from "react-native";
import Review from "../components/Review"
import Navbar from "../components/Navbar";
import { updateCart } from '../constants/cartSlice';
import { removeItem } from '../constants/cartSlice';
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";


export default ItemDescription = ({ navigation }) => {
  const {height} = useWindowDimensions()
  const cart = useSelector(state => state.cart.value)
  const style = StyleSheet.create({
    container: {
      backgroundColor: "#222020",
      width: "100%",
      minHeight: "100%",
      height: height - 120,
      display: "flex",
      padding: 20,
    },
    text: {
      color: "white",
      fontSize: 20,
      marginBottom: 16
    }
  });

  const dispatch = useDispatch()
  
  return (
    <SafeAreaView>
      <Navbar />
      <ScrollView bounces={true} style={style.container}>
        <Text style={style.text}>{cart.length == 0 ? "No" : cart.length} items in cart</Text>
       {cart.map(item => <CartItem 
        item={item}
        key={"cartItem-" + item.id} 
        />)}

        <Pressable onPress={() => navigation.navigate("Payment")} style={{backgroundColor: "#57D491", padding: 20, borderRadius: 10, marginTop: 20, marginBottom: 20, alignItems: "center"}} >
          <Text style={{color: "black", fontSize: 20}}>Checkout</Text>
        </Pressable>
    </ScrollView>
    </SafeAreaView>
  );
};


