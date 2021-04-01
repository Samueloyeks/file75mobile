import React, { PureComponent } from 'react';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';

const CustomConfirmDialog = ({ visible, onTouchOutside, positiveTouched, negativeTouched,content }) => <ConfirmDialog
    title="Confirm"
    visible={visible}
    onTouchOutside={onTouchOutside}
    positiveButton={{
        title: "Ok",
        onPress: positiveTouched
    }}
    negativeButton={{
        title: "Cancel",
        onPress: negativeTouched
    }}
>
    <View>
        {content}
    </View>
</ConfirmDialog>

export { CustomConfirmDialog };