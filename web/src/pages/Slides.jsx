// makes ItemCard swipable 

import { FlatList, SafeAreaView, ImageBackground, Text, useWindowDimensions, View, Pressable, RefreshControl, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "../components/Navbar";
import { styles } from "../styles/ItemCard";
import { ROUTES } from "../constants";
import slides from "../styles/slides";
import { URL } from "@env";


export default Slides = ({ navigation }) => {
  const [visitedBefore, setVisitedBefore] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([])
  const { height, width } = useWindowDimensions()
  let reduxProducts = useSelector(state => state.product.value)

  



  useEffect(() => {
    getItems()
    //retrieveData()
  }, [])

  function getItems() {
    fetch(URL + '/products')
      .then(response => response.json())
      .then(data => {
        setProducts([...data.data, ...reduxProducts])
      })
      .catch(err => console.log(err))
  }

  const ItemCard = ({ item, index }) => {
    const { imageUrl, tags } = item
    const name = tags ? tags.join(" ") : "No tags"
    return (
      <View style={{...slides.div, height: height - 60}}>
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
          {index == 0 && <Text style={slides.scroll}>↓</Text>}
        </Pressable>
      </View>
    )
  }

  if (products.length > 0) {
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
  return <SafeAreaView style={slides.loading}>
    <Text style={slides.loadingText}>Loading</Text>
    <ActivityIndicator size="large" color="#57D491" />
  </SafeAreaView>
}

