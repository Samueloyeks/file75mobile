
import React, { Component, useState } from 'react';
import DatePicker from 'react-native-date-picker'
import { View, Text, ScrollView } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './styles';
import { Colors } from "../../styles";


const CustomSearchableDropdown = ({
    placeholder,
    selected,
    onItemSelect,
    options,
    required = false,
    ...rest
}) => (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{ marginBottom: 12 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {
                    required ?
                        <View style={styles.dropdownAsteriskContainer}>
                            <Text style={{ color: Colors.DANGER, fontWeight: 'bold' }}>*</Text>
                        </View>
                        : null
                }
                <View style={{ flex: 1 }}>
                    <SearchableDropdown
                        // onTextChange={(text) => console.log(text)}
                        //On text change listner on the searchable input
                        onItemSelect={(item) => onItemSelect(item)}
                        //onItemSelect called after the selection from the dropdown
                        // containerStyle={{ padding: 5 }}
                        //suggestion container style
                        textInputStyle={{
                            padding: 12,
                            backgroundColor: '#827F7F',
                            width: '100%',
                            height: 50,
                            fontSize: 12,
                            fontFamily: 'Montserrat-Regular',
                            paddingLeft: 30,
                            // placeholderTextColor:'#EFEFEF'   
                        }}
                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#FFF'
                        }}
                        itemTextStyle={{
                            color: '#222',
                        }}
                        itemsContainerStyle={{
                            width: '110%'
                        }}
                        textInputProps={
                            {
                                placeholder: placeholder,
                                underlineColorAndroid: "transparent",
                            }
                        }
                        items={options}
                    />
                </View>
            </View>
        </ScrollView>
    )

export default CustomSearchableDropdown


