import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/components/MainNavigator";
import { store } from "./src/constants/store";
import { Provider } from 'react-redux';

export default function App() {
  return (
    <NavigationContainer >
      <Provider store={store}>
          <MainNavigator />
      </Provider>
    </NavigationContainer>
  );
}
