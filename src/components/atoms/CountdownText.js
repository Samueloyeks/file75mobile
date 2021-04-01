import React, { Component } from 'react';
import { Text } from 'react-native';
import { convertToTimestamp } from '../../helpers/encode';
import styles from './styles';
import RNMomentCountDown from 'react-native-moment-countdown';
import moment from 'moment';


class CountDownText extends Component {
    render() {
        const { dateString } = this.props;
        const dateInFuture = new Date(dateString);

        return (
            <Text style={[styles.tasktime, styles.boldText]}> -Expires in <RNMomentCountDown
                targetFormatMask='DD'
                toDate={dateInFuture} /> day(s)
            </Text>
        );
    }
}

export default CountDownText;