import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BUSINESS_REGISTRATION_CHARGE } from 'react-native-dotenv';
import { businessRegActions, serviceActions } from '../../store/actions';



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
import { Input, Tooltip } from 'react-native-elements';


// svg 
import SmallArrowsPrimary from '../../assets/svg/SmallArrowsPrimary.svg'
import Illustration2 from '../../assets/svg/Illustration2.svg'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    corporateName: Yup.string()
        .required('This is a required field'),
    companyNo: Yup.string()
        .required('This is a required field'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .min(11)
        .required('This is a required field'),
    // businessName1: Yup.string()
    //     .required('This is a required field'),
    // businessName2: Yup.string()
    //     .required('This is a required field'),
    // availabilityCode: Yup.string()
    //     .required('This is a required field'),
    fullName: Yup.string()
        .required('This is a required field'),
    companyDesignation: Yup.string()
        .required('This is a required field'),
})

function mapStateToProps(state) {
    const {
        businessRegData
    } = state.businessReg;

    const {
        reservationType
    } = state.reserve;

    return {
        businessRegData,
        reservationType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(businessRegActions.saveData(data)),
        updateServicePayment: (service) => dispatch(serviceActions.updateServicePayment(service))
    };
}





class PreviewBusinessRegScreen extends PureComponent {

    state = {

    }

    handleSubmit = async data => {
        const { navigation, save, businessRegData, updateServicePayment } = this.props;

        var regData = { ...data }
        for (const key in regData) {
            businessRegData[key] = regData[key]
        }

        businessRegData.charge = BUSINESS_REGISTRATION_CHARGE;
        updateServicePayment('businessRegistration');
        navigation.navigate('SelectPaymentMethod');
    }
 


    render() {
        const { navigation, loading, businessRegData } = this.props;


        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>
                    <View style={[Custom.mv30]}>
                        <Text style={[styles.boldText, styles.largeText]}>
                            Business Name <SmallArrowsPrimary />
                        </Text>
                        <Text style={[styles.boldText, styles.largeText]}>
                            Registration Made <Text style={[styles.primary]}>Easy</Text>
                        </Text>
                    </View>

                    <Formik
                        initialValues={{
                            corporateName: businessRegData.corporateName,
                            companyNo: businessRegData.companyNo,
                            availabilityCode: businessRegData.availabilityCode,
                            businessName1: businessRegData.businessName1,
                            businessName2: businessRegData.businessName2,
                            phone: businessRegData.phone,
                            fullName: businessRegData.fullName,
                            companyDesignation: businessRegData.companyDesignation
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
                                        name='corporateName'
                                        value={values.corporateName}
                                        placeholder='Corporate Name'
                                        // customStyle={[Custom.mt20]}
                                        onChangeText={handleChange('corporateName')}
                                        onBlur={handleBlur('corporateName')}
                                    />
                                    <ErrorMessage errorValue={touched.corporateName && errors.corporateName} />

                                    <CustomInput
                                        name='companyNo'
                                        value={values.companyNo}
                                        placeholder='Registered Company No.'
                                        onChangeText={handleChange('companyNo')}
                                        onBlur={handleBlur('companyNo')}
                                    />
                                    <ErrorMessage errorValue={touched.companyNo && errors.companyNo} />


                                    <CustomInput
                                        name='availabilityCode'
                                        value={values.availabilityCode}
                                        placeholder='Availability Code'
                                        // customStyle={[Custom.mt20]}
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

                                    <CustomInput
                                        name='phone'
                                        value={values.phone}
                                        placeholder='Phone Number'
                                        customStyle={[Custom.mt10]}
                                        keyboardType='phone-pad'
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                    />
                                    <ErrorMessage errorValue={touched.phone && errors.phone} />

                                    <CustomInput
                                        name='fullName'
                                        value={values.fullName}
                                        placeholder='Full Name'
                                        // customStyle={[Custom.mt20]}
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                    />
                                    <ErrorMessage errorValue={touched.fullName && errors.fullName} />

                                    <CustomInput
                                        name='companyDesignation'
                                        value={values.companyDesignation}
                                        placeholder='Designation'
                                        onChangeText={handleChange('companyDesignation')}
                                        onBlur={handleBlur('companyDesignation')}
                                    />
                                    <ErrorMessage errorValue={touched.companyDesignation && errors.companyDesignation} />

                                    <View style={styles.imageContainer}>
                                        {
                                            (businessRegData.signature && businessRegData.signature.path) ?
                                                <Image
                                                    source={{ uri: businessRegData.signature.path }}
                                                    style={{ width: 200, height: 150, }}
                                                /> :
                                                null
                                        }
                                    </View>

                                    <CustomButton
                                        title='Submit'
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
)(PreviewBusinessRegScreen);
