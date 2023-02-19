import { View, Image, StyleSheet, ImageBase } from "react-native"



export default Grid = () => {
    //fetch 9 random items
    return (
        <View >
            {products.map(item => <Image source={{ uri: item.imageUrl}} key={item.productName + '-' + item.id}/>)}
        </View>
    )
}