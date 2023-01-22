//(figma: front page)

import { ImageBackground, Pressable, Text, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { useSelector } from "react-redux";
import { styles } from "../styles/ItemCard";

const ItemCard = () => {
  const { url, title } = {url: "rrr", title: "hohoho"}  //item from props
  //const { height, width } = useSelector(state => state.size.value)
  const [widthType, setWidthType] = useState('auto');
  const [heightType, setHeightType] = useState('auto');

  return (
    <Pressable
      style={{
        flex: 1,
        height: height,
        borderColor: 'black',
        borderWidth: 2
      }}
    >
      <View style={{height: height, display: "flex",}}>
      <ImageBackground
        source={url}
        style={{ height: "100%"}}
      //style={{ height: height, width: width}}
      >
        
      </ImageBackground>
      <Text>HELLO</Text>
      </View>
    </Pressable>
  );
};

export default ItemCard