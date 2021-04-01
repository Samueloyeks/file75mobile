import { createStackNavigator } from 'react-navigation-stack';
import { Text } from 'react-native';
import React from 'react';


import LoginScreen from '../views/login';
import SignupScreen from '../views/signup';
import forgotPasswordScreen from '../views/forgotPassword';

import { Colors } from '../styles'

const AuthNavigatorConfig = {
  initialRouteName: 'Login',
  header: null,
  // headerMode: 'none',
};

const RouteConfigs = {
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  ForgotPassword: {
    screen: forgotPasswordScreen,
    navigationOptions: () => {
      return {
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: Colors.PRIMARY,
        headerTitle: () => <Text></Text>
      }
    },
  }
};


const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;