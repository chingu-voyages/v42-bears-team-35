import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ROUTES } from "../constants";

const image = { uri: "https://reactjs.org/logo-og.png" };

const ItemCards = ({ navigation }) => {
  const onGoBack = () => {
    navigation.goBack();
  };

  const onGoToItemDescript = () => {
    navigation.navigate(ROUTES.ITEM_DESCRIPTION);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Pressable onPressOut={onGoBack}>
          <Text style={styles.text}>Go Back</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default ItemCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    // height: "100%",

    // border: "1px solid red",
  },
  image: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
