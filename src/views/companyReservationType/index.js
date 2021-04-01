import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom } from '../../styles';
import { serviceActions } from '../../store/actions';
import { Colors } from '../../styles';
import { Input, Tooltip } from 'react-native-elements';



// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import CompanyReservationsView from '../../components/Layouts/CompanyReservationsView';
import CustomFooter from '../../components/atoms/CustomFooter';
import CustomButton from '../../components/atoms/CustomButton';

// svg 
import BigInfo from '../../assets/svg/BigInfo.svg';


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


class ReservationTypeScreen extends PureComponent {


  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.customBackground}>
        <View style={styles.content}>

          <View style={[styles.textCenter, Custom.mv30]}>
            <Text style={styles.boldText}>COMPANY NAME RESERVATION</Text>
          </View>

          {/* <Text style={[styles.boldText, Custom.mt40, Custom.mb20]}>Services</Text> */}
          <CompanyReservationsView services={allServices} navigation={navigation} />
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
    category: 'Limited',
    navTo: 'ReserveName',
    type:'limited'
  },
  {
    id: '2',
    category: 'Unlimited',
    navTo: 'ReserveName',
    type:'unlimited'
  },
  // {
  //   id: '3',
  //   category: 'Limited by Guarantee',
  //   navTo: 'ReserveName',
  //   type:'limitedByGuarantee'
  // }
]

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationTypeScreen);
