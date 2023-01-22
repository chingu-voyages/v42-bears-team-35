// makes ItemCard swipable 

import { FlatList, SafeAreaView, ImageBackground, Text, useWindowDimensions, View, Pressable } from "react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../styles/ItemCard";
import { ROUTES } from "../constants";

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
  const { height, width } = useWindowDimensions()
  const ItemCard = ({ item }) => {
    const { url, title } = item
    return (
      
        <View style={{height: height, borderWidth: 2, borderColor: '#832', flex: 1}}>
          <Pressable onPress={() => navigation.navigate(ROUTES.ITEM_DESCRIPTION)}>
            <ImageBackground
              source={url}
              imageStyle={{height: height - 80}}
            //style={{ height: height, width: width}}
            >
              <View style={{width: width, height: height * .5, }}><Text style={{position: "absolute", left: 15, top: height * .45}}>{title}</Text>
    </View>
            </ImageBackground>
        </Pressable>
        </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={MOCK_DATA}
          decelerationRate="fast"
          keyExtractor={item => item.id.toString()}
          onViewableItemsChanged={this.onViewableItemsChanged}
          removeClippedSubviews={false}
          renderItem={ItemCard}
          showsVerticalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={height + 5}
          viewabilityConfig={{
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 100,
          }}
        />
    </SafeAreaView>
  );
};

