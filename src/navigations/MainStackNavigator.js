import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeStack from './menu/HomeStack'
import AccountStack from './menu/AccountStack'
// import TasksStack from './menu/TasksStack'
import TaskTabNavigator from './TaskTabNavigator'
import SettingsStack from './menu/SettingsStack'
import ContactStack from './menu/ContactStack'
import HelpStack from './menu/HelpStack'
import AboutStack from './menu/AboutStack'
import ViewPDFScreen from '../views/viewPDF'
import ViewArticleScreen from '../views/viewArticle'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ReservationDetailsScreen from '../views/reservationDetails';
import BusRegDetailsScreen from '../views/busRegDetails';
import CompanyRegDetailsScreen from '../views/companyRegDetails';




//components
import CustomHeader from '../components/atoms/CustomHeader';


const MainStackNavigatorConfig = {
  initialRouteName: 'Home'
};



const RouteConfigs = {
  Home: {
    screen: HomeStack,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    },
  },
  Account: {
    screen: AccountStack,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    },
  },
  Tasks: {
    screen: TaskTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      headerShown: false,
    },
  },
  Contact: {
    screen: ContactStack,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    },
  },
  About: {
    screen: AboutStack,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    },
  },
  Help: {
    screen: HelpStack,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    },
  },
  ViewPDF: {
    screen: ViewPDFScreen,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    },
  },
  viewArticle: {
    screen: ViewArticleScreen,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    },
  },
  ReservationDetails: {
    screen: ReservationDetailsScreen,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    }
  },
  BusRegDetails: {
    screen: BusRegDetailsScreen,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    }
  },
  CompanyRegDetails: {
    screen: CompanyRegDetailsScreen,
    navigationOptions: ({ navigation }) => {
      return {
        header: () => <CustomHeader navigation={navigation} />
      }
    }
  },
};



const MainStackNavigator = createStackNavigator(RouteConfigs, MainStackNavigatorConfig);


export default MainStackNavigator;
