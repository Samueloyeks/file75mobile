import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HelpScreen from '../../views/help';


const HelpStack = createStackNavigator({
  Help: {
    screen: HelpScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  initialRouteName: 'Help',
});


export default HelpStack;
