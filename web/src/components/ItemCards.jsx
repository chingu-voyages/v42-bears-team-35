import React from "react";
import { Pressable, Text } from "react-native";
import { ROUTES } from "../constants";

const ItemCards = ({ navigation }) => {
  const onGoBack = () => {
    navigation.goBack();
  };

  const onGoToItemDescript = () => {
    navigation.navigate(ROUTES.ITEM_DESCRIPTION);
  };

  return (
    <>
      <Text>ItemCards</Text>
      <Pressable onPressOut={() => onGoBack()}>
        <Text>Go Back</Text>
      </Pressable>
      <Pressable onPressOut={() => onGoToItemDescript()}>
        <Text>Go to Item Descript</Text>
      </Pressable>
    </>
  );
};

export default ItemCards;
