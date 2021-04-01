import React, { Component, createRef } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Colors, Custom } from '../../styles';
import { userActions } from '../../store/actions';
import { connect } from 'react-redux';




// components 
import CustomActionSheet from '../atoms/CustomActionSheet';


const options = [
  'Cancel',
  'Yes'
];
const title = <Text style={{ fontSize: 15 }}>Log out?</Text>;


function mapStateToProps(state) {
  const loggedOut = state.user.loggedOut;

  return {
    loggedOut
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(userActions.logout()),
  };
}

class SideMenu extends Component {

  navigateToScreen = route => () => {
    const { navigation } = this.props;
    navigation.navigate(route);
  };

  handlePress = async index => {
    const { logout } = this.props;

    if (index === 1) {
      logout();
    }
  };



  componentDidUpdate(prevProps) {
    if (this.props.loggedOut !== prevProps.loggedOut && this.props.loggedOut) {
      this.props.navigation.navigate('Auth')
    }
  }

  actionSheet = createRef();
  showActionSheet = () => this.actionSheet.current.show();

  render() {

    return (
      <View style={styles.background}>
        <TouchableOpacity onPress={this.navigateToScreen('Home')} style={styles.navSectionStyle}>
          <Text style={[Custom.boldText, styles.navItemStyle]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.navigateToScreen('Account')} style={styles.navSectionStyle}>
          <Text style={[Custom.boldText, styles.navItemStyle]}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.navigateToScreen('Tasks')} style={styles.navSectionStyle}>
          <Text style={[Custom.boldText, styles.navItemStyle]}>Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.navigateToScreen('About')} style={styles.navSectionStyle}>
          <Text style={[Custom.boldText, styles.navItemStyle]}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.navigateToScreen('Contact')} style={styles.navSectionStyle}>
          <Text style={[Custom.boldText, styles.navItemStyle]}>Support</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.navigateToScreen('Help')} style={styles.navSectionStyle}>
          <Text style={[Custom.boldText, styles.navItemStyle]}>FAQs</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.showActionSheet} style={styles.navSectionStyle}>
          <Text style={[Custom.boldText, styles.navItemStyle, styles.signoutStyle]}>Sign out</Text>
        </TouchableOpacity>

        <CustomActionSheet
          customRef={this.actionSheet}
          title={title}
          options={options}
          cancelIndex={0}
          handlePress={this.handlePress}
        />
      </View>
    );
  }
}

const styles = {
  background: {
    backgroundColor: '#4D4D4D',
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navItemStyle: {
    color: '#FFF',
    paddingVertical: 25,
    fontSize: 18,
  },
  navSectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signoutStyle: {
    color: Colors.PRIMARY
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
