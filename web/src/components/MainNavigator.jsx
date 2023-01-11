import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../constants";
import Front from "./Front";
import HeaderBar from "./HeaderBar";
import Login from "./Login";

const Stack = createStackNavigator();
// we are just having issues with the navigation

const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.FRONT}
          component={Front}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
