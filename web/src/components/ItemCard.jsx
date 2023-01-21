//(figma: front page)

import { ImageBackground, Text, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { styles } from "../styles/ItemCard";

export default ItemCard = () => {
  const { url, title } = {url: "rrr", title: "hohoho"}  //item from props
  //const { height, width } = useSelector(state => state.size.value)
  return (
    <TouchableOpacity
      style={{
        height: "90%",
        ...styles.renderItemContainer,
      }}
    >
      <ImageBackground
        source={url}
        imageStyle={{ resizeMode: "cover" }}
      //style={{ height: height, width: width}}
      >
        <Text style={styles.itemText}>{title}</Text>
        <Text>HELLO????</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};