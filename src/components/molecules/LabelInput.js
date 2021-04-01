
import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import CustomInput from '../atoms/CustomInput'
import CustomLabel from '../atoms/CustomLabel'
import { Colors } from '../../styles'



const LabelInput = ({
    returnKeyType,
    keyboardType,
    name, 
    placeholder,
    secureTextEntry = false,
    value,
    labelText,
    labelStyle,
    editable,
    customStyle,
    ...rest
}) => (
        <View>
            <CustomLabel
                style={labelStyle}
                text={labelText}
            />
            <CustomInput
                {...rest}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                value={value}
                returnKeyType={returnKeyType}
                name={name}
                editable={editable}
                customStyle={customStyle}
            />
        </View>
    )



export default LabelInput;