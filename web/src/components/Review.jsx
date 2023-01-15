import { ScrollView, StyleSheet, Text, View } from "react-native";

const Review = ({ name, review, rating, date }) => {
  const stars = <></>;
  const paragraphs = review.split("/n");
  const style = StyleSheet.create({
    container: {
      padding: 24,
    },
    name: {
      backgroundColor: "#d9d9d9",
      padding: 16,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: 20,
      marginRight: 8,
      borderRadius: 6,
    },
    review: {
      fontSize: 20,
      marginBottom: 12,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
  });

  return (
    <ScrollView style={style.container}>
      <View style={style.row}>
        <Text style={style.name}>{name}</Text>
      </View>
      {paragraphs.map((p) => (
        <Text style={style.review}>{p}</Text>
      ))}
    </ScrollView>
  );
};

export default Review;
