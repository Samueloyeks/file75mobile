import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import db from '../../utils/db';
import { Colors } from '../../styles';



export default class AuthLoadingScreen extends React.Component {

  componentDidMount() {
    this._bootstrapAsync();
  }



  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // AsyncStorage.removeItem('userData')
    const userData = await db.get('userData');

    // this will switch to login or main app depending on if user is logged in 
    {
      userData ?
        this.props.navigation.navigate('Main')
        // this.props.navigation.navigate('Auth')

        :
        this.props.navigation.navigate('Auth')
    }



  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ alignSelf: 'center' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
})