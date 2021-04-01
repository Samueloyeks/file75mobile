import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Custom } from '../../styles';
import styles from './styles'


// svg 
import Facebook from '../../assets/svg/Facebook.svg';
import Google from '../../assets/svg/Google.svg';


const SocialAuthBlock = ({ handleFacebookSubmit, handleGoogleSubmit, }) => (
    <View style={[Custom.mt10]}>
        <Text style={[styles.textCenter]}>or connect with:</Text>
        <View style={[styles.socialBlock]}>
            <TouchableOpacity onPress={handleFacebookSubmit}>
                <Facebook />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGoogleSubmit}>
                <Google />
            </TouchableOpacity>
        </View>
    </View>
);


export default SocialAuthBlock;