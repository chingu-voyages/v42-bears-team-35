import { Pressable, Text } from "react-native";
import { UserSelector, useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native"; 
import Navbar from "./Navbar";
import { ROUTES } from "../constants";
export default SearchResults = ({ navigation}) => {
    const [searchResults, searchTerm] = useSelector(state => state.searchResults.value)

    if (searchTerm.length == 0) navigation.navigate(ROUTES.FRONT)

    if (searchResults.length == 0) return (
        <SafeAreaView>
        <Navbar />
        <Text>Sorry, we couldn't find that</Text>
      </SafeAreaView>
    )
   
    return (
        <SafeAreaView>
        <Navbar />
        <Text>We got results</Text>
            <Text>{searchResults[0].title}</Text>
            <Pressable onPress={() => navigation.navigate(ROUTES.SLIDES)}>
              <Text>Go to item</Text>
            </Pressable>

      </SafeAreaView>
            
    )

}