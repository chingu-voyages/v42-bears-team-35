import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { ROUTES } from "../constants";
import Front from "./Front";
import Login from "./Login";

const MainNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator 
            initialRouteName={ROUTES.LOGIN}
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
          name={ROUTES.LOGIN}
          component={Login}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name={ROUTES.FRONT}
          component={Front}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default MainNavigator;
