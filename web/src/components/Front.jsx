import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../constants/searchSlice";
import { updateSize } from "../constants/sizeReducer";
import { ROUTES } from "../constants";
import Navbar from "./Navbar";
import Slides from "../pages/Slides"

const Stack = createStackNavigator();

export default Front = () => {
  const dispatch = useDispatch()
  const { height, width } = useWindowDimensions()

  dispatch(updateSize({ height, width }))
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 36 }}>
      <Navbar />
      <Stack.Navigator>
        <Stack.Screen
            name={ROUTES.SLIDES}
            component={Slides}
            options={{ headerShown: false }}
          />
        <Stack.Screen
          name={ROUTES.ITEM_DESCRIPTION}
          component={ItemDescription}
          options={{ headerShown: false }}
        />
        
        
      </Stack.Navigator>
    </SafeAreaView>
  );
};

