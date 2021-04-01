import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { reservationActions, serviceActions, businessRegActions } from '../../store/actions';
import { capitalizeWords } from '../../helpers/encode'


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
import CustomSearchableDropdown from '../../components/atoms/CustomSearchableDropdown';


// svg 
import SmallArrows from '../../assets/svg/SmallArrows.svg'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .min(11)
        .required('This is a required field'),
    companyName1: Yup.string()
        .required('This is a required field'),
    // companyName2: Yup.string()
    //     .required('This is a required field'),
    // additionalComment: Yup.string()
    //     .required('This is a required field'),
})

function mapStateToProps(state) {
    const {
        reservationType,
        companyReservationType
    } = state.reserve;

    const {
        naturesOfBusiness
    } = state.businessReg;

    return {
        reservationType,
        companyReservationType,
        naturesOfBusiness
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(reservationActions.saveData(data)),
        updateServicePayment: (service) => dispatch(serviceActions.updateServicePayment(service)),
        getNaturesOfBusiness: () => dispatch(businessRegActions.getNaturesOfBusiness())
    };
}





class ReserveNameScreen extends PureComponent {

    state = {
        type: 'businessName',
        suffix1: '',
        suffix2: '',
        suffixes: [
            { label: 'Limited', value: 'limited', },
            { label: 'LTD', value: 'ltd' },
            { label: 'PLC', value: 'plc' },
            { label: 'LTD/GTE', value: 'ltd/gte' },
            { label: 'ULTD', value: 'ultd' },
            { label: 'UNLIMITED', value: 'unlimited' },
        ],
        suffixes2: [
            { label: 'Limited', value: 'limited', },
            { label: 'LTD', value: 'ltd' },
            { label: 'PLC', value: 'plc' },
        ],
        suffixes3: [
            { label: 'ULTD', value: 'ultd' },
            { label: 'UNLIMITED', value: 'unlimited' },
        ],
        suffixes4: [
            { label: 'Limited', value: 'limited', },
            { label: 'LTD', value: 'ltd' }
        ],
        suffixes5: [
            { label: 'PLC', value: 'plc' },
        ],
        specificBusinessType: '',
        specificBusinessTypes: [
            { label: 'Sole Proprietor', value: 'sole proprietor' },
            { label: 'Partnership', value: 'partnership', },
        ],
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
        companyType: '',
        companyTypes: [
            { label: 'Private', value: 'private' },
            { label: 'Public', value: 'public', },
        ],
        subNaturesOfBusiness: []
    }

    handleSubmit = async data => {
        const {
            navigation,
            save,
            reservationType,
            updateServicePayment,
            companyReservationType
        } = this.props;
        const {
            suffix1,
            suffix2,
            natureOfBusiness,
            specificNature,
            specificBusinessType,
            companyType,
        } = this.state;

        if (reservationType === 'businessName') {
            if (!this.checkBusinessName(data.companyName1) || !this.checkBusinessName(data.companyName2)) {
                alert('Your business name cannot contain company or Incorporated trustees attachments')
            }
            if (
                natureOfBusiness == '' ||
                specificNature == '' ||
                specificBusinessType == ''
            ) {
                alert('Please complete entire form');
                return;
            }

            data.natureOfBusiness = natureOfBusiness
            data.specificNature = specificNature
            data.specificBusinessType = specificBusinessType

        } else if (reservationType === 'companyName') {
            if (companyReservationType == '') {
                alert('Please complete entire form');
                return;
            }

            if (!suffix1) {
                alert('Please select company type');
                return;
            }

            if (companyReservationType == 'limited' && !companyType) {
                alert('Please select limited company type');
                return;
            }

            data.companyName1 = `${data.companyName1} ${suffix1}`
            data.companyName2 = data.companyName2 ? `${data.companyName2} ${suffix2}` : ''

            data.companyReservationType = companyReservationType
            data.companyType = companyType != '' ? companyType : companyReservationType
        } else if (reservationType === 'IT') {
            data.companyName1 = `Incorporated Trustees Of ${data.companyName1}`
            data.companyName2 = `Incorporated Trustees Of ${data.companyName2}`

        }


        data.type = reservationType
        data.charge = NAME_RESERVATION_CHARGE;
        save(data);
        updateServicePayment('nameReservation')
        navigation.navigate('SelectPaymentMethod');
    }

    checkBusinessName = (name) => {
        let n = name.replace(/[\[\]?.,\/#!$%\^&\*;:{}=\\|_~()]/g, "").split(" ");
        let last = n[n.length - 1].toLowerCase()
        var firstThree = name.split(' ').slice(0, 3).join(' ').toLowerCase()

        if (
            last === 'limited' ||
            last === 'ltd' ||
            last === 'plc' ||
            last === 'ltd/gte' ||
            last === 'ultd' ||
            last === 'unlimited' ||
            last === 'gte'
        ) {
            return false
        }

        if (firstThree === 'incorporated trustees of') return false

        return true
    }

    updateSuffix1 = (suffix1) => {
        this.setState({ suffix1 })
    }
    updateSuffix2 = (suffix2) => {
        this.setState({ suffix2 })
    }

    updateSpecificBusinessType = (specificBusinessType) => {
        this.setState({ specificBusinessType })
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

    updateCompanyType = (companyType) => {
        const {
            suffixes4,
            suffixes5,
        } = this.state;
        this.setState({ companyType })
        companyType == 'private' ? this.setState({ suffixes: suffixes4 }) : this.setState({ suffixes: suffixes5 })
    }

    async componentDidMount() {
        const { reservationType, companyReservationType, getNaturesOfBusiness } = this.props;
        const {
            suffixes,
            suffixes2,
            suffixes3,
        } = this.state;

        if (reservationType === 'companyName') {
            companyReservationType == 'limited' ? this.setState({ suffixes: suffixes2 }) : this.setState({ suffixes: suffixes3 })
        }
        await getNaturesOfBusiness();
    }


    render() {
        const { navigation, loading, reservationType, companyReservationType, naturesOfBusiness } = this.props;
        const {
            suffixes,
            suffixes2,
            suffixes3,
            suffix1,
            suffix2,
            specificBusinessType,
            specificBusinessTypes,
            natureOfBusiness,
            subNaturesOfBusiness,
            specificNature,
            specificNatures,
            companyType,
            companyTypes
        } = this.state;
        let ReservationInput = null
        let breadcrumbText = null
        let breadcrumbText2 = null

        if (reservationType === 'businessName') {
            ReservationInput = CustomInput
            breadcrumbText = 'Business Name Reservation'
        } else if (reservationType === 'companyName') {
            ReservationInput = SuffixInput
            breadcrumbText = 'Company Name Reservation'
            breadcrumbText2 = companyReservationType
        } else if (reservationType === 'IT') {
            ReservationInput = PrefixInput
            breadcrumbText = 'Incorporated Trustee'
        } else {
            ReservationInput = CustomInput
        }

        const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={styles.content}>
                    <Text style={[Custom.breadcrumbText, styles.boldText]}>
                        {"Name Reservation > " + breadcrumbText}
                        {breadcrumbText2 ? " > " + capitalizeWords(breadcrumbText2) : null}
                    </Text>
                    <View style={[styles.textCenter, Custom.mv30]}>
                        <Text style={[styles.boldText, styles.largeText]}>
                            Name Reservation Made <Text style={styles.primary}>Easy</Text> <SmallArrows />
                        </Text>
                    </View>
                    <View style={[styles.textInline, Custom.mb30]}>
                        <Text>Propose enterprise names and submit a valid phone number.</Text>
                        <ClickableText
                            text='Learn more'
                            textStyle={[styles.boldText, styles.primary]}
                            action={() => navigation.navigate('ReservationInfo')} />
                    </View>
                    <Formik
                        initialValues={{ phone: '', companyName1: '', companyName2: '', additionalComment: '' }}
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

                                    {
                                        reservationType === 'businessName' ?
                                            <CustomSelect
                                                options={specificBusinessTypes}
                                                selected={specificBusinessType}
                                                updateSelected={this.updateSpecificBusinessType}
                                                customStyle={[Custom.mb20]}
                                                placeholder={{ label: 'Specific Type' }}
                                                required={true}
                                            />
                                            : null
                                    }

                                    {
                                        (reservationType == 'companyName' && companyReservationType == 'limited') ?
                                            <CustomSelect
                                                options={companyTypes}
                                                selected={companyType}
                                                updateSelected={this.updateCompanyType}
                                                customStyle={[Custom.mb20]}
                                                placeholder={{ label: 'Type of Business' }}
                                                required={true}
                                            /> : null
                                    }

                                    <ReservationInput
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

                                    <ReservationInput
                                        name='companyName2'
                                        value={values.companyName2}
                                        placeholder='Second preferred name'
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

                                    {
                                        reservationType === 'businessName' ?
                                            <View>
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
                                            </View>
                                            : null
                                    }

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
)(ReserveNameScreen);
