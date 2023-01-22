import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ROUTES } from "../constants";
import Front from "./Front";
import Login from "../pages/Login";
import SearchResults from "./SearchResults";
import ItemDescription from "../pages/ItemDescription";

const Stack = createStackNavigator();

export default MainNavigator = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={ROUTES.FRONT}>
        
        <Stack.Screen
          name={ROUTES.FRONT}
          component={Front}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.SEARCH_RESULTS}
          component={SearchResults}
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



