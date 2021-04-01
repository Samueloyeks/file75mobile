
import React from 'react';
import { Input, Tooltip } from 'react-native-elements';
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { Colors } from '../../styles';


const UploadInput = ({
    rightIcon,
    uploaded = null,
    onPress,
    remove,
    placeholder,
    customStyle,
    required = false,
    ...rest
}) => (
        <TouchableOpacity onPress={onPress}>
            <View style={{ flexDirection: 'row',flexWrap:'wrap' }}>
                {
                    required ?
                        <View style={styles.uploadAsteriskContainer}>
                            <Text style={{ color: Colors.DANGER, fontWeight: 'bold' }}>*</Text>
                        </View>
                        : null
                }
                <View style={[styles.uploadInput, customStyle]}>
                    {uploaded ?
                        <View style={styles.uploadInput}>
                            <Text style={{ fontSize: 12 }}>Uploaded!</Text>
                            <View style={{ right: 10, position: 'absolute', marginTop: 15 }}>
                                <TouchableOpacity onPress={remove}>
                                    <Icon name='close' size={20} color={Colors.DANGER} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View style={styles.uploadInput}>
                            <Text style={{ color: '#A7A7A7', fontSize: 12 }}>{placeholder}</Text>
                            <View style={{ right: 10, position: 'absolute', marginTop: 15 }}>{rightIcon}</View>
                        </View>
                    }

                </View>
            </View>
        </TouchableOpacity>
    )


export default UploadInput