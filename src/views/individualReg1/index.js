import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { businessRegActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';



// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import ServicesView from '../../components/Layouts/ServicesView';
import CustomFooter from '../../components/atoms/CustomFooter';
import ClickableText from '../../components/atoms/ClickableText';
import CustomInput from '../../components/atoms/CustomInput';
import SuffixInput from '../../components/atoms/SuffixInput';
import PrefixInput from '../../components/atoms/PrefixInput';
import CustomButton from '../../components/atoms/CustomButton';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import CustomSelect from '../../components/atoms/CustomSelect';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration4 from '../../assets/svg/Illustration4.svg'
import Info from '../../assets/svg/Info.svg'



const validationSchema = Yup.object().shape({
    // businessName1: Yup.string()
    //     .required('This is a required field'),
    // businessName2: Yup.string()
    //     .required('This is a required field'),
    // availabilityCode: Yup.string()
    //     .required('This is a required field'),
    // businessCategory: Yup.string()
    //     .required('This is a required field'),
    principalAddress: Yup.string()
        .required('This is a required field'),
})

function mapStateToProps(state) {
    const {
        businessRegData
    } = state.businessReg;

    return {
        businessRegData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(businessRegActions.saveData(data))
    };
}





class IndividualRegScreen1 extends PureComponent {

    state = {
        businessCategory: '',
        businessCategories: [
            { label: 'Food and Beverages', value: 'food/beverages', },
            { label: 'Fashion', value: 'fashion' },
            { label: 'Finance', value: 'finance' },
            { label: 'Information Technology', value: 'IT' },
            { label: 'Other', value: 'other' },
        ]
    }

    handleSubmit = async data => {
        if (!data.availabilityCode && !(data.businessName1 && data.businessName2)) {
            alert('Please provide an availability code or up to 2 business names');
            return;
        }
        const { navigation, save, businessRegData } = this.props;
        const { businessCategory } = this.state;

        var regData = { ...data }
        for (const key in regData) {
            businessRegData[key] = regData[key]
        }

        if (businessRegData['businessCategory'] == '') {
            businessRegData['businessCategory'] = businessCategory;
        }

        navigation.navigate('IndividualReg2');
    }

    updateCategory = (category) => {
        this.setState({ businessCategory: category })
    }


    render() {
        const { navigation, loading } = this.props;
        const { businessCategory, businessCategories } = this.state;

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>
                    <View style={[Custom.row, Custom.mb30]}>
                        <View style={{ flex: 0.6 }}>
                            <Text style={[styles.boldText]}>
                                Business Name <TinyArrows />
                            </Text>
                            <Text style={[styles.boldText]}>
                                Registration Made <Text style={[styles.primary]}>Easy</Text>
                            </Text>
                        </View>

                        <View style={{ flex: 0.4 }}>
                            <Illustration4 />
                        </View>
                    </View>
                    <Text style={[styles.textCenter, Custom.mb20]}>Please provide either an availabailty code, 2 business names, or both.</Text>

                    <Formik
                        initialValues={{
                            availabilityCode: '',
                            businessName1: '',
                            businessName2: '',
                            businessCategory: businessCategory,
                            principalAddress: '',
                            branchAddress: ''
                        }}
                        onSubmit={values => { this.handleSubmit(values) }}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange,
                            values,
                            handleSubmit,
                            errors,
                            isValid,
                            isSubmitting,
                            touched,
                            handleBlur
                        }) => (
                                // { this.renderElement() }
                                <View>

                                    <CustomInput
                                        name='availabilityCode'
                                        value={values.availabilityCode}
                                        placeholder='Availability Code'
                                        // customStyle={[Custom.mt20]}
                                        // iconName='asterisk'
                                        // iconColor={Colors.DANGER}
                                        onChangeText={handleChange('availabilityCode')}
                                        onBlur={handleBlur('availabilityCode')}
                                        rightIcon={
                                            <Tooltip
                                                height={150}
                                                backgroundColor='#4D4D4D'
                                                popover={
                                                    <Text style={{ color: '#FFF' }}>
                                                        Input availability code sent to you via mail
                                                </Text>
                                                }>
                                                <Info />
                                            </Tooltip>
                                        }
                                    />
                                    <ErrorMessage errorValue={touched.availabilityCode && errors.availabilityCode} />

                                    <CustomInput
                                        name='businessName1'
                                        value={values.businessName1}
                                        placeholder='First preferred name'
                                        // iconName='asterisk'
                                        // iconColor={Colors.DANGER}
                                        onChangeText={handleChange('businessName1')}
                                        onBlur={handleBlur('businessName1')}
                                        rightIcon={
                                            <Tooltip
                                                height={150}
                                                backgroundColor='#4D4D4D'
                                                popover={
                                                    <Text style={{ color: '#FFF' }}>
                                                        Choose your most preferred business name and input here.
                                                </Text>
                                                }>
                                                <Info />
                                            </Tooltip>
                                        }
                                    />
                                    <ErrorMessage errorValue={touched.businessName1 && errors.businessName1} />

                                    <CustomInput
                                        name='businessName2'
                                        value={values.businessName2}
                                        placeholder='Second preferred name'
                                        // iconName='asterisk'
                                        // iconColor={Colors.DANGER}
                                        onChangeText={handleChange('businessName2')}
                                        onBlur={handleBlur('businessName2')}
                                        rightIcon={
                                            <Tooltip
                                                height={150}
                                                backgroundColor='#4D4D4D'
                                                popover={
                                                    <Text style={{ color: '#FFF' }}>
                                                       Input your alternative business name here.
                                                </Text>
                                                }>
                                                <Info />
                                            </Tooltip>
                                        }
                                    />
                                    <ErrorMessage errorValue={touched.businessName2 && errors.businessName2} />

                                    <CustomSelect
                                        options={businessCategories}
                                        selected={businessCategory}
                                        updateSelected={this.updateCategory}
                                        customStyle={[Custom.mb20]}
                                        placeholder={{ label: 'General nature of business' }}
                                    />

                                    {(businessCategory === 'other') ?
                                        <View>
                                            <CustomInput
                                                name='businessCategory'
                                                value={values.businessCategory}
                                                // customStyle={[Custom.mt20]}
                                                placeholder='Enter Nature of Business Here'
                                                iconName='asterisk'
                                                iconColor={Colors.DANGER}
                                                onChangeText={handleChange('businessCategory')}
                                                onBlur={handleBlur('businessCategory')}
                                            />
                                            <ErrorMessage errorValue={touched.businessCategory && errors.businessCategory} />
                                        </View>
                                        :
                                        null
                                    }

                                    <CustomInput
                                        name='principalAddress'
                                        value={values.principalAddress}
                                        placeholder='Full Address of Principal Place of Business'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('principalAddress')}
                                        onBlur={handleBlur('principalAddress')}
                                    />
                                    <ErrorMessage errorValue={touched.principalAddress && errors.principalAddress} />

                                    <CustomInput
                                        name='branchAddress'
                                        value={values.branchAddress}
                                        placeholder='Full Address of Branch(es) (if any)'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('branchAddress')}
                                        onBlur={handleBlur('branchAddress')}
                                    />
                                    <ErrorMessage errorValue={touched.branchAddress && errors.branchAddress} />

                                    <CustomButton
                                        title='Next'
                                        buttonStyle={styles.buttonStyle}
                                        customStyle={styles.primaryButtonStyle}
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                        buttonColor={Colors.SECONDARY}
                                        loading={loading}
                                    />
                                    <CustomButton
                                        title='Back'
                                        buttonStyle={styles.buttonStyle}
                                        customStyle={styles.secondaryButtonStyle}
                                        buttonColor={Colors.WHITE}
                                        onPress={() => navigation.goBack(null)}
                                    />
                                </View>
                            )}
                    </Formik>
                </ScrollView>
                <CustomFooter />
            </View>
        );
    }
}

const services = [
    {
        id: '1',
        title: 'BUSINESS NAME RESERVATION',
        desc: 'Reserve your business name',
        navTo: ''
    },
    {
        id: '2',
        title: 'BUSINESS REGISTRATION',
        desc: 'Complete registration process for your business',
        navTo: ''
    }
]

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualRegScreen1);
