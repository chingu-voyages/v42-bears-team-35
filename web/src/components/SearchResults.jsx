import { Image, Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native";
import Navbar from "./Navbar";
import Grid from "./Grid";
import searchStyle from "../styles/searchStyle";

const style = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10%",
    marginBottom: "6%"
  }
})

export default SearchResults = ({ navigation, route }) => {
  const { searchResult, searchTerm } = route.params
  //if (searchTerm.length == 0) navigation.navigate(ROUTES.FRONT)

  if (searchResult.length == 0) return (
    <SafeAreaView>
      <Navbar />
      <Text style={style.title}>No results for : {searchTerm.toLowerCase()}</Text>
      </SafeAreaView>
  )
  return (
    <SafeAreaView>
      <Navbar />
      <Text style={style.title}>Results for : {searchTerm}</Text>
       <Grid products={searchResult} />
    </SafeAreaView>

  )

}