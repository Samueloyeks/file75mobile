import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SettingsScreen from '../../views/settings';


const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  initialRouteName: 'Settings',
});


export default SettingsStack;
