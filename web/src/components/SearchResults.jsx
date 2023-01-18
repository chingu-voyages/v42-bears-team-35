import { Text } from "react-native";
import { UserSelector, useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native"; 
import Navbar from "./Navbar";
export default SearchResults = () => {
    const searchResults = useSelector(state => state.searchResults.value)

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
      </SafeAreaView>
            
    )

}