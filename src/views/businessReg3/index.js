import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Platform, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BUSINESS_REGISTRATION_CHARGE } from 'react-native-dotenv';
import { businessRegActions, serviceActions } from '../../store/actions';
import { formatCamelCase, capitalizeWords } from '../../helpers/encode'

import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'


// components 
import CustomFooter from '../../components/atoms/CustomFooter';
import CustomInput from '../../components/atoms/CustomInput';
import CustomButton from '../../components/atoms/CustomButton';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import CustomSelect from '../../components/atoms/CustomSelect';
import CustomSearchableDropdown from '../../components/atoms/CustomSearchableDropdown';



// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration15 from '../../assets/svg/Illustration15.svg'
import Upload from '../../assets/svg/Upload.svg'
import { mt10 } from '../../styles/custom';



const validationSchema = Yup.object().shape({
    // email2: Yup.string()
    //     .label('Email2')
    //     .required('This is a required field')
    //     .email('Enter a valid email'),
    businessDescription: Yup.string()
        .required('This is a required field'),
})

function mapStateToProps(state) {
    const {
        businessRegData,
        businessRegType,
        naturesOfBusiness
    } = state.businessReg;

    return {
        businessRegData,
        businessRegType,
        naturesOfBusiness
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(businessRegActions.saveData(data)),
        updateServicePayment: (service) => dispatch(serviceActions.updateServicePayment(service)),
    };
}





class BusinessRegScreen3 extends PureComponent {

    state = {
        signature: null,
        natureOfBusiness: '',
        naturesOfBusiness: [
            { label: 'Test', value: 'test' },
            { label: 'Test2', value: 'test2', },
        ],
        specificNature: '',
        specificNatures: [
            { label: 'Test', value: 'test' },
            { label: 'Test2', value: 'test2', },
        ],
        subNaturesOfBusiness: []
    }

    updateNatureOfBusiness = async (object) => {
        this.setState({
            subNaturesOfBusiness: object.subcategories,
            natureOfBusiness: object.name
        });
    }

    updateSpecificNature = async (object) => {
        this.setState({
            specificNature: object.name
        });
    }

    handleSubmit = async data => {
        const { navigation, save, businessRegData, businessRegType, updateServicePayment } = this.props;
        const {
            natureOfBusiness,
            specificNature
        } = this.state;

        if (
            natureOfBusiness == '' ||
            specificNature == ''
        ) {
            alert('Please complete entire form');
            return;
        }


        var regData = { ...data }
        for (const key in regData) {
            businessRegData[key] = regData[key]
        }
        businessRegData.natureOfBusiness = natureOfBusiness
        businessRegData.specificNature = specificNature

        if (businessRegType === 'partnership') {
            navigation.navigate('BusinessReg4');
        } else {
            businessRegData['charge'] = BUSINESS_REGISTRATION_CHARGE
            businessRegData['type'] = 'soleProprietorship';
            updateServicePayment('individualRegistration');
            navigation.navigate('SelectPaymentMethod');
        }
    }


    render() {
        const { navigation, loading, businessRegData, businessRegType, naturesOfBusiness } = this.props;
        const {
            natureOfBusiness,
            specificNature,
            specificNatures,
            subNaturesOfBusiness
        } = this.state;

        let breadcrumbText = businessRegType

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={styles.content}>
                    <Text style={[Custom.breadcrumbText, styles.boldText]}>
                        {"Business Registration > " + formatCamelCase(capitalizeWords(breadcrumbText))}
                    </Text>
                    <View style={[Custom.mv30]}>
                        <Text style={[styles.boldText]}>
                            Business Name <TinyArrows />
                        </Text>
                        <Text style={[styles.boldText]}>
                            Registration Made <Text style={[styles.primary]}>Easy</Text>
                        </Text>
                    </View>
                    <View style={[styles.textInline, Custom.mv40, styles.textCenter,]}>
                        <Illustration15 />
                    </View>
                    <Formik
                        initialValues={{ businessDescription: '' }}
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

                                    <CustomSearchableDropdown
                                        options={naturesOfBusiness}
                                        selected={natureOfBusiness}
                                        onItemSelect={(item) => this.updateNatureOfBusiness(item)}
                                        // customStyle={[Custom.mb20]}
                                        placeholder='Business Category'
                                        required={true}
                                    />
                                    <CustomSearchableDropdown
                                        options={subNaturesOfBusiness}
                                        selected={specificNature}
                                        onItemSelect={(item) => this.updateSpecificNature(item)}
                                        // customStyle={[Custom.mb20]}
                                        placeholder='Nature of Business'
                                        required={true}
                                    />
                                    {/* <CustomSelect
                                        options={naturesOfBusiness}
                                        selected={natureOfBusiness}
                                        updateSelected={this.updateNatureOfBusiness}
                                        customStyle={[Custom.mb20]}
                                        placeholder={{ label: 'Business Category' }}
                                    />

                                    <CustomSelect
                                        options={specificNatures}
                                        selected={specificNature}
                                        updateSelected={this.updateSpecificNature}
                                        customStyle={[Custom.mb20]}
                                        placeholder={{ label: 'Nature of Business' }}
                                    /> */}

                                    {/* <CustomInput
                                        name='email2'
                                        value={values.email2}
                                        placeholder='Email'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        keyboardType='email-address'
                                        onChangeText={handleChange('email2')}
                                        autoCapitalize='none'
                                        onBlur={handleBlur('email2')}
                                    />
                                    <ErrorMessage errorValue={touched.email2 && errors.email2} /> */}

                                    <CustomInput
                                        name='businessDescription'
                                        value={values.businessDescription}
                                        placeholder='Further Business Description'
                                        customStyle={{ height: 150 }}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        rows={5}
                                        multiline={true}
                                        onChangeText={handleChange('businessDescription')}
                                        onBlur={handleBlur('businessDescription')}
                                    />
                                    <ErrorMessage errorValue={touched.businessDescription && errors.businessDescription} />

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


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessRegScreen3);
