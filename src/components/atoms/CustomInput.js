
import React from 'react';
import { Input, Tooltip } from 'react-native-elements';
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';


const CustomInput = ({
  onChangeText,
  icon,
  iconName,
  rightIcon,
  rightIconName,
  rightIconColor,
  rightIconFunction,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  secureTextEntry = false,
  value,
  customStyle,
  multiline = false,
  numberOfLines,
  editable, 
  ...rest
}) => (
    <Input
      {...rest}
      leftIcon={icon ? icon : <Icon name={iconName} size={7} color={iconColor} />}
      leftIconContainerStyle={styles.inputIconStyle}
      rightIcon={rightIcon}
      // <Icon name={rightIconName} size={7} color={rightIconColor} />
      rightIconContainerStyle={styles.inputIconStyle}
      placeholderTextColor='#A7A7A7'
      name={name}
      placeholder={placeholder}
      inputContainerStyle={styles.inputContainer}
      containerStyle={[styles.input, customStyle]}
      autoCapitalize="none"
      value={value}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      inputStyle={styles.inputStyle}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onChangeText={onChangeText}
      editable={editable}
    />
  )


export default CustomInput