import { Text } from "react-native"
import { useState } from "react"
import Signup1 from './Signup1'
export default Register = () => {
    const [progress, setProgress] = useState(5)
    return (
        <>
            <Text>Hello</Text>
            <Signup1 />
        </>
    )
}

