import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ContactScreen from '../../views/contact';


const ContactStack = createStackNavigator({
  Contact: {
    screen: ContactScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  initialRouteName: 'Contact',
});


export default ContactStack;
