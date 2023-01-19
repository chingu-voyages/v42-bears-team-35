import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ROUTES } from "../constants";
import Front from "./Front";
import Login from "./Login";
import Signup1 from "../pages/register/Signup1";
import SearchResults from "./SearchResults";

const Stack = createStackNavigator();

const MainNavigator = () => {
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
          name={ROUTES.REGISTER}
          component={Signup1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.SEARCH_RESULTS}
          component={SearchResults}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;



