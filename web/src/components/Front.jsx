import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../constants";
import ItemCards from "./ItemCards";
import ItemDescript from "./ItemDescript";

const Front = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <SafeAreaView>
        <Text>This is gonna be the Header Bar</Text>
        <Text>
          This is a nested navigator. Add drawer navigators into Front.jsx
        </Text>
      </SafeAreaView>
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTES.ITEM_CARDS}
          component={ItemCards}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.ITEM_DESCRIPTION}
          component={ItemDescript}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Front;
