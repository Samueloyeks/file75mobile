import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import AboutScreen from '../../views/about';


const AboutStack = createStackNavigator({
  About: {
    screen: AboutScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  initialRouteName: 'About',
});


export default AboutStack;
