import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import Main from "./components/Main";

export default function App() {
  const Screen = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Screen.Navigator>
        <Screen.Screen name="Login" component={Login} />
        <Screen.Screen name="Main" component={Main} />
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
