import React from 'react';
import { View } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet';



const CustomActionSheet = ({ customRef, title, options, cancelIndex, desctructiveIndex, handlePress }) => (

    <View>
        <ActionSheet
            ref={customRef}
            title={title}
            options={options}
            cancelButtonIndex={cancelIndex}
            destructiveButtonIndex={desctructiveIndex}
            onPress={handlePress}
        />
    </View>
)

export default CustomActionSheet;