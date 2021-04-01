import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from '../../assets/svg/Logo.svg';
import Menu from '../../assets/svg/Menu.svg';
import styles from './styles'

const CustomFooter = ({ navigation }) => (
  <View style={[styles.textCenter, styles.bottom]}>
    <Text style={[styles.smallText, styles.textCenter]}>Copyright © 2020 Asset and Equity Group. All Rights Reserved.</Text>
  </View>
);


export default CustomFooter;