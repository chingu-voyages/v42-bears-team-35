import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  flexDiv: {
    alignItems: "center",
    justifyContent: "center",
    width: 392,
  },
  bold: {
    fontSize: 20,
    fontWeight: "800",
    margin: 16,
  },
  input: {
    height: 48,
    margin: 16,
    borderWidth: 1,
    padding: 10,
    width: 360,
    borderRadius: 6,
    borderWidth: 2,
    fontSize: 20,
  },
  label: {
    alignSelf: "flex-start",
    margin: 16,
    fontSize: 20,
    marginBottom: 4,
  },
  h1: {
    fontSize: 20,
    margin: 16,
    marginTop: 32,
    fontWeight: "800",
    alignSelf: "flex-start",
  },
  greenButton: {
    backgroundColor: "#57D491",
    color: "#000",
    width: 220,
    height: 48,
    fontSize: 20,
    textAlign: "center",
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 6,
    textAlign: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  greenButtonText: {
    fontSize: 20,
    textAlign: "center",
  },
  bottom: {
    alignSelf: "center",
    margin: 100,
    fontSize: 20,
    fontWeight: "600",
    color: "#787",
  },
});
