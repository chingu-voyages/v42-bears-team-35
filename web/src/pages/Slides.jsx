// makes ItemCard swipable 

import { FlatList, SafeAreaView, ImageBackground, Text, useWindowDimensions, View, Pressable, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"; import { LinearGradient } from "expo-linear-gradient";
import Navbar from "../components/Navbar";
import { styles } from "../styles/ItemCard";
import { ROUTES } from "../constants";
import slides from "../styles/slides";
import { getItems } from "../constants/axios"


export default Slides = ({ navigation }) => {
  const [visitedBefore, setVisitedBefore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { height, width } = useWindowDimensions()
  const products = useSelector(state => state.product.value)


  useEffect(() => {

    //retrieveData()
  }, [])


  const ItemCard = ({ item, index }) => {
    const { imageUrl, productName } = item
    const name = productName.join(" ")
    return (
      <View style={{ height: height - 60, flex: 1, backgroundColor: "#222020" }}>
        <Pressable onPress={() => navigation.navigate(ROUTES.ITEM_DESCRIPTION, item)}>
          <ImageBackground
            source={{ uri: imageUrl }}
            imageStyle={{ height: height - 80 }}
          //style={{ height: height, width: width}}
          >
            <View style={{ width: width, height: height * .5, }}>
              <LinearGradient
                colors={["rgba(0,0,0,.6)", "transparent"]}
                style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}
              >
                <Text style={{ fontSize: 36, color: "white", marginTop: 36 }}>{name}</Text>
              </LinearGradient>
            </View>
          </ImageBackground>
          {index == 0 && <Text style={slides.scroll}>Scroll</Text>}
        </Pressable>
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <Navbar />

      <FlatList
        data={products}
        decelerationRate="fast"
        keyExtractor={item => item.id.toString()}
        onViewableItemsChanged={this.onViewableItemsChanged}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={height - 60}

        renderItem={({ item, index }) => <ItemCard item={item} index={index} />}

      />
    </SafeAreaView>
  );

}

