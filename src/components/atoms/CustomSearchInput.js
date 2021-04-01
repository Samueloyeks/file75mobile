import React from 'react';
import { SearchBar } from 'react-native-elements';
import styles from './styles';



const CustomSearchInput = ({
    returnKeyType,
    keyboardType,
    name,
    placeholder,
    secureTextEntry = false,
    value,
    onChangeText,
    ...rest
}) => (
        <SearchBar
            lightTheme
            platform={'default'}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            containerStyle={styles.searchContainerStyle}
            inputContainerStyle={styles.searchInputContainerStyle}
            inputStyle={styles.searchInputStyle}
        />
    )



export default CustomSearchInput