import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ApprovedTasksScreen from '../../views/approvedTasks';


const TasksStack = createStackNavigator({
  Approved: {
    screen: ApprovedTasksScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ReservationDetails: {
    screen: ReservationDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <View style={styles.menu}>
            <Text>Back</Text>
          </View>
        </TouchableOpacity>
      ),
    }),
  },
  initialRouteName: 'Approved',
});


export default TasksStack;
