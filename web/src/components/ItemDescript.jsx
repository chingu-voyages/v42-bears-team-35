import React from "react";
import { Pressable, Text } from "react-native";

const ItemDescript = ({ navigation }) => {
  const onGoBack = () => {
    navigation.goBack();
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
