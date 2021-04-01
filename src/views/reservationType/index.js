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
import ReservationsView from '../../components/Layouts/ReservationsView';
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
          <Tooltip
            height={200}
            width={250}
            backgroundColor='#4D4D4D'
            withPointer={false}
            popover={
              <Text style={{ color: '#FFF' }}>
                Reserve a name for the
                kind of organization you would like
                to register.

                Incorporated trustees is the business
                registration reserved for NGOs,
                Foundations, Religious bodies and
                Charity Organisation.
              </Text>
            }>
            <BigInfo style={{ alignSelf: 'flex-end' }} />
          </Tooltip>

          <View style={[styles.textCenter, Custom.mv30]}>
            <Text style={styles.boldText}>NAME RESERVATION</Text>
          </View>

          {/* <Text style={[styles.boldText, Custom.mt40, Custom.mb20]}>Services</Text> */}
          <ReservationsView services={allServices} navigation={navigation} />
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
    category: 'Business Name Reservation',
    navTo: 'ReserveName',
    type: 'businessName'
  },
  {
    id: '2',
    category: 'Company Name Reservation',
    navTo: 'CompanyReservationType',
    type: 'companyName'
  },
  // {
  //   id: '3',
  //   category: 'Incorporated Trustees ',
  //   navTo: 'ReserveName',
  //   type: 'IT'
  // }
]

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationTypeScreen);
