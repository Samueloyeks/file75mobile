import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class SettingsScreen extends Component {
    render() {
        return (
            <View>
                <Text>Settings</Text>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(SettingsScreen);