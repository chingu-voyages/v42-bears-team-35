import { Text, StyleSheet, View } from "react-native"

const style = StyleSheet.create({
    review: {
        display: "flex",
        padding: 24
    },
    row: {  
        display: "flex",
        flexDirection: "row",
        marginBottom: 8
    },  
    name: {
        padding: 4,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: "white",
        fontSize: 20
    },
    space: {
        margin: 4,
        marginLeft: 20,
        fontSize: 20
    },
    date: {
        margin: 4,
        fontWeight: "600",
        fontSize: 20
    },
    stars: {
        display: "flex",
        flexDirection: "row",
        marginTop: 12
    },
    star: {
        color: "#F1C644",
    },
    padding: {
        marginTop: 12,
        padding: 4
    }
})
//                 <Text style={style.date}> {Intl.DateTimeFormat('en-US').format(new Date(date))}</Text>

export default Review = ({ name, date, rating, review }) => {

    let stars = ""
    while ( rating > 0) {
        stars += "★"
        rating--
    }
    

    return (
        <View style={style.review }>
            <View style={style.row}>
                <Text style={style.name}>{name}</Text>
                <Text style={style.space}>on</Text>
                <Text>{date}</Text>
            </View>
            <View style={style.stars}>
                <Text style={style.star}>{stars}</Text>
            </View>
            <View style={style.padding}>
                <Text>{review}</Text>
            </View>
        </View>
    )
}