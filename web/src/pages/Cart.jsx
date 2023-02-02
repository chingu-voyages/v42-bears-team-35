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
    }
  });


  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(removeItem(cart.id))
    console.log(cart.id)
  }


  return (
    <SafeAreaView>
      <Navbar />
      <ScrollView bounces={true} style={style.container}>
       {cart.map(item => <CartItem 
       imageUrl={item.imageUrl} name={item.productName} price={item.price} discount={item.discount} quantity={item.quantity} key={"cartItem-" + item.id} id={item.id} handleDelete={handleDelete}/>)}
    </ScrollView>
    </SafeAreaView>
  );
};


