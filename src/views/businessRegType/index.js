import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom } from '../../styles';
import { serviceActions } from '../../store/actions';
import { Colors } from '../../styles';



// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import BusinessRegView from '../../components/Layouts/BusinessRegView';
import CustomFooter from '../../components/atoms/CustomFooter';
import CustomButton from '../../components/atoms/CustomButton';


function mapStateToProps(state) {
  const {

  } = state.services;

  return {

  };
}

function mapDispatchToProps(dispatch) {

  return {
  };
}


class BusinessRegTypeScreen extends PureComponent {


  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.customBackground}>
        <View style={styles.content}>
          <View style={[styles.textCenter, Custom.mv30]}>
            <Text style={styles.boldText}>BUSINESS NAME REGISTRATION</Text>
          </View>

          {/* <Text style={[styles.boldText, Custom.mt40, Custom.mb20]}>Services</Text> */}
          <BusinessRegView services={allServices} navigation={navigation} />
        </View>
        <CustomButton
          title='Back'
          buttonStyle={styles.buttonStyle}
          customStyle={styles.secondaryButtonStyle}
          buttonColor={Colors.WHITE}
          onPress={() => navigation.goBack(null)}
        />
        <CustomFooter />
      </View>
    );
  }
}

const allServices = [
  {
    id: '1',
    category: 'Sole Proprieorship',
    navTo: 'BusinessReg1',
    type: 'soleProprietorship'
  },
  {
    id: '2',
    category: 'Partnership',
    navTo: 'BusinessReg1',
    type: 'partnership'
  },
] 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessRegTypeScreen);
