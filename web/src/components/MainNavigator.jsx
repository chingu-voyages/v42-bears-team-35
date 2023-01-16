import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ROUTES } from "../constants";
import Front from "./Front";
import Login from "./Login";
import Register from "../pages/register/Register";

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
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
