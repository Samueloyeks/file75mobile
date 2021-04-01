import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Spacing, Typography, Custom, Colors } from '../../styles';
import styles from './styles';


const ServiceCard = ({ service, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.serviceCardContainer, Custom.p40, Custom.mv10, Custom.textCenter]}>
      <Text style={[Custom.boldText, Custom.uppercase, Custom.textCenter]}>{service.category}</Text>
      <Text style={styles.serviceDescText}>{service.description}</Text>
    </View>
  </TouchableOpacity>
)


export default ServiceCard;