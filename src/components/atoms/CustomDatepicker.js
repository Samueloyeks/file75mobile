
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { View, Text } from 'react-native';
import { Colors, Custom } from "../../styles";



const CustomDatePicker = ({
    label,
    date,
    updateDOB,
    required = false,
    ...rest
}) => {

    return (

        <View>
            <Text>
                {
                    required ?
                        <Text style={{ color: Colors.DANGER, fontWeight: 'bold', marginRight: 10 }}>    *   </Text>
                        : null
                }
                <Text style={{ marginLeft: 20 }}>{label}</Text>
            </Text>
            <DatePicker
                date={date}
                // style={{ width: '100%' }}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                style={{ margin: 10 }}
                onDateChange={updateDOB}
            />
        </View>
    )
}


export default CustomDatePicker