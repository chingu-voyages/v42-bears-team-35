import { useState } from "react";
import { Image, Pressable, Text, TextInput, ScrollView, StyleSheet, View, SafeAreaView, useWindowDimensions } from "react-native";
import Review from "../components/Review"
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";



export default ItemDescription = ({ navigation }) => {
  const {height } = useWindowDimensions()
  const cart = useSelector(state => state.cart.value)
  const style = StyleSheet.create({
    container: {
      backgroundColor: "#222020",
      width: "100%",
      height: height,
      display: "flex",
      padding: 20,
    }
  });
  return (
    <SafeAreaView>
      <Navbar />
      <ScrollView bounces={true} style={style.container}>
       {cart.map(item => <CartItem image={item.image} name={item.productName} price={item.price} discount={item.discount} quantity={item.quantity} key={"cartItem-" + item.id} />)}
    </ScrollView>
    </SafeAreaView>
  );
};


