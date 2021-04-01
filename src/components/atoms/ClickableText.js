
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'


const ClickableText = ({
    text,
    textStyle,
    action,
    ...rest
}) => (
        <View>
            <TouchableOpacity onPress={action}>
                <Text style={textStyle}>{text}</Text>
            </TouchableOpacity>
        </View>
    )



export default ClickableText;