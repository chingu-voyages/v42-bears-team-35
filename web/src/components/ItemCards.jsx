import React from "react";
import { Pressable, Text } from "react-native";
import { ROUTES } from "../constants";

const ItemCards = ({ navigation }) => {
  const onGoBack = () => {
    navigation.goBack();
  };


  return (
    <>
      <Text>ItemCards</Text>
      <Pressable onPressOut={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </Pressable>
      <Pressable onPressOut={() => navigation.navigate(ROUTES.ITEM_DESCRIPTION)}>
        <Text>Go to Item Descript</Text>
      </Pressable>
      <Pressable onPressOut={() => navigation.navigate(ROUTES.REGISTER)}>
        <Text>Create account</Text>
      </Pressable>
    </>
  );
};

export default ItemCards;
