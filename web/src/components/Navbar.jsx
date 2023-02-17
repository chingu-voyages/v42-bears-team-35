import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from "../constants";
import { URL } from "@env";




export default Navbar = () => {

  const navigation = useNavigation()
  const [searchTerm, setSearchTerm] = useState('')

  function realtimeSearchDB() {
    if (searchTerm.length >= 3) {
    fetch(URL + '/products?name=' + searchTerm)
      .then(response => response.json())
      .then(data => navigation.navigate("SearchResults", {searchTerm, results: [...data.data] }))
      .catch(error => console.log(error))
    }
  }

  const style = StyleSheet.create({
    header: {
      width: "100%",
      backgroundColor: "#000",
      padding: 12,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
    },
    headerText: {
      color: "#fff",
      fontSize: 20
    },
    searchBar: {
      backgroundColor: "#fff",
      borderRadius: 6,
      width: "65%",
      height: 36,
      fontSize: 20,
      padding: 4
    },
    menuContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    menu: {
      marginLeft: 12,
      height: 24,
      width: 24,
      marginRight: 12
    },
    
  })

  return (
    <View style={style.header}>
      <Pressable style={style.menuContainer} onPress={() => navigation.toggleDrawer()}>
        <Image
          source={require('../assets/menu.png')}
          style={style.menu}
        />
      </Pressable>
      <TextInput
        style={style.searchBar}
        onChangeText={setSearchTerm}
        onEndEditing={() => realtimeSearchDB()}
        value={searchTerm}
        secureTextEntry={false}
        placeholder="Search"
      />
      <Pressable 
        style={style.menuContainer} 
        onPress={() => navigation.navigate(ROUTES.CART)}
        >
        <Image
          source={require('../assets/shopping-cart.png')}
          style={style.menu}
        />
      </Pressable>
    </View>
  );

};

