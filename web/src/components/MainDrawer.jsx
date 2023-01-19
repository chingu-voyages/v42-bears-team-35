
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ROUTES } from "../constants";
import Front from "./Front";
import Login from "../pages/Login";

const Drawer = createDrawerNavigator();

export default MainDrawer = () => {
  return (
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
          name={ROUTES.FRONT}
          component={Front}
          options={{ headerShown: false }}
        />
    </Drawer.Navigator>
  );
};
