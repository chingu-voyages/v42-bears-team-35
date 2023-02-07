import { useState } from "react";
import { Image, Pressable, Text, TextInput, ScrollView, SafeAreaView, StyleSheet, View, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from '../constants/cartSlice'
import Navbar from "../components/Navbar";
import Review from "../components/Review"
import { useEffect } from "react";
import itemDescription  from "../styles/itemDescription"

export default ItemDescription = ({ navigation, route } ) => {
  const item = route.params && route.params.item || route.params
  const { width } = useWindowDimensions()

  const cart = useSelector(state => state.cart.value)
  const [orderQuantity, setOrderQuantity] = useState(1);
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    const numberInCart = cart.find(itemInCart => itemInCart.id === item.id )
    setOrderQuantity(numberInCart ? numberInCart.quantity : 1)
  }, [cart, item])
  

  //to set image size correctly, need width here
  return (
    <SafeAreaView>
      <ScrollView bounces={true} style={itemDescription.dark}>
        <Navbar />
        <View style={itemDescription.container}>
            <Image 
                source={{uri: item.imageUrl}}
                style={{...itemDescription.mainImage, height: width * .34}}
                />
            <View style={itemDescription.right}>
                    <View style={itemDescription.row}>
                        <Text style={itemDescription.h2}>{item.productName.join(' ')}</Text>
                        <Text style={itemDescription.smallRed}>New</Text>
                    </View>
                    <View style={itemDescription.rowBottom}>
                        <View style={itemDescription.stars}>
                            <Text style={itemDescription.fullStar}>★</Text>
                            <Text style={itemDescription.fullStar}>★</Text>
                            <Text style={itemDescription.fullStar}>★</Text>
                            <Text style={itemDescription.reviewCount}>5 reviews</Text>
                        </View>
                        <View style={itemDescription.prices}>
                            <Text style={itemDescription.grey}>{(item.discount && item.price).toLocaleString("us-EN", {style: "currency", currency: "USD"})}</Text>
                            <Text style={itemDescription.price}>{(item.price - parseFloat(item.price * (item.discount / 100))).toLocaleString("us-EN", {style: "currency", currency: "USD"})}</Text>
                        </View>
                </View>
            </View>
        </View>
        <View style={itemDescription.imageSelector}>
            
            
        </View>
        <View style={itemDescription.text}>
            <Text style={itemDescription.p}>{item.productDescription}</Text>
        </View>
        <View style={itemDescription.imageSelector }>
            <Pressable 
                style={itemDescription.signButton}
                onPress={() => setOrderQuantity(quantity => quantity == 0 ? 0 : quantity - 1)}
            >
                <Text style={itemDescription.buttonText}>-</Text>
            </Pressable>
            <TextInput 
                style={itemDescription.numberInput} 
                keyboardType="numeric"  
                value={orderQuantity.toString()}
                onChangeText={setOrderQuantity}
            />
            <Pressable 
                style={itemDescription.signButton}
                onPress={() => setOrderQuantity(quantity => quantity + 1)}
            >
                <Text style={itemDescription.buttonText}>+</Text>
            </Pressable>
            <Pressable 
                style={itemDescription.greenButton}
                onPress={() => update(dispatch, item, cart, orderQuantity)}
            >
                <Text style={itemDescription.p}>Put in cart</Text>
            </Pressable>
        </View>
        <View style={itemDescription.reviews}>
            <Text style={itemDescription.h3 }>Reviews</Text>
            <View style={itemDescription.starsNoPadding}>
                <Text style={itemDescription.fullStar}>★</Text>
                <Text style={itemDescription.fullStar}>★</Text>
                <Text style={itemDescription.fullStar}>★</Text>
                <Text style={itemDescription.fullStar}>★</Text>
                <Text style={itemDescription.fullStar}>★</Text>
                <Text style={itemDescription.reviewCount}>5 reviews</Text>
            </View>
            <Pressable style={itemDescription.starsNoPadding}>
                <View style={itemDescription.starsMinWidth}>
                    <Text style={itemDescription.fullStar}>★</Text>
                </View>
                <View style={itemDescription.starsNoPadding}>
                    <View style={itemDescription.barWidth0}></View>
                    <Text style={itemDescription.reviewCount}>0% </Text> 
                </View>
            </Pressable>
            <Pressable style={itemDescription.starsNoPadding}>
                <View style={itemDescription.starsMinWidth}>
                    <Text style={itemDescription.fullStar}>★</Text>
                    <Text style={itemDescription.fullStar}>★</Text>
                </View>
                <View style={itemDescription.starsNoPadding}>
                    <View style={itemDescription.barWidth100}></View>
                    <Text style={itemDescription.reviewCount}>100% </Text> 
                </View>
            </Pressable>
            <Pressable style={itemDescription.starsNoPadding}>
                <View style={itemDescription.starsMinWidth}>
                    <Text style={itemDescription.fullStar}>★</Text>
                    <Text style={itemDescription.fullStar}>★</Text>
                    <Text style={itemDescription.fullStar}>★</Text>
                </View>
                <View style={itemDescription.starsNoPadding}>
                    <View style={itemDescription.barWidth90}></View>
                    <Text style={itemDescription.reviewCount}>90% </Text> 
                </View>
            </Pressable>
            <Pressable style={itemDescription.starsNoPadding}>
                <View style={itemDescription.starsMinWidth}>
                    <Text style={itemDescription.fullStar}>★</Text>
                    <Text style={itemDescription.fullStar}>★</Text>
                    <Text style={itemDescription.fullStar}>★</Text>
                    <Text style={itemDescription.fullStar}>★</Text>
                </View>
                <View style={itemDescription.starsNoPadding}>
                    <View style={itemDescription.barWidth10}></View>
                    <Text style={itemDescription.reviewCount}>10% </Text> 
                </View>
            </Pressable>
            <Pressable style={itemDescription.starsNoPadding}>
                <View style={itemDescription.starsMinWidth}>
                    <Text style={itemDescription.fullStar}>★</Text>
                    <Text style={itemDescription.fullStar}>★</Text>
                    <Text style={itemDescription.fullStar}>★</Text>
                    <Text style={itemDescription.fullStar}>★</Text>
                    <Text style={itemDescription.fullStar}>★</Text>

                </View>
                <View style={itemDescription.starsNoPadding}>
                    <View style={itemDescription.barWidth50}></View>
                    <Text style={itemDescription.reviewCount}>50% </Text> 
                </View>
            </Pressable>
        </View>
        <View>
            {item.reviews.map(r => <Review name={r.name} date={r.date} rating={r.rating} review={r.review} key={item.productName.join('-') + '-' + r.name + '-' + r.date.valueOf()}/>)}
        </View>
    </ScrollView>
    </SafeAreaView>
  );
};

function update(dispatch, item, cart, orderQuantity) {
  const newItem = {...item}
  newItem.quantity = orderQuantity
  const newCart = cart.filter(cartItem => cartItem.id != newItem.id)      
  dispatch(updateCart([...newCart, newItem]))
}