import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Spacing, Typography, Custom, Colors } from '../../styles';
import styles from './styles';

 
// svg
import RedDot from '../../assets/svg/RedDot.svg';
import YellowDot from '../../assets/svg/YellowDot.svg';
import GrayDot from '../../assets/svg/GrayDot.svg';
import NewTag from '../../assets/svg/NewTag.svg';
import ArrowRight from '../../assets/svg/ArrowRight.svg';


// components 
import DateText from '../atoms/DateText';
import CountdownText from '../atoms/CountdownText'; 
 
const BusRegTaskCard = ({ status, task, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={[styles.taskCardContainer, Custom.p20, Custom.mv10]}>
            <View style={[Custom.row]}>
                <Text style={[Custom.boldText, Custom.mb10]}>{task.category.category}</Text>
                {
                    !task.viewed
                        ?
                        <NewTag style={{ marginLeft: 'auto' }} />
                        :
                        null
                }
            </View>
            {
                (status === 'approved')
                    ?
                    <Text style={[styles.taskDescText]}>
                        <YellowDot />  {task.companyName1}
                    </Text>
                    :
                    <View>
                        <Text style={styles.taskDescText}>
                            {status === 'pending' ? <GrayDot /> : <RedDot />}  {task.companyName1}
                        </Text>

                        <Text style={styles.taskDescText}>
                            {status === 'pending' ? <GrayDot /> : <RedDot />}   {task.companyName2}
                        </Text>
                    </View>
            }

            <View style={[Custom.row, Custom.mt20]}>
                <DateText dateString={task.submitted} />
                {/* {
                    (status === 'pending')
                        ?
                        <CountdownText
                            dateString={task.expires}
                        />
                        :
                        null
                } */}
                <ArrowRight style={{ marginLeft: 'auto' }} />
            </View>
        </View>
    </TouchableOpacity>
)


export default BusRegTaskCard;