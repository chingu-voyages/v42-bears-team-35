import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../constants";
import ItemCards from "../components/ItemCards";
import ItemDescription from "./ItemDescription";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Front = () => {
  // const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <>
      <SafeAreaView>
        <Text>This is gonna be the Header Bar</Text>
        <Text>
          This is a nested navigator. Add drawer navigators into Front.jsx
        </Text>
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
          component={ItemDescription}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default Front;
