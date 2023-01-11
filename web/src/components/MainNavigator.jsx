import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../constants";
import Front from "./Front";
import Login from "./Login";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <SafeAreaView>
      <Text>Hello</Text>
      <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
        <Stack.Screen name={ROUTES.LOGIN} component={Login} />
        <Stack.Screen name={ROUTES.FRONT} component={Front} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MainNavigator;
