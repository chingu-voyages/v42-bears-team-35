import { Image, Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native";
import { useState } from "react";
import Navbar from "./Navbar";
import Grid from "./Grid";
import { URL } from "@env";

const style = StyleSheet.create({

  grey: {
    backgroundColor: "#222020",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10%",
    marginBottom: "6%",
    color: "#fff"
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: "6%",
    color: "#fff"
  }
})

export default SearchResults = ({ navigation, route }) => {
  const { results, searchTerm } = route.params
  const [fetched, setFetched] = useState([])



  if (results.length == 0) {
        fetch(URL + "/products")
            .then(response => response.json())
            .then(data => setFetched([...data.data]))
            .catch(error => console.log(error))

            return (
              <SafeAreaView style={style.bg}>
                    <View style={style.grey}>

                <Navbar />
                <Text style={style.title}>No results for : {searchTerm.toLowerCase()}</Text>     
                <Text style={style.text}>Why not one of these?</Text>
                <Grid products={fetched} />
                </View>
                </SafeAreaView>
            )
  }

  return (
    <SafeAreaView style={style.bg}>
    <View style={style.grey}>
    <Navbar />
      <Text style={style.title}>Results for : {searchTerm}</Text>
       <Grid products={results} />
       </View>
    </SafeAreaView>

  )

}