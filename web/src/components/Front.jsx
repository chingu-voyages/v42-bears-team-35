import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../constants";
import ItemCards from "./ItemCards";
import Navbar from "./Navbar";
import ItemDescription from "../pages/ItemDescription";

const Front = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  return (
    <>
  
      <SafeAreaView>
        <Navbar  />
      </SafeAreaView>
        <Stack.Navigator
        >
        <Stack.Screen
          name={ROUTES.ITEM_CARDS}
          component={ItemCards}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.ITEM_DESCRIPTION}
          component={ItemDescription}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Front;
