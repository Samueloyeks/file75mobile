import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { companyRegActions, locationActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';
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
import CustomDatepicker from '../../components/atoms/CustomDatepicker';
import CustomSearchableDropdown from '../../components/atoms/CustomSearchableDropdown';
import WitnessFormView from '../../components/Layouts/WitnessFormView';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration17 from '../../assets/svg/Illustration17.svg'
import Info from '../../assets/svg/Info.svg'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/



function mapStateToProps(state) {
    const {
        companyRegData,
        companyRegType
    } = state.companyReg;

    const {
        countries
    } = state.location;

    return {
        companyRegData,
        companyRegType,
        countries
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(companyRegActions.saveData(data)),
        getCountries: (data) => dispatch(locationActions.getCountries(data))
    };
}





class LimitedCompanyRegScreen4 extends PureComponent {

    constructor(props) {
        super(props)
        this.updateWitnesses = this.updateWitnesses.bind(this)
        this.addWitnessForm = this.addWitnessForm.bind(this)
        this.remove = this.remove.bind(this)
        this.navigateToNextPage = this.navigateToNextPage.bind(this)
    }

    state = {
        sex:'',
        sexes: [
            { label: 'Male', value: 'male', },
            { label: 'Female', value: 'female' },
        ],
        dob: new Date(),
        witnesses: [],
        witnessForms: [],
        states: [],
        lgas: [],
        country: '',
        state: '',
        lga: '',
    }

    updateCountry = async (country) => {
        this.setState({ country: country.name });
        let states = await this.getStates(country.name);
        this.setState({ states });
    }
    updateState = async (state) => {
        this.setState({ state: state.name });
        let lgas = await this.getCities(state.name);
        this.setState({ lgas });
    }

    updateSex = (sex) => {
        this.setState({ sex })
    }

    updateDOB = (dob) => {
        this.setState({ dob })
    }

    async componentDidMount() {
        const { getCountries, countries, companyRegData } = this.props;


        await getCountries();
    }

    updateWitnesses = (witness) => {
        const { companyRegData } = this.props;
        companyRegData.articlesOfAssociation.witnesses.push(witness)
    }

    addWitnessForm = () => {
        this.setState({ witnessForms: [...this.state.witnessForms, ""] })
    }

    remove = (index) => {
        const { companyRegData } = this.props;
        companyRegData.articlesOfAssociation.witnesses = companyRegData.articlesOfAssociation.witnesses.filter((item) => item.index !== index);
    }

    navigateToNextPage = () => {
        const { navigation, companyRegType, companyRegData } = this.props;
        if (companyRegData.articlesOfAssociation.witnesses.length == 0) {
            alert('Please add a witness');
            return;
        }
        if (companyRegType === 'limited' || companyRegType === 'unlimited') {
            navigation.navigate('LimitedCompanyReg5')
        } else if (companyRegType === 'limitedByGuarantee') {
            navigation.navigate('LimitedCompanyReg10')
        }
    }

    // handleSubmit = async data => {
    //     const { country, state, lga } = this.state
    //     const { navigation, companyRegData } = this.props;

    //     var regData = { ...data }

    //     for (const key in regData) {
    //         companyRegData[key] = regData[key]
    //     }

    //     regData['articlesOfAssociation']['witness']['residentialAddress']['country'] = country;
    //     regData['articlesOfAssociation']['witness']['residentialAddress']['state'] = state;
    //     regData['articlesOfAssociation']['witness']['residentialAddress']['lga'] = lga;

    //     navigation.navigate('LimitedCompanyReg5');
    // }



    render() {
        const { navigation, loading, companyRegData, countries, companyRegType } = this.props;
        const {
            states,
            lgas,
            witnessForms
        } = this.state;

        let breadcrumbText = companyRegType

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
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
                        <Illustration17 />
                    </View>

                    <Text style={[styles.boldText, styles.textCenter]}>Articles of Association - Witness Information</Text>

                    <WitnessFormView
                        index={0}
                        navigation={navigation}
                        countries={countries}
                        updateWitnesses={this.updateWitnesses}
                        remove={this.remove}
                        title=''
                    />
                    {
                        witnessForms.map((directors, index) => {
                            return (
                                <WitnessFormView
                                    key={index + 1}
                                    index={index + 1}
                                    countries={countries}
                                    updateWitnesses={this.updateWitnesses}
                                    // removeText='Remove Director'
                                    remove={this.remove}
                                    title='New Witness'
                                />
                            )
                        })
                    }

                    <TouchableOpacity style={styles.addFormButton} onPress={this.addWitnessForm}>
                        <Text style={{ color: 'black', fontWeight: 'bold', textDecorationLine: 'underline' }}>Add More Witness</Text>
                    </TouchableOpacity>

                    <CustomButton
                        title='Next'
                        buttonStyle={styles.buttonStyle}
                        customStyle={styles.primaryButtonStyle}
                        onPress={this.navigateToNextPage}
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

                </ScrollView>
                <CustomFooter />

            </View>
        );
        // return (
        //     <View style={styles.customBackground}>
        //         <ScrollView
        //             showsVerticalScrollIndicator={false}
        //             keyboardShouldPersistTaps="handled"
        //             style={styles.content}>
        //             <View style={[Custom.mv30]}>
        //                 <Text style={[styles.boldText]}>
        //                     Company <TinyArrows />
        //                 </Text>
        //                 <Text style={[styles.boldText]}>
        //                     Registration Made <Text style={[styles.primary]}>Easy</Text>
        //                 </Text>
        //             </View>
        //             <View style={[styles.textInline, Custom.mv20, styles.textCenter,]}>
        //                 <Illustration17 />
        //             </View>

        //             <Text style={[styles.boldText, styles.textCenter, Custom.mb20]}>Articles of Association - Witness Information</Text>
        //             <Formik
        //                 initialValues={{
        //                     articlesOfAssociation: {
        //                         witness: {
        //                             phone: '',
        //                             email: '',
        //                             surname: '',
        //                             firstName: '',
        //                             otherName: '',
        //                             occupation: '',
        //                             residentialAddress: {
        //                                 city: '',
        //                                 houseNumber: '',
        //                                 streetName: '',
        //                                 postalCode: ''
        //                             },
        //                         }
        //                     }
        //                 }}
        //                 onSubmit={values => { this.handleSubmit(values) }}
        //                 validationSchema={validationSchema}
        //             >
        //                 {({ handleChange,
        //                     values,
        //                     handleSubmit,
        //                     errors,
        //                     isValid,
        //                     isSubmitting,
        //                     touched,
        //                     handleBlur
        //                 }) => (
        //                         // { this.renderElement() }
        //                         <View>
        //                             <CustomInput
        //                                 name='articlesOfAssociation.witness.surname'
        //                                 value={values.articlesOfAssociation.witness.surname}
        //                                 placeholder='Surname'
        //                                 // customStyle={[Custom.mt20]}
        //                                 iconName='asterisk'
        //                                 iconColor={Colors.DANGER}
        //                                 onChangeText={handleChange('articlesOfAssociation.witness.surname')}
        //                                 onBlur={handleBlur('articlesOfAssociation.witness.surname')}
        //                             />
        //                             <ErrorMessage errorValue={getIn(touched, 'articlesOfAssociation.witness.surname') && getIn(errors, 'articlesOfAssociation.witness.surname')} />

        //                             <CustomInput
        //                                 name='articlesOfAssociation.witness.firstName'
        //                                 value={values.articlesOfAssociation.witness.firstName}
        //                                 placeholder='First Name'
        //                                 // customStyle={[Custom.mt20]}
        //                                 iconName='asterisk'
        //                                 iconColor={Colors.DANGER}
        //                                 onChangeText={handleChange('articlesOfAssociation.witness.firstName')}
        //                                 onBlur={handleBlur('articlesOfAssociation.witness.firstName')}
        //                             />
        //                             <ErrorMessage errorValue={getIn(touched, 'articlesOfAssociation.witness.firstName') && getIn(errors, 'articlesOfAssociation.witness.firstName')} />

        //                             <CustomInput
        //                                 name='articlesOfAssociation.witness.otherName'
        //                                 value={values.articlesOfAssociation.witness.otherName}
        //                                 placeholder='Other Name'
        //                                 // customStyle={[Custom.mt20]}
        //                                 // iconName='asterisk'
        //                                 // iconColor={Colors.DANGER}
        //                                 onChangeText={handleChange('articlesOfAssociation.witness.otherName')}
        //                                 onBlur={handleBlur('articlesOfAssociation.witness.otherName')}
        //                             />
        //                             <ErrorMessage errorValue={getIn(touched, 'articlesOfAssociation.witness.otherName') && getIn(errors, 'articlesOfAssociation.witness.otherName')} />

        //                             <CustomInput
        //                                 name='articlesOfAssociation.witness.occupation'
        //                                 value={values.articlesOfAssociation.witness.occupation}
        //                                 placeholder='Occupation'
        //                                 // customStyle={[Custom.mt20]}
        //                                 iconName='asterisk'
        //                                 iconColor={Colors.DANGER}
        //                                 onChangeText={handleChange('articlesOfAssociation.witness.occupation')}
        //                                 onBlur={handleBlur('articlesOfAssociation.witness.occupation')}
        //                             />
        //                             <ErrorMessage errorValue={getIn(touched, 'articlesOfAssociation.witness.occupation') && getIn(errors, 'articlesOfAssociation.witness.occupation')} />

        //                             <CustomInput
        //                                 name='articlesOfAssociation.witness.phone'
        //                                 value={values.articlesOfAssociation.witness.phone}
        //                                 placeholder='Telephone No.'
        //                                 iconName='asterisk'
        //                                 iconColor={Colors.DANGER}
        //                                 // customStyle={[Custom.mt10]}
        //                                 keyboardType='phone-pad'
        //                                 onChangeText={handleChange('articlesOfAssociation.witness.phone')}
        //                                 onBlur={handleBlur('articlesOfAssociation.witness.phone')}
        //                             />
        //                             <ErrorMessage errorValue={getIn(touched, 'articlesOfAssociation.witness.phone') && getIn(errors, 'articlesOfAssociation.witness.phone')} />

        //                             <CustomInput
        //                                 name='articlesOfAssociation.witness.email'
        //                                 value={values.articlesOfAssociation.witness.email}
        //                                 placeholder='Email'
        //                                 iconName='asterisk'
        //                                 iconColor={Colors.DANGER}
        //                                 keyboardType='email-address'
        //                                 onChangeText={handleChange('articlesOfAssociation.witness.email')}
        //                                 autoCapitalize='none'
        //                                 onBlur={handleBlur('articlesOfAssociation.witness.email')}
        //                             />
        //                             <ErrorMessage errorValue={getIn(touched, 'articlesOfAssociation.witness.email') && getIn(errors, 'articlesOfAssociation.witness.email')} />

        //                             <Text style={[styles.boldText, Custom.mv10]}>Witness Residential Address</Text>

        //                             <CustomSearchableDropdown
        //                             options={countries}
        //                             onItemSelect={(item) => this.updateCountry(item)}
        //                             placeholder='Nationality'
        //                         />

        //                         <CustomSearchableDropdown
        //                             options={states}
        //                             onItemSelect={(item) => this.updateState(item)}
        //                             placeholder='State'
        //                         />

        //                         <CustomSearchableDropdown
        //                             options={lgas}
        //                             onItemSelect={(item) => this.setState({ lga: item.name })}
        //                             placeholder='LGA'
        //                         />

        //                         <CustomInput
        //                             name='articlesOfAssociation.witness.residentialAddress.city'
        //                             value={values.articlesOfAssociation.witness.residentialAddress.city}
        //                             placeholder='City/Town/Village'
        //                             // customStyle={[Custom.mt20]}
        //                             iconName='asterisk'
        //                             iconColor={Colors.DANGER}
        //                             onChangeText={handleChange('articlesOfAssociation.witness.residentialAddress.city')}
        //                             onBlur={handleBlur('articlesOfAssociation.witness.residentialAddress.city')}
        //                         />
        //                         <ErrorMessage errorValue={getIn(touched, 'articlesOfAssociation.witness.residentialAddress.city') && getIn(errors, 'articlesOfAssociation.witness.residentialAddress.city')} />

        //                         <CustomInput
        //                             name='articlesOfAssociation.witness.residentialAddress.postalCode'
        //                             value={values.articlesOfAssociation.witness.residentialAddress.postalCode}
        //                             placeholder='Postal Code'
        //                             // customStyle={[Custom.mt20]}
        //                             // iconName='asterisk'
        //                             iconColor={Colors.DANGER}
        //                             onChangeText={handleChange('articlesOfAssociation.witness.residentialAddress.postalCode')}
        //                             onBlur={handleBlur('articlesOfAssociation.witness.residentialAddress.postalCode')}
        //                         />
        //                         <ErrorMessage errorValue={getIn(touched, 'articlesOfAssociation.witness.residentialAddress.postalCode') && getIn(errors, 'articlesOfAssociation.witness.residentialAddress.postalCode')} />

        //                         <CustomInput
        //                             name='articlesOfAssociation.witness.residentialAddress.houseNumber'
        //                             value={values.articlesOfAssociation.witness.residentialAddress.houseNumber}
        //                             placeholder='House Number/Building Name'
        //                             // customStyle={[Custom.mt20]}
        //                             iconName='asterisk'
        //                             iconColor={Colors.DANGER}
        //                             onChangeText={handleChange('articlesOfAssociation.witness.residentialAddress.houseNumber')}
        //                             onBlur={handleBlur('articlesOfAssociation.witness.residentialAddress.houseNumber')}
        //                         />
        //                         <ErrorMessage errorValue={getIn(touched, 'articlesOfAssociation.witness.residentialAddress.houseNumber') && getIn(errors, 'articlesOfAssociation.witness.residentialAddress.houseNumber')} />

        //                         <CustomInput
        //                             name='articlesOfAssociation.witness.residentialAddress.streetName'
        //                             value={values.articlesOfAssociation.witness.residentialAddress.streetName}
        //                             placeholder='Street Name'
        //                             // customStyle={[Custom.mt20]}
        //                             iconName='asterisk'
        //                             iconColor={Colors.DANGER}
        //                             onChangeText={handleChange('articlesOfAssociation.witness.residentialAddress.streetName')}
        //                             onBlur={handleBlur('articlesOfAssociation.witness.residentialAddress.streetName')}
        //                         />
        //                         <ErrorMessage errorValue={getIn(touched, 'articlesOfAssociation.witness.residentialAddress.streetName') && getIn(errors, 'articlesOfAssociation.witness.residentialAddress.streetName')} />

        //                             <CustomButton
        //                                 title='Next'
        //                                 buttonStyle={styles.buttonStyle}
        //                                 customStyle={styles.primaryButtonStyle}
        //                                 onPress={handleSubmit}
        //                                 disabled={!isValid}
        //                                 buttonColor={Colors.SECONDARY}
        //                                 loading={loading}
        //                             />
        //                             <CustomButton
        //                                 title='Back'
        //                                 buttonStyle={styles.buttonStyle}
        //                                 customStyle={styles.secondaryButtonStyle}
        //                                 buttonColor={Colors.WHITE}
        //                                 onPress={() => navigation.goBack(null)}
        //                             />
        //                         </View>
        //                     )}
        //             </Formik>

        //         </ScrollView>
        //         <CustomFooter />

        //     </View>
        // );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LimitedCompanyRegScreen4); 
