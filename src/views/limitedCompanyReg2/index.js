import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { companyRegActions, locationActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';
import { locationService } from '../../services/locationService'
import { formatCamelCase, capitalizeWords } from '../../helpers/encode'
import NaijaStates from 'naija-state-local-government';



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
import Illustration9 from '../../assets/svg/Illustration9.svg'
import Info from '../../assets/svg/Info.svg'



const validationSchema = Yup.object().shape({
    businessActivityDescription: Yup.string()
        .required('This is a required field'),
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
    registeredAddress: Yup.object().shape({
        city: Yup.string()
            .required('This is a required field'),
        houseNumber: Yup.string()
            .required('This is a required field'),
        streetName: Yup.string()
            .required('This is a required field'),
        // lga: Yup.string()
        //     .required('This is a required field')
    })
})

function mapStateToProps(state) {
    const {
        companyRegData,
        businessObjects,
        companyRegType,
        naturesOfBusiness
    } = state.companyReg;

    const {
        states,
        countries
    } = state.location;

    return {
        states,
        countries,
        companyRegData,
        businessObjects,
        naturesOfBusiness,
        companyRegType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(companyRegActions.saveData(data)),
        getStates: (data) => dispatch(locationActions.getStates(data)),
        getCountries: (data) => dispatch(locationActions.getCountries(data)),
    };
}





class LimitedCompanyRegScreen2 extends PureComponent {

    state = {
        businessCategory: '',
        businessObject: null,
        selectedCompanyType: '',
        companyType: '',
        businessActivity1: '',
        businessActivities1: [
            { label: 'Test', value: 'test' },
            { label: 'Test2', value: 'test2', },
        ],
        businessActivity2: '',
        businessActivities2: [
            { label: 'Test', value: 'test' },
            { label: 'Test2', value: 'test2', },
        ],
        subNaturesOfBusiness: [],
        headOfficeCountry: '',
        headOfficeStates: [],
        state: '',
        headOfficeState: '',
        lgas: [],
        headOfficeLgas: [],
        lga: '',
        headOfficeLga: '',
        headOfficeStatesLoading: false
    }

    handleSubmit = async data => {
        const { navigation, save, companyRegData } = this.props;
        const {
            businessCategory,
            businessObject,
            companyType,
            state,
            lga,
            headOfficeCountry,
            headOfficeState,
            headOfficeLga,
            businessActivity1,
            businessActivity2
        } = this.state;

        var regData = { ...data }
        for (const key in regData) {
            companyRegData[key] = regData[key]
        }

        if (
            state == '' ||
            businessActivity1 == '' ||
            businessActivity2 == ''
        ) {
            alert('Please complete entire form');
            return;
        }

        companyRegData['registeredAddress']['state'] = state;
        companyRegData['registeredAddress']['lga'] = lga;

        companyRegData['headOfficeAddress']['country'] = headOfficeCountry;
        companyRegData['headOfficeAddress']['state'] = headOfficeState;

        if (headOfficeCountry === 'Nigeria') {
            companyRegData['headOfficeAddress']['lga'] = headOfficeLga
        }

        // companyRegData['companyType'] = companyType
        companyRegData['businessActivity1'] = businessActivity1
        companyRegData['businessActivity2'] = businessActivity2


        navigation.navigate('LimitedCompanyReg3');
    }

    updateCategory = (category) => {
        this.setState({ businessCategory: category })
    }


    updateBusinessActivity1 = async (object) => {
        this.setState({
            subNaturesOfBusiness: object.subcategories,
            businessActivity1: object.name
        });
    }

    updateBusinessActivity2 = async (object) => {
        this.setState({
            businessActivity2: object.name
        });
    }

    updateHeadOfficeCountry = async (country) => {
        this.setState({ headOfficeCountry: country.name, headOfficeStatesLoading: true });
        let states = await this.getStates(country.name);
        this.setState({ headOfficeStates: states, headOfficeStatesLoading: false });
    }

    updateState = async (state) => {
        this.setState({ state: state.name });
        let lgas = [];
        let lgaNames = await NaijaStates.lgas(state.name).lgas;
        for (var name of lgaNames) lgas.push({ 'name': name })
        this.setState({ lgas });

        // let lgas = await this.getCities(state.name);
    }

    updateHeadOfficeState = async (state) => {
        this.setState({ headOfficeState: state.name });
        let lgas = [];
        let lgaNames = await NaijaStates.lgas(state.name).lgas;
        for (var name of lgaNames) lgas.push({ 'name': name })
        // let lgas = await this.getCities(state.name);
        this.setState({ headOfficeLgas: lgas });
    }

    async getStates(country) {
        const states = await locationService.getStates(country);
        return states;
    }

    async getCities(state) {
        const cities = await locationService.getCities(state);
        return cities;
    }


    async componentDidMount() {
        const { companyRegType, getStates, naturesOfBusiness, getCountries } = this.props;
        await getCountries();
        await getStates('Nigeria')


        if (companyRegType == 'unlimited' || companyRegType == 'limitedByGuarantee') {
            this.setState({ companyType: companyRegType })
        }
        this.setState({ companyRegType })
    }

    render() {
        const { navigation, loading, companyRegType, naturesOfBusiness, states, countries } = this.props;
        const {
            businessActivities1,
            businessActivity1,
            businessActivities2,
            businessActivity2,
            businessCategory,
            headOfficeStates,
            headOfficeLgas,
            lgas,
            subNaturesOfBusiness,
            headOfficeStatesLoading,
            headOfficeCountry
        } = this.state;

        let breadcrumbText = companyRegType

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={styles.content}>
                    <Text style={[Custom.breadcrumbText, styles.boldText]}>
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
                        <Illustration9 />
                    </View>


                    <Formik
                        initialValues={{
                            businessActivityDescription: '',
                            email: '',
                            registeredAddress: {
                                city: '',
                                houseNumber: '',
                                streetName: '',
                                postalCode: '',
                                lga: ''
                            },
                            headOfficeAddress: {
                                city: '',
                                houseNumber: '',
                                streetName: '',
                                postalCode: '',
                                lga: ''
                            }
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
                                <View>

                                    <CustomSearchableDropdown
                                        options={naturesOfBusiness}
                                        selected={businessActivity1}
                                        onItemSelect={(item) => this.updateBusinessActivity1(item)}
                                        // customStyle={[Custom.mb20]}
                                        placeholder='Principal Business Activity - Classification 1'
                                        required={true}
                                    />

                                    <CustomSearchableDropdown
                                        options={subNaturesOfBusiness}
                                        selected={businessActivity2}
                                        onItemSelect={(item) => this.updateBusinessActivity2(item)}
                                        // customStyle={[Custom.mb20]}
                                        placeholder='Principal Business Activity - Classification 2'
                                        required={true}
                                    />


                                    <CustomInput
                                        name='businessActivityDescription'
                                        value={values.businessActivityDescription}
                                        placeholder='Principal Activity Description'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        customStyle={{ height: 150 }}
                                        rows={5}
                                        multiline={true}
                                        onChangeText={handleChange('businessActivityDescription')}
                                        onBlur={handleBlur('businessActivityDescription')}
                                    />
                                    <ErrorMessage errorValue={touched.businessActivityDescription && errors.businessActivityDescription} />


                                    <CustomInput
                                        name='email'
                                        value={values.email}
                                        placeholder='Email Address of the Company'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        keyboardType='email-address'
                                        onChangeText={handleChange('email')}
                                        autoCapitalize='none'
                                        onBlur={handleBlur('email')}
                                    />
                                    <ErrorMessage errorValue={touched.email && errors.email} />

                                    <Text style={[styles.boldText, Custom.mv10]}>Company Registered Address</Text>

                                    {/* <CustomSearchableDropdown
                                        options={countries}
                                        onItemSelect={(item) => this.updateCountry(item)}
                                        placeholder='Nationality'
                                    /> */}

                                    <CustomSearchableDropdown
                                        options={states}
                                        onItemSelect={(item) => this.updateState(item)}
                                        placeholder='State'
                                        required={true}
                                    />

                                    <CustomSearchableDropdown
                                        options={lgas}
                                        onItemSelect={(item) => this.setState({ lga: item.name })}
                                        placeholder='LGA'
                                        required={true}
                                    />

                                    {/* <CustomInput
                                        name='registeredAddress.lga'
                                        value={values.registeredAddress.lga}
                                        placeholder='LGA'
                                        // customStyle={[Custom.mt20]}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('registeredAddress.lga')}
                                        onBlur={handleBlur('registeredAddress.lga')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'registeredAddress.lga') && getIn(errors, 'registeredAddress.lga')} /> */}

                                    <CustomInput
                                        name='registeredAddress.city'
                                        value={values.registeredAddress.city}
                                        placeholder='City/Town/Village'
                                        // customStyle={[Custom.mt20]}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('registeredAddress.city')}
                                        onBlur={handleBlur('registeredAddress.city')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'registeredAddress.city') && getIn(errors, 'registeredAddress.city')} />

                                    <CustomInput
                                        name='registeredAddress.postalCode'
                                        value={values.registeredAddress.postalCode}
                                        placeholder='Postal Code'
                                        // customStyle={[Custom.mt20]}
                                        // iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('registeredAddress.postalCode')}
                                        onBlur={handleBlur('registeredAddress.postalCode')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'registeredAddress.postalCode') && getIn(errors, 'registeredAddress.postalCode')} />

                                    <CustomInput
                                        name='registeredAddress.houseNumber'
                                        value={values.registeredAddress.houseNumber}
                                        placeholder='House Number/Building Name'
                                        // customStyle={[Custom.mt20]}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('registeredAddress.houseNumber')}
                                        onBlur={handleBlur('registeredAddress.houseNumber')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'registeredAddress.houseNumber') && getIn(errors, 'registeredAddress.houseNumber')} />

                                    <CustomInput
                                        name='registeredAddress.streetName'
                                        value={values.registeredAddress.streetName}
                                        placeholder='Street Name'
                                        // customStyle={[Custom.mt20]}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('registeredAddress.streetName')}
                                        onBlur={handleBlur('registeredAddress.streetName')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'registeredAddress.streetName') && getIn(errors, 'registeredAddress.streetName')} />


                                    <Text style={[Custom.mv10]}>Head Office Address (If different from registered office)</Text>

                                    <CustomSearchableDropdown
                                        options={countries}
                                        onItemSelect={(item) => this.updateHeadOfficeCountry(item)}
                                        placeholder='Nationality'
                                    />

                                    {
                                        !headOfficeStatesLoading ?
                                            <CustomSearchableDropdown
                                                options={headOfficeStates}
                                                onItemSelect={(item) => this.updateHeadOfficeState(item)}
                                                placeholder='State'
                                            />
                                            :
                                            <Text style={[Custom.mv10]}>Loading states...</Text>
                                    }

                                    {
                                        headOfficeCountry === 'Nigeria' ?
                                            <CustomSearchableDropdown
                                                options={headOfficeLgas}
                                                onItemSelect={(item) => this.setState({ headOfficeLga: item.name })}
                                                placeholder='LGA'
                                            />
                                            :
                                            <View>
                                                <CustomInput
                                                    name='headOfficeAddress.lga'
                                                    value={values.headOfficeAddress.lga}
                                                    placeholder='LGA'
                                                    // customStyle={[Custom.mt20]}
                                                    // iconName='asterisk'
                                                    // iconColor={Colors.DANGER}
                                                    onChangeText={handleChange('headOfficeAddress.lga')}
                                                    onBlur={handleBlur('headOfficeAddress.lga')}
                                                />
                                                <ErrorMessage errorValue={getIn(touched, 'headOfficeAddress.lga') && getIn(errors, 'headOfficeAddress.lga')} />
                                            </View>
                                    }




                                    <CustomInput
                                        name='headOfficeAddress.city'
                                        value={values.headOfficeAddress.city}
                                        placeholder='City/Town/Village'
                                        // customStyle={[Custom.mt20]}
                                        // iconName='asterisk'
                                        // iconColor={Colors.DANGER}
                                        onChangeText={handleChange('headOfficeAddress.city')}
                                        onBlur={handleBlur('headOfficeAddress.city')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'headOfficeAddress.city') && getIn(errors, 'headOfficeAddress.city')} />

                                    <CustomInput
                                        name='headOfficeAddress.postalCode'
                                        value={values.headOfficeAddress.postalCode}
                                        placeholder='Postal Code'
                                        // customStyle={[Custom.mt20]}
                                        // iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('headOfficeAddress.postalCode')}
                                        onBlur={handleBlur('headOfficeAddress.postalCode')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'headOfficeAddress.postalCode') && getIn(errors, 'headOfficeAddress.postalCode')} />

                                    <CustomInput
                                        name='headOfficeAddress.houseNumber'
                                        value={values.headOfficeAddress.houseNumber}
                                        placeholder='House Number/Building Name'
                                        // customStyle={[Custom.mt20]}
                                        // iconName='asterisk'
                                        // iconColor={Colors.DANGER}
                                        onChangeText={handleChange('headOfficeAddress.houseNumber')}
                                        onBlur={handleBlur('headOfficeAddress.houseNumber')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'headOfficeAddress.houseNumber') && getIn(errors, 'headOfficeAddress.houseNumber')} />

                                    <CustomInput
                                        name='headOfficeAddress.streetName'
                                        value={values.headOfficeAddress.streetName}
                                        placeholder='Street Name'
                                        // customStyle={[Custom.mt20]}
                                        // iconName='asterisk'
                                        // iconColor={Colors.DANGER}
                                        onChangeText={handleChange('headOfficeAddress.streetName')}
                                        onBlur={handleBlur('headOfficeAddress.streetName')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'headOfficeAddress.streetName') && getIn(errors, 'headOfficeAddress.streetName')} />


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
)(LimitedCompanyRegScreen2);
