import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Custom } from '../../styles';
import styles from './styles'


// svg 
import Whatsapp from '../../assets/svg/Whatsapp.svg';
import Mail from '../../assets/svg/Mail.svg';
import Phone from '../../assets/svg/Phone.svg';


const ContactBlock = ({}) => (
    <View style={styles.contactBlockContainer}>
        <View style={styles.contactItem}>
            <Whatsapp />
            <Text style={styles.contactText}>09012345678</Text>
        </View>

        <View style={[styles.contactItem,styles.mailBlock]}>
            <Mail />
            <Text style={styles.contactText}>mail@assetandequity.com</Text>

        </View>

        <View style={styles.contactItem}>
            <Phone />
            <View style={{marginVertical:10}}>
            <Text style={styles.phoneText}>01 454 0063,</Text>
            <Text style={styles.phoneText}>08099995777</Text>
            </View>

        </View>
    </View>
);


export default ContactBlock;