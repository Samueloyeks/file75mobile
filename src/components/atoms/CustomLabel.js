
import React from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'



const CustomLabel = ({
    style,
    text,
    ...rest
}) => (
        <Text
            style={style}
        >
            {text}
        </Text>
    )


export default CustomLabel