import React from "react";
import { Pressable, Text } from "react-native";

const ItemDescript = ({ navigation }) => {
  const onGoBack = () => {
    navigation.goBack();
  const [orderQuantity, setOrderQuantity] = useState(1);
  
  const { height, width } = useWindowDimensions();

  const style = StyleSheet.create({
    container: {
      width: width,
      padding: 20,
      display: "flex",
      flexDirection: "row",
      paddingBottom: 0,
    },
    right: {
      display: "flex",
      flexDirection: "column",
      width: width * 0.6 - 40,
      paddingTop: 0,
      paddingLeft: 0,
    },
    prices: {
      display: "flex",
      flexDirection: "column",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-start",
      width: width * 0.6 - 40,
    },
    rowBottom: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-end",
      width: width * 0.6 - 60,
      marginTop: 12,
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
      flexDirection: "row",
    },
    mainImage: {
      width: width * 0.4,
      height: width * 0.4,
      borderRadius: 9,
    },
    smallRed: {
      color: "#f40",
      alignSelf: "flex-start",
      marginLeft: 12,
    },
    h2: {
      fontSize: 32,
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
    },
    fullStar: {
      color: "#F1C644",
    },
    reviewCount: {
      marginLeft: 12,
    },
    imageSelector: {
      width: width,
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
    },
    text: {
      width: width,
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
      width: "40%",
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
      borderWidth: 2,
      borderColor: "#000",
      borderRadius: 9,
      width: 56,
      marginRight: 8,
      textAlign: "center",
    },
    reviews: {
      width: width,
      padding: 24,
    },
    h3: {
      fontSize: 24,
      marginBottom: 8,
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
  const prop = {
    imageUrl: "./red-hat.jpg",
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

  return (
    <>
      <Text>ItemDescript</Text>
      <Pressable onPressOut={() => onGoBack()}>
        <Text>Go Back</Text>
      </Pressable>
    </>
  );
};

export default ItemDescript;
