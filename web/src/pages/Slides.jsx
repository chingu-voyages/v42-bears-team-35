// makes ItemCard swipable 

import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import ItemCard from '../components/ItemCard'
import { styles } from "../styles/ItemCard";

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

export default Slides = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MOCK_DATA}
        renderItem={ItemCard}
        pagingEnabled
        keyExtractor={(item) => 'item-' + item.id}
        decelerationRate="fast"
      />
    </SafeAreaView>
  );
};

