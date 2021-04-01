
import React, { useState } from 'react';
import { Input, Row, Col } from 'react-native-elements';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';



const PrefixInput = ({
    iconName,
    rightIconName,
    rightIconColor,
    rightIconFunction,
    iconColor,
    returnKeyType,
    keyboardType,
    name,
    placeholder,
    secureTextEntry = false,
    value,
    customStyle,
    multiline = false,
    numberOfLines,
    prefix,
    ...rest
}) => {
    const [suffixValue, setSuffixValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Limited', value: 'limited', },
        { label: 'LTD', value: 'ltd' },
        { label: 'PLC', value: 'plc' },
        { label: 'LTD/GTE', value: 'ltd/gte' },
        { label: 'ULTD', value: 'ultd' },
        { label: 'UNLIMITED', value: 'unlimited' },
    ]);
    let controller;

    return (
        <View style={styles.prefixInputContainer}>
            <View style={styles.prefixContainer}>
                <Text style={styles.prefixText}>{prefix.label}</Text>
            </View>
            <Input
                {...rest}
                leftIcon={<Icon name={iconName} size={7} color={iconColor} />}
                leftIconContainerStyle={styles.inputIconStyle}
                rightIcon={<Icon name={rightIconName} size={7} color={rightIconColor} />}
                rightIconContainerStyle={styles.inputIconStyle}
                placeholderTextColor='#A7A7A7'
                name={name}
                placeholder={placeholder}
                inputContainerStyle={styles.inputContainer}
                containerStyle={[styles.prefixInput, customStyle]}
                autoCapitalize="words"
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                inputStyle={styles.inputStyle}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
        </View>
    )
}


export default PrefixInput