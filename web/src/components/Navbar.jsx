import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, useWindowDimensions, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchResults } from "../constants/searchSlice";
import { ROUTES } from "../constants";
import { useNavigation } from '@react-navigation/native';


const Navbar = () => {
  const navigation = useNavigation()
  const [searchTerm, setSearchTerm] = useState('')

  const { height, width } = useWindowDimensions()
  const dispatch = useDispatch()
  const searchResults = useSelector(state => state.searchResults.value)


  useEffect(() => {
     realtimeSearchDB()
  }, [searchTerm])


  function realtimeSearchDB() {
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
    // query DB and update dispatch with it
    const db = MOCK_DATA.filter((item) => item.title.includes(searchTerm))

    dispatch(updateSearchResults(db))
    navigation.navigate(ROUTES.SEARCH_RESULTS)

  }

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

  
  
  return ( 
    <View style={style.header}>
      <Button title="Menu" style={style.headerText} onPress={() => navigation.toggleDrawer()}/>
      <TextInput
          style={style.searchBar}
            onChangeText={setSearchTerm}
            value={searchTerm}
            secureTextEntry={false}
            placeholder="Search"

        />
        <Text style={style.headerText}>Cart</Text>
    </View>
  );
  
};



export default Navbar;
