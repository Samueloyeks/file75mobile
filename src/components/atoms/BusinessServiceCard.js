import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Spacing, Typography, Custom, Colors } from '../../styles';
import styles from './styles';


const BusinessServiceCard = ({ service, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.serviceCardContainer, Custom.p40, Custom.mv10]}>
    <Text style={[Custom.boldText, Colors.SECONDARY]}>Click here for</Text>
      <Text style={{fontSize:25,color:'#FFCC00',fontFamily:'Montserrat-Bold'}}>{service.category}</Text>
    </View>
  </TouchableOpacity>
)


export default BusinessServiceCard;