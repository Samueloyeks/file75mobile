import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COMPANY_REGISTRATION_CHARGE } from 'react-native-dotenv';
import { companyRegActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';
import { formatCamelCase, capitalizeWords } from '../../helpers/encode'
import { calculateFinalCharge } from '../../helpers/companyRegFunctions'




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
import Illustration8 from '../../assets/svg/Illustration8.svg'
import Info from '../../assets/svg/Info.svg'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .min(11)
        .required('This is a required field'),
    // companyName1: Yup.string()
    //     .required('This is a required field'),
    // companyName2: Yup.string()
    //     .required('This is a required field'),
    // availabilityCode: Yup.string()
    //     .required('This is a required field'),
})

function mapStateToProps(state) {
    const {
        companyRegData,
        businessObjects,
        companyRegType
    } = state.companyReg;

    return {
        companyRegData,
        businessObjects,
        companyRegType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(companyRegActions.saveData(data)),
        getBusinessObjects: () => dispatch(companyRegActions.getBusinessObjects()),
        getNaturesOfBusiness: () => dispatch(companyRegActions.getNaturesOfBusiness())
    };
}





class LimitedCompanyRegScreen1 extends PureComponent {

    state = {
        suffix1: '',
        suffix2: '',
        suffixes: [
            { label: 'Limited', value: 'limited', },
            { label: 'LTD', value: 'ltd' },
            { label: 'PLC', value: 'plc' },
        ],
        suffixes2: [
            { label: 'ULTD', value: 'ultd' },
            { label: 'UNLIMITED', value: 'unlimited' },
        ],
        suffixes3: [
            { label: 'LTD/GTE', value: 'ltd/gte' },
        ],
        suffixes4: [
            { label: 'Limited', value: 'limited', },
            { label: 'LTD', value: 'ltd' }
        ],
        suffixes5: [
            { label: 'PLC', value: 'plc' },
        ],
        companyType: '',
        companyTypes: [
            { label: 'Private', value: 'private' },
            { label: 'Public', value: 'public', },
        ],
    }

    handleSubmit = async data => {
        if (!data.availabilityCode && !(data.companyName1)) {
            alert('Please provide an availability code or a company name');
            return;
        }

        const { navigation, save, companyRegData, companyRegType } = this.props;
        const { suffix1, suffix2, companyType } = this.state;

        if (!data.availabilityCode && (suffix1 == '')) {
            alert('Please select company type');
            return;
        }

        if (companyRegType == 'limited' && companyType == '') {
            alert('Please select limited company type');
            return;
        }

        if (data.companyName1 !== '') data.companyName1 = `${data.companyName1} ${suffix1}`
        if (data.companyName2 !== '') data.companyName2 = `${data.companyName2} ${suffix2}`


        var regData = { ...data }
        for (const key in regData) {
            companyRegData[key] = regData[key]
        } 
        companyRegData['companyType'] = companyType;
        companyRegData['type'] = companyRegType;

        companyRegData.individualShareholders = [];
        companyRegData.corporateShareholders = [];
        companyRegData.minorShareholders = [];
        companyRegData.PSCs = [];
        companyRegData.shareDetails = {}
        companyRegData.shareDetails.shares = [];
        companyRegData.articlesOfAssociation = {}
        companyRegData.articlesOfAssociation.witnesses = [];

        navigation.navigate('LimitedCompanyReg2');
    }


    updateSuffix1 = (suffix1) => {
        this.setState({ suffix1 })
    }

    updateSuffix2 = (suffix2) => {
        this.setState({ suffix2 })
    }

    updateCompanyType = (companyType) => {
        const {
            suffixes4,
            suffixes5,
        } = this.state;
        this.setState({ companyType })
        companyType == 'private' ? this.setState({ suffixes: suffixes4 }) : this.setState({ suffixes: suffixes5 })
    }

    async componentDidMount() {
        const { getBusinessObjects, getNaturesOfBusiness, companyRegType } = this.props;
        const { suffixes, suffixes2, suffixes3 } = this.state;
        if (companyRegType == 'unlimited') {
            this.setState({ suffixes: suffixes2 })
        } else if (companyRegType == 'limitedByGuarantee') {
            this.setState({ suffixes: suffixes3 })
        }
        await getBusinessObjects();
        await getNaturesOfBusiness();
    }

    render() {
        const { suffixes, suffix1, suffix2, companyType, companyTypes } = this.state;
        const { navigation, loading, companyRegData, companyRegType } = this.props;

        let breadcrumbText = companyRegType

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>
                    <Text style={[Custom.breadcrumbText,styles.boldText]}>
                        {"Company Registration > " + formatCamelCase(capitalizeWords(breadcrumbText))}
                    </Text>
                    <View style={[Custom.mv30]}>
                        <Text style={[styles.boldText]}>
                            Company <TinyArrows />
                        </Text>
                        <Text style={[styles.boldText]}>
                            Registration Made <Text style={[styles.primary]}>Easy</Text>
                        </Text>
                    </View>
                    <View style={[styles.textInline, Custom.mv20, styles.textCenter,]}>
                        <Illustration8 />
                    </View>

                    <Text style={[styles.textCenter, Custom.mb20]}>Please provide either an availabailty code, 2 business names, or both.</Text>
                    <Formik
                        initialValues={{ availabilityCode: '', companyName1: '', companyName2: '', phone: '', additionalComment: '' }}
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

                                    {
                                        (companyRegType == 'limited') ?
                                            <CustomSelect
                                                options={companyTypes}
                                                selected={companyType}
                                                updateSelected={this.updateCompanyType}
                                                customStyle={[Custom.mb20]}
                                                placeholder={{ label: 'Company Type' }}
                                                required={true}
                                            /> : null
                                    }
                                    {/* <CustomInput
                                        name='companyName1'
                                        value={values.companyName1}
                                        placeholder='First preferred name'
                                        // iconName='asterisk'
                                        // iconColor={Colors.DANGER}
                                        onChangeText={handleChange('companyName1')}
                                        onBlur={handleBlur('companyName1')}
                                        rightIcon={
                                            <Tooltip
                                                height={150}
                                                backgroundColor='#4D4D4D'
                                                popover={
                                                    <Text style={{ color: '#FFF' }}>
                                                        If you haven’t reserved a name select input a name you would like to register your company name
                                                </Text>
                                                }>
                                                <Info />
                                            </Tooltip>
                                        }
                                    />
                                    <ErrorMessage errorValue={touched.companyName1 && errors.companyName1} />

                                    <CustomInput
                                        name='companyName2'
                                        value={values.companyName2}
                                        placeholder='Second preferred name'
                                        // iconName='asterisk'
                                        // iconColor={Colors.DANGER}
                                        onChangeText={handleChange('companyName2')}
                                        onBlur={handleBlur('companyName2')}
                                        rightIcon={
                                            <Tooltip
                                                height={150}
                                                backgroundColor='#4D4D4D'
                                                popover={
                                                    <Text style={{ color: '#FFF' }}>
                                                        Choose another name you will like for your company in case the first one is not approved
                                                </Text>
                                                }>
                                                <Info />
                                            </Tooltip>
                                        }
                                    />
                                    <ErrorMessage errorValue={touched.companyName2 && errors.companyName2} /> */}

                                    <SuffixInput
                                        name='companyName1'
                                        value={values.companyName1}
                                        placeholder='First preferred name'
                                        // customStyle={[Custom.mt20]}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('companyName1')}
                                        onBlur={handleBlur('companyName1')}
                                        prefix={{
                                            label: 'Incorp. Trustees of',
                                            value: 'Incorporated Trustees Of'
                                        }}
                                        suffixes={suffixes}
                                        suffix={suffix1}
                                        updateSuffix={this.updateSuffix1}
                                        pickerPlaceholder='Select'
                                    />
                                    <ErrorMessage errorValue={touched.companyName1 && errors.companyName1} />

                                    <SuffixInput
                                        name='companyName2'
                                        value={values.companyName2}
                                        placeholder='Second preferred name'
                                        // customStyle={[Custom.mt20]}
                                        // iconName='asterisk'
                                        // iconColor={Colors.DANGER}
                                        onChangeText={handleChange('companyName2')}
                                        onBlur={handleBlur('companyName2')}
                                        prefix={{
                                            label: 'Incorp. Trustees of',
                                            value: 'Incorporated Trustees Of'
                                        }}
                                        suffixes={suffixes}
                                        suffix={suffix2}
                                        updateSuffix={this.updateSuffix2}
                                        pickerPlaceholder='Select'
                                    />
                                    <ErrorMessage errorValue={touched.companyName2 && errors.companyName2} />

                                    <CustomInput
                                        name='phone'
                                        value={values.phone}
                                        placeholder='Phone Number'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        customStyle={[Custom.mt10]}
                                        keyboardType='phone-pad'
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                    />
                                    <ErrorMessage errorValue={touched.phone && errors.phone} />

                                    <CustomInput
                                        name='additionalComment'
                                        value={values.additionalComment}
                                        placeholder='Additional Comment'
                                        customStyle={{ height: 150 }}
                                        rows={5}
                                        multiline={true}
                                        onChangeText={handleChange('additionalComment')}
                                        onBlur={handleBlur('additionalComment')}
                                    />
                                    <ErrorMessage errorValue={touched.additionalComment && errors.additionalComment} />

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
)(LimitedCompanyRegScreen1);
