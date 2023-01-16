import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ROUTES } from "../constants";
import Front from "./Front";
import ItemCards from "./ItemCards";
import Login from "./Login";

import {
  createDrawerNavigator,
  DrawerComponent,
} from '@react-navigation/drawer';

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
      options={{ drawerItemStyle: { height: 0, }}}
      >
        <Drawer.Screen
          name={ROUTES.LOGIN}
          component={Login}
          options={{
            headerShown: false,
             drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
          name={ROUTES.ITEM_CARDS}
          component={ItemCards}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default MainNavigator;
