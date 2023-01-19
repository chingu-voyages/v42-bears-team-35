import React from "react";
import { FlatList, ImageBackground, SafeAreaView, Text } from "react-native";
import { ROUTES } from "../constants";
import { Dimensions } from "react-native";
import { styles } from "./ItemCardsStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

const HEADER_HEIGHT = 80;
const MOCK_DATA = [
  {
    id: 1,
    url: { uri: "https://img.makeupalley.com/3/9/7/8/3630182.jpg" },
    title: "Lancome",
  },
  {
    id: 2,
    url: { uri: "https://img.makeupalley.com/3/9/7/8/3630182.jpg" },
    title: "Lancome2",
  },
  {
    id: 3,
    url: { uri: "https://img.makeupalley.com/3/9/7/8/3630182.jpg" },
    title: "Lancome3",
  },
];

const renderItem = ({ item, _ }) => {
  const { url, title } = item;
  return (
    <TouchableOpacity
      style={{
        height: Dimensions.get("window").height - HEADER_HEIGHT, // this doesn't work refactored into stylesheet
        ...styles.renderItemContainer,
      }}
    >
      <ImageBackground
        source={url}
        imageStyle={{ resizeMode: "cover" }}
        style={styles.imageBackground}
      >
        <Text style={styles.itemText}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const ItemCards = ({ navigation }) => {
  const onGoBack = () => {
    navigation.goBack();
  };


  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={MOCK_DATA}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.index}
        decelerationRate="fast"
      />
    </SafeAreaView>
  );
};

export default ItemCards;
