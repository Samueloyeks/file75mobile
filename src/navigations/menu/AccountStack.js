import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import AccountScreen from '../../views/account';


const AccountStack = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  initialRouteName: 'Account',
});


export default AccountStack;
