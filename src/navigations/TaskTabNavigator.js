import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ApprovedTasksScreen from '../views/approvedTasks';
import PendingTasksScreen from '../views/pendingTasks';
import DeclinedTasksScreen from '../views/declinedTasks';
import { Colors } from '../styles';
import { color } from 'react-native-reanimated';



const TaskTabNavigatorConfig = {
    initialRouteName: 'Approved',
    header: null,
    tabBarOptions: {
        activeTintColor: Colors.PRIMARY,
        showIcon: true,
        showLabel: true,
        upperCaseLabel:false,
        style: {
            backgroundColor: '#FFF',
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
        },
        labelStyle: {
            color: Colors.SECONDARY,
            fontFamily: 'Montserrat-Bold',
            margin:0
        },

    },
};

const RouteConfigs = {
    Approved: {
        screen: ApprovedTasksScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    Pending: {
        screen: PendingTasksScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    Declined: {
        screen: DeclinedTasksScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
};


const TaskTabNavigator = createMaterialTopTabNavigator(RouteConfigs, TaskTabNavigatorConfig);

export default TaskTabNavigator;