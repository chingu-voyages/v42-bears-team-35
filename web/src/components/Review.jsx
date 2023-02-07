import { Text, StyleSheet, View } from "react-native"

const style = StyleSheet.create({
    review: {
        display: "flex",
        padding: 24,
        marginBottom: 12
    },
    row: {  
        display: "flex",
        flexDirection: "row",
        marginBottom: 8
    },  
    name: {
        padding: 4,
        paddingLeft: 0,
        paddingRight: 12,
        color: "#57D491",
        fontSize: 20,
        borderRadius: 30,
        fontWeight: "600"
        
    },
    space: {
        margin: 4,
        marginLeft: 0,
        fontSize: 20,
        color: "#fff"
    },
    date: {
        margin: 4,
        fontWeight: "600",
        fontSize: 20,
        color: "#fff"
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
    },
    text: {
        color: "#fff"
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
                <Text style={style.date}>{date}</Text>
            </View>
            <View style={style.stars}>
                <Text style={style.star}>{stars}</Text>
            </View>
            <View style={style.padding}>
                <Text style={style.text}>{review}</Text>
            </View>
        </View>
    )
}