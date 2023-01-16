import { Pressable, Text } from "react-native"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../../constants";

import Navbar from "../../components/Navbar";
import Signup1 from './Signup1'
export default Register = ({ navigation }) => {
    const [progress, setProgress] = useState(5)
    return (
        <SafeAreaView>
            <Navbar />

            <Pressable onPressOut={() => navigation.navigate(ROUTES.LOGIN)}><Text>already registered? login</Text></Pressable>
            <Signup1 navigation={navigation}/>

        </SafeAreaView>
    )
}

