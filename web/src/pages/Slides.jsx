// makes ItemCard swipable 

import { FlatList, SafeAreaView, ImageBackground, Text, useWindowDimensions, View, Pressable, Button } from "react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../styles/ItemCard";
import { ROUTES } from "../constants";
import axios from "axios";

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

const callItems = () => {
  axios 
  .get (`https://v42-bears-team-35-production.up.railway.app/items`)
  .then (response => {
    console.log('Response:', response?.data);
  })
  .catch (error => {
    console.log('Error:', error) 
  })
}

export default Slides = ({ navigation }) => {
  const { height, width } = useWindowDimensions()
  const ItemCard = ({ item }) => {
    const { url, title } = item
    return (
      
        <View style={{height: height, borderWidth: 2, borderColor: '#832', flex: 1}}>
          <Pressable>
            <ImageBackground
              source={url}
              imageStyle={{height: height }}
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
      <Button 
        title={"fetch"}
        onPress={() => {
          callItems()
        }}
      />
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

