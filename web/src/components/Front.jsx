import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../constants";
import ItemCards from "./ItemCards";
import ItemDescript from "./ItemDescript";
import Navbar from "./Navbar";

const Front = () => {
  const Drawer = createDrawerNavigator();

  return (
    <>
      <SafeAreaView>
        <Navbar />
      </SafeAreaView>
        <Drawer.Navigator
              screenOptions={{
              headerShown: false,
              drawerActiveBackgroundColor: "#346633",
              drawerActiveTintColor: "white",
              drawerLabelStyle: {
                marginLeft: 0,
              },
            }}
        >
        <Drawer.Screen
          name={ROUTES.ITEM_CARDS}
          component={ItemCards}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name={ROUTES.ITEM_DESCRIPTION}
          component={ItemDescript}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default Front;
