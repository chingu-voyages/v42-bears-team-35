import React from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ROUTES } from "../constants";
import { Dimensions } from "react-native";

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
];

const renderItem = ({ item, _ }) => {
  const { url, title } = item;
  return (
    <View
      style={{
        flex: 1,
        height: Dimensions.get("window").height - HEADER_HEIGHT,
      }}
    >
      <ImageBackground
        source={url}
        imageStyle={{ resizeMode: "cover" }}
        style={styles.imageBackground}
      >
        <Text style={styles.itemText}>{title}</Text>
      </ImageBackground>
    </View>
  );
};

const ItemCards = ({ navigation }) => {
  const onGoBack = () => {
    navigation.goBack();
  };

  const onGoToItemDescript = () => {
    navigation.navigate(ROUTES.ITEM_DESCRIPTION);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_DATA}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.index}
        decelerationRate="fast"
      />
    </View>
  );
};

export default ItemCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  itemText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
