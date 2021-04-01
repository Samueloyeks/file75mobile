import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

const ErrorMessage = ({ errorValue }) => (
  <View>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
)


export default ErrorMessage;