import { useState} from "react";
import { StyleSheet, Text, TextInput, View, useWindowDimensions, Button } from "react-native";

const Navbar = ({navigation}) => {
  const { height, width } = useWindowDimensions()

  const style = StyleSheet.create({
    header: {
      width: width,
      backgroundColor: "#000",
      padding: 12,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center"
    },
    headerText: {
      color: "#fff",
      fontSize: 20
    },
    searchBar: {
      backgroundColor: "#fff",
      borderRadius: 6,
      width: width * .66,
      height: 36,
      fontSize: 20,
      padding: 4
    }
  })

  const [searchTerm, setSearch] = useState('')
  function realtimeSearchDB() {
    //call db for every letter??
  }
  return ( 
    <View style={style.header}>
      <Button title="Menu" style={style.headerText} onPress={() => navigation.toggleDrawer()}/>
      <TextInput
          style={style.searchBar}
          onChangeText={() => realtimeSearchDB()}
          value={searchTerm}
          secureTextEntry={true}
          placeholder=""
        />
        <Text style={style.headerText}>Cart</Text>
    </View>
  );
  
};



export default Navbar;
