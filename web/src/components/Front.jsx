import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../constants";
import Slides from "../pages/Slides";
import ItemDescription from "../pages/ItemDescription";
import Navbar from "./Navbar";

const Stack = createStackNavigator();

export default Front = () => {
  return (
      <SafeAreaView>
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

