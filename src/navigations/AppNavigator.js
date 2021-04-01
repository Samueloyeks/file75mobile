import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideMenu from '../components/Sidemenu';
import MainStackNavigator from './MainStackNavigator';


const AppNavigatorConfig = {
  contentComponent: SideMenu,
  drawerWidth: Dimensions.get('window').width - 220,
};

const RouteConfigs = {
  Item1: MainStackNavigator
};


const AppNavigator = createDrawerNavigator(RouteConfigs, AppNavigatorConfig);

export default AppNavigator;
