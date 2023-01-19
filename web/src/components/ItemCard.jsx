//(figma: front page)

import { ImageBackground, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/ItemCard";
import { ROUTES } from "../constants";

export default itemCard = ({ item }) => {
    const { url, title } = item;
    
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
          style={styles.imageBackground}
        >
          <Text style={styles.itemText}>{title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };