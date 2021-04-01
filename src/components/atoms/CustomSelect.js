
import React, { useState } from "react";
import styles from './styles';
import { View, StyleSheet, Platform, Text } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { Custom } from "../../styles";
import { Colors } from "../../styles";



const CustomSelect = ({
    options,
    selected,
    updateSelected,
    customStyle,
    placeholder,
    showText = false,
    required = false,
    ...rest
}) => {
    const [selectedValue, setSelectedValue] = useState("java");
    return (

        <View style={{flex:1,flexDirection:'row'}}>
            {
                required ?
                    <View style={ styles.selectAsteriskContainer}>
                        <Text style={{color: Colors.DANGER,fontWeight:'bold' }}>*</Text>
                    </View>
                    : null
            }
            <View style={{ flex: required ? 0.9 : 1 }}>
                <RNPickerSelect
                    value={selected}
                    fixAndroidTouchableBug={true}
                    placeholder={placeholder}
                    useNativeAndroidPickerStyle={true}
                    style={pickerSelectStyles}
                    onValueChange={(itemValue, itemIndex) => updateSelected(itemValue)}
                    items={options}

                />
                {showText ? <Text>{selected}</Text> : null}
            </View>
        </View>

    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 12,
        paddingVertical: 12,
        paddingHorizontal: 10,
        //   borderWidth: 1,
        //   borderColor: 'gray',
        //   borderRadius: 4,
        color: 'black',
        // paddingLeft: 35,
        backgroundColor: '#FFF',
        fontFamily: 'Montserrat-Regular',
        marginBottom: 15,
        height: 50
    },
    inputAndroid: {
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        //   borderWidth: 0.5,
        //   borderColor: 'purple',
        //   borderRadius: 8,
        color: 'black',
        // paddingLeft: 35,
        backgroundColor: '#FFF',
        fontFamily: 'Montserrat-Regular',
        marginBottom: 15,
        height: 50
    },
});

export default CustomSelect