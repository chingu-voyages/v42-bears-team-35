// makes ItemCard swipable 

import { FlatList, SafeAreaView, ImageBackground, Text, useWindowDimensions, View, Pressable, Button } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../styles/ItemCard";
import { ROUTES } from "../constants";
import axios from "axios";
import {getItems} from "../constants/axios"
import Navbar from "../components/Navbar";

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
  const products = useSelector(state => state.product.value)

  const ItemCard = ({ item }) => {
    const { url, productName } = item
    const name = productName.join(' ')
    return (
      
        <View style={{height: height - 60, flex: 1}}>
          <Pressable onPress={() => navigation.navigate(ROUTES.ITEM_DESCRIPTION, item)}>
            <ImageBackground
              source={url}
              imageStyle={{height: height - 80}}
            //style={{ height: height, width: width}}
            >
              <View style={{width: width, height: height * .5, }}><Text style={{position: "absolute", left: 15, top: height * .45}}>{name}</Text>
              </View>
            </ImageBackground>
        </Pressable>
        </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <Button 
        title={"fetch"}
        onPress={() => {
          callItems()
        }}
      />
      <FlatList
          data={products}
          decelerationRate="fast"
          keyExtractor={item => item.id.toString()}
          onViewableItemsChanged={this.onViewableItemsChanged}
          removeClippedSubviews={false}
          renderItem={ItemCard}
          showsVerticalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={height - 60}
          viewabilityConfig={{
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 100,
          }}
        />
    </SafeAreaView>
  );
};

