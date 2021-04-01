import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../../views/home';
import ReserveNameScreen from '../../views/reserveName';
import ReservationTypeScreen from '../../views/reservationType';
import CompanyReservationTypeScreen from '../../views/companyReservationType';
import BusinessRegTypeScreen from '../../views/businessRegType';
import BusinessRegScreen1 from '../../views/businessReg1';
import BusinessRegScreen2 from '../../views/businessReg2';
import BusinessRegScreen3 from '../../views/businessReg3';
import BusinessRegScreen4 from '../../views/businessReg4';
import IndividualRegScreen1 from '../../views/individualReg1';
import IndividualRegScreen2 from '../../views/individualReg2';
import IndividualRegScreen3 from '../../views/individualReg3';
import IndividualRegScreen4 from '../../views/individualReg4';
import PreviewBusinessRegScreen from '../../views/previewBusinessReg';
import PreviewIndividualRegScreen from '../../views/previewIndividualReg';
import CompanyRegTypeScreen from '../../views/companyRegType';
import LimitedCompanyRegScreen1 from '../../views/limitedCompanyReg1';
import LimitedCompanyRegScreen2 from '../../views/limitedCompanyReg2';
import LimitedCompanyRegScreen3 from '../../views/limitedCompanyReg3';
import LimitedCompanyRegScreen4 from '../../views/limitedCompanyReg4';
import LimitedCompanyRegScreen5 from '../../views/limitedCompanyReg5';
import LimitedCompanyRegScreen6 from '../../views/limitedCompanyReg6';
import LimitedCompanyRegScreen7 from '../../views/limitedCompanyReg7';
import LimitedCompanyRegScreen8 from '../../views/limitedCompanyReg8';
import LimitedCompanyRegScreen9 from '../../views/limitedCompanyReg9';
import LimitedCompanyRegScreen10 from '../../views/limitedCompanyReg10';
import LimitedCompanyRegScreen11 from '../../views/limitedCompanyReg11';

import ReservationInfoScreen from '../../views/reservationInfo';
import SelectPaymentMethodScreen from '../../views/selectPaymentMethod';
import PaystackViewScreen from '../../views/paystackView';




const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ReservationType: {
    screen: ReservationTypeScreen,
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
  CompanyReservationType: {
    screen: CompanyReservationTypeScreen,
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
  BusinessRegType: {
    screen: BusinessRegTypeScreen,
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
  BusinessReg1: {
    screen: BusinessRegScreen1,
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
  BusinessReg2: {
    screen: BusinessRegScreen2,
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
  BusinessReg3: {
    screen: BusinessRegScreen3,
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
  BusinessReg4: {
    screen: BusinessRegScreen4,
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
  PreviewBusinessReg: {
    screen: PreviewBusinessRegScreen,
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
  IndividualReg1: {
    screen: IndividualRegScreen1,
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
  IndividualReg2: {
    screen: IndividualRegScreen2,
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
  IndividualReg3: {
    screen: IndividualRegScreen3,
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
  IndividualReg4: {
    screen: IndividualRegScreen4,
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
  PreviewIndividualReg: {
    screen: PreviewIndividualRegScreen,
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
  CompanyRegType: {
    screen: CompanyRegTypeScreen,
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
  LimitedCompanyReg1: {
    screen: LimitedCompanyRegScreen1,
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
  LimitedCompanyReg2: {
    screen: LimitedCompanyRegScreen2,
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
  LimitedCompanyReg3: {
    screen: LimitedCompanyRegScreen3,
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
  LimitedCompanyReg4: {
    screen: LimitedCompanyRegScreen4,
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
  LimitedCompanyReg5: {
    screen: LimitedCompanyRegScreen5,
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
  LimitedCompanyReg6: {
    screen: LimitedCompanyRegScreen6,
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
  LimitedCompanyReg7: {
    screen: LimitedCompanyRegScreen7,
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
  LimitedCompanyReg8: {
    screen: LimitedCompanyRegScreen8,
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
  LimitedCompanyReg9: {
    screen: LimitedCompanyRegScreen9,
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
  LimitedCompanyReg10: {
    screen: LimitedCompanyRegScreen10,
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
  LimitedCompanyReg11: {
    screen: LimitedCompanyRegScreen11,
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
  ReserveName: {
    screen: ReserveNameScreen,
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
  ReservationInfo: {
    screen: ReservationInfoScreen,
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
  SelectPaymentMethod: {
    screen: SelectPaymentMethodScreen,
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
  PaystackView: {
    screen: PaystackViewScreen,
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
  initialRouteName: 'Home',
});


export default HomeStack;
