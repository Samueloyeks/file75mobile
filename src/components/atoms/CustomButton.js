import React from 'react';
import { Button } from 'react-native-elements';
import { Colors } from '../../styles';


const CustomButton = ({ title, buttonType, buttonColor, buttonStyle,customStyle, ...rest }) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    titleStyle={{ color: buttonColor, fontSize: 14, fontFamily: 'Montserrat-Regular' }}
    buttonStyle={[buttonStyle,customStyle]}
    loadingProps={{ color: Colors.SECONDARY }}
  />
)


export default CustomButton