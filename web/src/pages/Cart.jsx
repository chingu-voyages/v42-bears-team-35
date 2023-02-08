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
      height: height,
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
        id={item.id}
        imageUrl={item.imageUrl} 
        name={item.tags} 
        price={item.price} 
        discount={item.discount} 
        quantity={item.quantity} 
        key={"cartItem-" + item.id} 
        />)}
    </ScrollView>
    </SafeAreaView>
  );
};


