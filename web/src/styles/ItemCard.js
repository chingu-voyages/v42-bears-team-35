import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%"
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover"

  },
  itemText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  renderItemContainer: {
    backgroundColor: "#FFF",
    flex: 1,
  },
});
