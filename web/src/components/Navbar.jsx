import { useState } from "react";
import { StyleSheet, Text, TextInput, View, useWindowDimensions, Button } from "react-native";
import { UserSelector, useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../constants/searchSlice";

const Navbar = ({navigation}) => {
  const { height, width } = useWindowDimensions()
  const dispatch = useDispatch()

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

  const search = useSelector(state => state.searchTerm.value)
  function realtimeSearchDB(text) {
    
  }
  
  return ( 
    <View style={style.header}>
      <Button title="Menu" style={style.headerText} onPress={() => navigation.toggleDrawer()}/>
      <TextInput
          style={style.searchBar}
            onChangeText={text => dispatch(updateSearch(text))}
            value={search}
            secureTextEntry={false}
            placeholder="Search"

        />
        <Text style={style.headerText}>Cart</Text>
    </View>
  );
  
};



export default Navbar;
