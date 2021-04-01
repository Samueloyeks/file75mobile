import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { businessRegActions, locationActions } from '../../store/actions';
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
import CustomSearchableDropdown from '../../components/atoms/CustomSearchableDropdown';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration5 from '../../assets/svg/Illustration5.svg'
import Info from '../../assets/svg/Info.svg'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .min(11)
        .required('This is a required field'),
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
    address: Yup.string()
        .required('This is a required field'),
    occupation: Yup.string()
        .required('This is a required field'),
    // nationality: Yup.string()
    //     .required('This is a required field'),
    // age: Yup.string()
    //     .required('This is a required field'),
})

function mapStateToProps(state) {
    const {
        businessRegData
    } = state.businessReg;

    const {
        countries
    } = state.location;

    return {
        countries,
        businessRegData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(businessRegActions.saveData(data)),
        getCountries: (data) => dispatch(locationActions.getCountries(data))
    };
}





class IndividualRegScreen3 extends PureComponent {

    state = {
        nationality: '',
    }



    handleSubmit = async data => {
        const { navigation, save, businessRegData } = this.props;
        const { nationality } = this.state;

        var regData = { ...data }
        for (const key in regData) {
            businessRegData[key] = regData[key]
        }
        businessRegData['nationality'] = nationality;

        navigation.navigate('IndividualReg4');
    }


    updateNationality = async (nationality) => {
        this.setState({ nationality: nationality.name });
    }

    async componentDidMount() {
        const { getCountries } = this.props;

        await getCountries();
    }

    render() {
        const { navigation, loading, businessRegData, countries } = this.props;
        // const { nationality, nationalities } = this.state;

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={styles.content}>
                    <View style={[Custom.mv30]}>
                        <Text style={[styles.boldText]}>
                            Business Name <TinyArrows />
                        </Text>
                        <Text style={[styles.boldText]}>
                            Registration Made <Text style={[styles.primary]}>Easy</Text>
                        </Text>
                    </View>
                    <View style={[styles.textInline, Custom.mv20, styles.textCenter,]}>
                        <Illustration5 />
                    </View>
                    <Text style={[Custom.mv20, Typography.FONT_BOLD]}>Particulars of Proprietors (the relevant information are as follows:</Text>
                    <Formik
                        initialValues={{ phone: '', email: '', address: '', occupation: '' }}
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
                                        name='phone'
                                        value={values.phone}
                                        placeholder='Telephone No.'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        // customStyle={[Custom.mt10]}
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
                                        onBlur={handleBlur('age')}
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
                                        placeholder={{label:'Nationality'}}

                                    /> */}

                                    {/* <CustomInput
                                        name='nationality'
                                        value={values.nationality}
                                        placeholder='Nationality'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        // customStyle={[Custom.mt10]}
                                        onChangeText={handleChange('nationality')}
                                        onBlur={handleBlur('nationality')}
                                    />
                                    <ErrorMessage errorValue={touched.nationality && errors.nationality} /> */}

                                    <CustomSearchableDropdown
                                        options={countries}
                                        onItemSelect={(item) => this.updateNationality(item)}
                                        placeholder='Nationality'
                                    />


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
)(IndividualRegScreen3); 
