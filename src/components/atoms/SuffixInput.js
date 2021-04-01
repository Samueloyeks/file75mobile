
import React, { useState } from 'react';
import { Input, Row, Col } from 'react-native-elements';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';



const SuffixInput = ({
    iconName,
    rightIconName,
    rightIconColor,
    rightIconFunction,
    iconColor,
    returnKeyType,
    keyboardType,
    name,
    placeholder,
    pickerPlaceholder,
    secureTextEntry = false,
    value,
    customStyle,
    multiline = false,
    numberOfLines,
    suffixes,
    suffix,
    updateSuffix,
    ...rest
}) => {
    // const [suffixValue, setSuffixValue] = useState(null);
    // const [items, setItems] = useState([
    //     { label: 'Limited', value: 'limited', },
    //     { label: 'LTD', value: 'ltd' },
    //     { label: 'PLC', value: 'plc' },
    //     { label: 'LTD/GTE', value: 'ltd/gte' },
    //     { label: 'ULTD or UNLIMITED', value: 'ultd' },
    // ]);
    // let controller;


    return (
        <View style={styles.suffixInputContainer}>
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
                containerStyle={[styles.suffixInput, customStyle]}
                autoCapitalize="words"
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                inputStyle={styles.inputStyle}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
            <View style={styles.suffixContainer}>

                <RNPickerSelect 
                    value={suffix}
                    onValueChange={(itemValue, itemIndex) => updateSuffix(itemValue)}
                    items={suffixes}
                    placeholder={{
                        label:pickerPlaceholder
                    }}
                    style={pickerSelectStyles}
                    
                />

            </View>

        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 9,
        backgroundColor: 'gray',
        fontFamily: 'Montserrat-Regular',
        height: 50,
        color:'black',
        padding:10
    },
    inputAndroid: {
        fontSize: 9,
        backgroundColor: 'gray',
        fontFamily: 'Montserrat-Regular',
        height: 50,
        color:'black',
        padding:10
    },
});

export default SuffixInput