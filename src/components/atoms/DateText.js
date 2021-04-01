import React, { Component } from 'react';
import { Text } from 'react-native';
import { formatDate } from '../../helpers/encode';
import styles from './styles';


class DateText extends Component {

    state = {
        date: ''
    }

    async componentDidMount() {
        const { dateString } = this.props;
        const date = await formatDate(dateString);
        this.setState({ date })
    }

    render() {
        const { date } = this.state;
        const { customStyle } = this.props

        return (
            <Text style={[styles.tasktime, customStyle]}>{date}</Text>
        );
    }
}

export default DateText;