import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import React, { Component, PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../styles';




const CustomRadioButton = ({
    radioProps,
    formHorizontal,
    initial,
    updateSelected,
    hideLabel
}) => (
        <View>
            <RadioForm
                radio_props={radioProps}
                initial={initial}
                onPress={(value) => updateSelected(value)}
                formHorizontal={formHorizontal}
                buttonColor={Colors.PRIMARY}
                selectedButtonColor={Colors.PRIMARY}
                labelStyle={{ marginRight: 20, display: hideLabel ? 'none' : 'flex' }}
            />
        </View>
    )


export default CustomRadioButton;