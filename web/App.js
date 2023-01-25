import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/components/MainNavigator";
import MainDrawer from "./src/components/MainDrawer";
import { store } from "./src/constants/store";
import { Provider } from 'react-redux';
import Front from "./src/components/Front";
import MainDrawer from "./src/components/MainDrawer";



export default function App() {
  return (
    <NavigationContainer >
      <Provider store={store}>
          <MainDrawer />
      </Provider>
    </NavigationContainer>
  );
}
