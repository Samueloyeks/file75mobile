import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Header } from 'react-native';
import Logo from '../../assets/svg/Logo.svg';
import Menu from '../../assets/svg/Menu.svg';
import styles from './styles'

const CustomHeader = ({ navigation }) => (
    <View style={styles.header}>
        <View style={styles.headerLeft}>
            <TouchableOpacity onPress={navigation.toggleDrawer}>
                <Menu />
            </TouchableOpacity>
        </View>
        <View style={styles.headerRight} >
            <Logo />
        </View>
    </View>
);


export default CustomHeader;