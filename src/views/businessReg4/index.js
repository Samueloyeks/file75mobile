import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Platform, TextInput, ScrollView, Switch } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { HIDE_ATTESTEE_FEE, BUSINESS_REGISTRATION_CHARGE } from 'react-native-dotenv';
import { businessRegActions, serviceActions } from '../../store/actions';
import { formatCamelCase, capitalizeWords } from '../../helpers/encode'

import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'


// components 
import CustomFooter from '../../components/atoms/CustomFooter';
import CustomInput from '../../components/atoms/CustomInput';
import CustomButton from '../../components/atoms/CustomButton';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import CustomSwitch from '../../components/atoms/CustomSwitch';



// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration16 from '../../assets/svg/Illustration16.svg'
import Upload from '../../assets/svg/Upload.svg'
import { mt10 } from '../../styles/custom';





function mapStateToProps(state) {
    const {
        businessRegData,
        businessRegType
    } = state.businessReg;

    return {
        businessRegData,
        businessRegType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(businessRegActions.saveData(data)),
        updateServicePayment: (service) => dispatch(serviceActions.updateServicePayment(service))
    };
}





class BusinessRegScreen4 extends PureComponent {

    state = {
        hideIndividual: false,
        hideAuthorizedSignatory: false,
        hideMinor: false,
        hideAttestee: false
    }


    handleSubmit = async data => {
        const { navigation, save, businessRegData, updateServicePayment } = this.props;
        const {
            hideIndividual,
            hideAuthorizedSignatory,
            hideAttestee,
            hideMinor
        } = this.state;

        businessRegData['hideIndividual'] = hideIndividual;
        businessRegData['hideAuthorizedSignatory'] = hideAuthorizedSignatory;
        businessRegData['hideAttestee'] = hideAttestee;
        businessRegData['hideMinor'] = hideMinor;

        businessRegData['charge'] = hideAttestee ? parseInt(BUSINESS_REGISTRATION_CHARGE) + parseInt(HIDE_ATTESTEE_FEE) : BUSINESS_REGISTRATION_CHARGE;
        businessRegData['type'] = 'partnership'

        updateServicePayment('businessRegistration');
        navigation.navigate('SelectPaymentMethod');
    }


    render() {
        const { navigation, loading, businessRegData, businessRegType } = this.props;
        const {
            hideIndividual,
            hideAuthorizedSignatory,
            hideMinor,
            hideAttestee
        } = this.state;

        let breadcrumbText = businessRegType

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>
                    <Text style={[Custom.breadcrumbText,styles.boldText]}>
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
                    <View style={[styles.textInline, Custom.mv20, styles.textCenter,]}>
                        <Illustration16 />
                    </View>
                    <Text style={[styles.boldText, styles.textCenter, Custom.mv10,]}>HIDE RESIDENTIAL ADDRESS</Text>
                    <Formik
                        initialValues={{ email2: '', businessDescription: '' }}
                        onSubmit={values => { this.handleSubmit(values) }}
                    // validationSchema={validationSchema}
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

                                    <View style={[Custom.row]}>
                                        <View style={styles.switchCol}>
                                            <CustomSwitch
                                                toggleSwitch={() => this.setState({ hideIndividual: !hideIndividual })}
                                                isEnabled={hideIndividual}
                                            />
                                        </View>
                                        <View style={styles.textCol}>
                                            <Text style={[styles.boldText]}>Individual</Text>
                                            <Text style={[styles.smallText]}>Hide Residential Address From Public Record?</Text>
                                        </View>
                                    </View>

                                    <View style={[Custom.row]}>
                                        <View style={styles.switchCol}>
                                            <CustomSwitch
                                                toggleSwitch={() => this.setState({ hideAuthorizedSignatory: !hideAuthorizedSignatory })}
                                                isEnabled={hideAuthorizedSignatory}
                                            />
                                        </View>
                                        <View style={styles.textCol}>
                                            <Text style={[styles.boldText]}>Authorised Signatory</Text>
                                            <Text style={[styles.smallText]}>Hide Residential Address From Public Record?</Text>
                                        </View>
                                    </View>

                                    <View style={[Custom.row]}>
                                        <View style={styles.switchCol}>
                                            <CustomSwitch
                                                toggleSwitch={() => this.setState({ hideMinor: !hideMinor })}
                                                isEnabled={hideMinor}
                                            />
                                        </View>
                                        <View style={styles.textCol}>
                                            <Text style={[styles.boldText]}>Minor</Text>
                                            <Text style={[styles.smallText]}>Hide Residential Address From Public Record?</Text>
                                        </View>
                                    </View>

                                    <View style={[Custom.row]}>
                                        <View style={styles.switchCol}>
                                            <CustomSwitch
                                                toggleSwitch={() => this.setState({ hideAttestee: !hideAttestee })}
                                                isEnabled={hideAttestee}
                                            />
                                        </View>
                                        <View style={styles.textCol}>
                                            <Text style={[styles.boldText]}>Attestee</Text>
                                            <Text style={[styles.smallText]}>Hide Residential Address From Public Record?</Text>
                                        </View>
                                        <View style={styles.priceCol}>
                                            <Text style={[styles.boldText, styles.primaryColor]}>₦{HIDE_ATTESTEE_FEE}</Text>
                                        </View>
                                    </View>

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
)(BusinessRegScreen4);
