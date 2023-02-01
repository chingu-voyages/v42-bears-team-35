import { useState } from "react";
import { Image, Pressable, Text, TextInput, ScrollView, StyleSheet, View, SafeAreaView, useWindowDimensions } from "react-native";
import Review from "../components/Review"
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

const prop = {
  image: "../assets/red-hat.jpg",
  productName: ["reddest", "barrette"],
  productDescription:
    "A fabulous red barret designed and made in France. Channel your inner french girl aesthetic with this hat",
  price: 30.99,
  discount: 5,
  dateAdded: new Date(),
  productRating: 4,
  reviews: [
    {
      name: "S",
      date: new Date(),
      rating: 5,
      review: "It's good",
    },
    {
      name: "Anonymous",
      date: new Date(),
      rating: 2,
      review: "It's garbage",
    },
    {
      name: "Tim",
      date: new Date(),
      rating: 4,
      review: "It's maroon, not red. Still pretty cute though.",
    },
  ],
};

export default ItemDescription = ({ navigation }) => {
  const {height, width } = useWindowDimensions()

  const [orderQuantity, setOrderQuantity] = useState(1);
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
      <ScrollView bounces={true} style={style.container}>
       <CartItem image={prop.image} name={prop.productName} price={prop.price} discount={prop.discount} quantity={5} />
    </ScrollView>
    </SafeAreaView>
  );
};


