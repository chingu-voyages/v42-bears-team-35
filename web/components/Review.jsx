import { StyleSheet, Text } from "react-native"

const Review = ({name, review, rating, date}) => {

    const paragraphs = review.split('/n')
    const style = StyleSheet.create({
        name: {
            backgroundColor: "#d9d9d9",
            padding: 8,
            fontSize: 20
        },
        review: {
            fontSize: 20,
            marginBottom: 12
        }
    })

    return (
        <>
            <Text style={style.name}>{name}</Text>
            {paragraphs.map(p => <Text style={style.review}>{p}</Text>)}
        </>
    )
}

export default Review