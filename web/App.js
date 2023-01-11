import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import Main from "./components/Main";
import ProductDescription from "./components/ProductDescription";
export default function App() {
  const Screen = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Screen.Navigator>
        <Screen.Screen name="Login" component={Login} />
        <Screen.Screen name="Main" component={Main} />
        <Screen.Screen name="Product Description" component={ProductDescription} />
      </Screen.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
