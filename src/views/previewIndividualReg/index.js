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
import CustomSelect from '../../components/atoms/CustomSelect';
import { Input, Tooltip } from 'react-native-elements';


// svg 
import SmallArrowsPrimary from '../../assets/svg/SmallArrowsPrimary.svg'
import Illustration2 from '../../assets/svg/Illustration2.svg'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .min(11)
        .required('This is a required field'),
    // businessName1: Yup.string()
    //     .required('This is a required field'),
    // businessName2: Yup.string()
    //     .required('This is a required field'),
    // availabilityCode: Yup.string()
    //     .required('This is a required field'),
    principalAddress: Yup.string()
        .required('This is a required field'),
    fullName: Yup.string()
        .required('This is a required field'),
    surname: Yup.string()
        .required('This is a required field'),
    age: Yup.string()
        .required('This is a required field'),
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
    address: Yup.string()
        .required('This is a required field'),
    occupation: Yup.string()
        .required('This is a required field'),
    state: Yup.string()
        .required('This is a required field'),
    city: Yup.string()
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





class PreviewIndividualRegScreen extends PureComponent {

    state = {
        businessCategory: '',
        businessCategories: [
            { label: 'Food and Beverages', value: 'food/beverages', },
            { label: 'Fashion', value: 'fashion' },
            { label: 'Finance', value: 'finance' },
            { label: 'Information Technology', value: 'IT' },
            { label: 'Other', value: 'other' },
        ],
        sex: '',
        sexes: [
            { label: 'Male', value: 'male', },
            { label: 'Female', value: 'female' },
        ],
        nationality: '',
        nationalities: [
            { label: 'Nigerian', value: 'nigerian', },
            { label: 'Ghanian', value: 'ghanian' },
        ]
    }

    handleSubmit = async data => {
        const { navigation, save, businessRegData, updateServicePayment } = this.props;
        const { businessCategory, sex, nationality } = this.state;

        var regData = { ...data }
        for (const key in regData) {
            businessRegData[key] = regData[key]
        }

        businessRegData.charge = BUSINESS_REGISTRATION_CHARGE;
        businessRegData.businessCategory = businessCategory;
        businessRegData.sex = sex;
        // businessRegData.nationality = nationality;
 
        updateServicePayment('individualRegistration');
        navigation.navigate('SelectPaymentMethod');
    }


    updateCategory = (category) => {
        this.setState({ businessCategory: category })
    }

    updateSex = (sex) => {
        this.setState({ sex })
    }

    updateNationality = (nationality) => {
        this.setState({ nationality })
    }

    componentDidMount() {
        const { businessRegData } = this.props;

        this.setState({
            businessCategory: businessRegData.businessCategory,
            sex: businessRegData.sex,
            nationality: businessRegData.nationality
        })
    }

    render() {
        const { navigation, loading, businessRegData } = this.props;
        const { businessCategory, sex, nationality, businessCategories, sexes, nationalities } = this.state;

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
                            phone: businessRegData.phone,
                            principalAddress: businessRegData.principalAddress,
                            branchAddress: businessRegData.branchAddress,
                            availabilityCode: businessRegData.availabilityCode,
                            businessName1: businessRegData.businessName1,
                            businessName2: businessRegData.businessName2,
                            businessCategory: businessCategory,
                            fullName: businessRegData.fullName,
                            surname: businessRegData.surname,
                            sex: sex,
                            age: businessRegData.age,
                            email: businessRegData.email,
                            address: businessRegData.address,
                            occupation: businessRegData.occupation,
                            nationality: businessRegData.nationality,
                            state: businessRegData.state,
                            city: businessRegData.city,
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
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
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
                                    />

                                    {(values.businessCategory === 'other') ?
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
                                        name='surname'
                                        value={values.surname}
                                        placeholder='Any Former Forename or Surname'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('surname')}
                                        onBlur={handleBlur('surname')}
                                    />
                                    <ErrorMessage errorValue={touched.surname && errors.surname} />

                                    <CustomSelect
                                        options={sexes}
                                        selected={sex}
                                        updateSelected={this.updateSex}
                                        customStyle={[Custom.mb20]}
                                        required={true}
                                    />

                                    <CustomInput
                                        name='age'
                                        value={values.age}
                                        placeholder='Age'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        customStyle={[Custom.mt10]}
                                        keyboardType='number-pad'
                                        onChangeText={handleChange('age')}
                                        onBlur={handleBlur('age')}
                                    />
                                    <ErrorMessage errorValue={touched.age && errors.age} />

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
                                        name='email'
                                        value={values.email}
                                        placeholder='Email'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        keyboardType='email-address'
                                        onChangeText={handleChange('email')}
                                        autoCapitalize='none'
                                        onBlur={handleBlur('email')}
                                    />
                                    <ErrorMessage errorValue={touched.email && errors.email} />

                                    <CustomInput
                                        name='address'
                                        value={values.address}
                                        placeholder='Residential Address '
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        // customStyle={[Custom.mt10]}
                                        onChangeText={handleChange('address')}
                                        onBlur={handleBlur('address')}
                                    />
                                    <ErrorMessage errorValue={touched.address && errors.address} />

                                    <CustomInput
                                        name='occupation'
                                        value={values.occupation}
                                        placeholder='Occupation'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        // customStyle={[Custom.mt10]}
                                        onChangeText={handleChange('occupation')}
                                        onBlur={handleBlur('occupation')}
                                    />
                                    <ErrorMessage errorValue={touched.occupation && errors.occupation} />

                                    {/* <CustomSelect
                                        options={nationalities}
                                        selected={nationality}
                                        updateSelected={this.updateNationality}
                                        customStyle={[Custom.mb20]}
                                    /> */}

                                    <CustomInput
                                        name='nationality'
                                        value={values.nationality}
                                        placeholder='Nationality'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        // customStyle={[Custom.mt10]}
                                        onChangeText={handleChange('nationality')}
                                        onBlur={handleBlur('nationality')}
                                    />
                                    <ErrorMessage errorValue={touched.nationality && errors.nationality} />

                                    <CustomInput
                                        name='state'
                                        value={values.state}
                                        placeholder='State'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        // customStyle={[Custom.mt10]}
                                        onChangeText={handleChange('state')}
                                        onBlur={handleBlur('state')}
                                    />
                                    <ErrorMessage errorValue={touched.state && errors.state} />

                                    <CustomInput
                                        name='city'
                                        value={values.city}
                                        placeholder='City'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        // customStyle={[Custom.mt10]}
                                        onChangeText={handleChange('city')}
                                        onBlur={handleBlur('city')}
                                    />
                                    <ErrorMessage errorValue={touched.city && errors.city} />


                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{ uri: businessRegData.signature.path }}
                                            style={{ width: 200, height: 150, }}
                                        />
                                    </View>

                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{ uri: businessRegData.passport.path }}
                                            style={{ width: 200, height: 150, }}
                                        />
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
)(PreviewIndividualRegScreen);
