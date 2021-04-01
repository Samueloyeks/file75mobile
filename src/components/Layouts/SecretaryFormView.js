import React, { Component, PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { companyRegActions, locationActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';
import { locationService } from '../../services/locationService'


import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
import NaijaStates from 'naija-state-local-government';

// components 
import CustomInput from '../atoms/CustomInput';
import CustomButton from '../atoms/CustomButton';
import ErrorMessage from '../atoms/ErrorMessage';
import CustomSelect from '../atoms/CustomSelect';
import CustomDatepicker from '../atoms/CustomDatepicker';
import CustomSearchableDropdown from '../atoms/CustomSearchableDropdown';
import UploadInput from '../atoms/UploadInput';
import PrefixInput from '../atoms/PrefixInput';



// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration12 from '../../assets/svg/Illustration12.svg'
import Upload from '../../assets/svg/Upload.svg'
import Naira from '../../assets/svg/Naira.svg'
import Passport from '../../assets/svg/Passport.svg'



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const individualValidationSchema = Yup.object().shape({
    surname: Yup.string()
        .required('This is a required field'),
    firstName: Yup.string()
        .required('This is a required field'),
    occupation: Yup.string()
        .required('This is a required field'),
    documentId: Yup.string()
        .required('This is a required field'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .required('This is a required field')
        .min(11),
    email: Yup.string()
        .label('Email')
        .required('This is a required field')
        .email('Enter a valid email'),
    principalAddress: Yup.object().shape({
        city: Yup.string()
            .required('This is a required field'),
        houseNumber: Yup.string()
            .required('This is a required field'),
        streetName: Yup.string()
            .required('This is a required field'),
        // lga: Yup.string()
        //     .required('This is a required field')
    }),
})

const corporateValidationSchema = Yup.object().shape({
    companyName: Yup.string()
        .required('This is a required field'),
    regNum: Yup.string()
        .required('This is a required field'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .required('This is a required field')
        .min(11),
    email: Yup.string()
        .label('Email')
        .required('This is a required field')
        .email('Enter a valid email'),
    principalAddress: Yup.object().shape({
        city: Yup.string()
            .required('This is a required field'),
        houseNumber: Yup.string()
            .required('This is a required field'),
        streetName: Yup.string()
            .required('This is a required field'),
        // lga: Yup.string()
        //     .required('This is a required field')
    }),
})

function mapStateToProps(state) {
    const {
        companyRegData
    } = state.companyReg;


    return {
        companyRegData
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}


class SecretaryFormView extends Component {


    state = {
        sex:'',
        sexes: [
            { label: 'Male', value: 'male', },
            { label: 'Female', value: 'female' },
        ],
        documentTypes: [
            { label: 'Driver’s License ', value: "Driver's license", },
            { label: 'National Identity Card', value: 'National Id' },
            { label: 'Permanent Voters Card', value: 'Voters Card' },
            { label: 'International Passport', value: 'Passport' },
        ],
        documentTypes2: [
            { label: 'International Passport', value: 'Passport' },
        ],
        defaultDocumentTypes: [
            { label: 'Driver’s License ', value: "Driver's license", },
            { label: 'National Identity Card', value: 'National Id' },
            { label: 'Permanent Voters Card', value: 'Voters Card' },
            { label: 'International Passport', value: 'Passport' },
        ],
        secretaryType: '',
        secretaryTypes: [
            { label: 'Corporate Body', value: 'corporateBody' },
            { label: 'Individual', value: 'individual', },
        ],
        documentType: '',
        dob: new Date(),
        country: '',
        states: [],
        state: '',
        lgas: [],
        lga: '',
        nationality: '',
        formerNationality: '',
        signature: null,
        passport: null,
        document: null,
        uploading: '',
        statesLoading: false
    }



    updateSecretaryType = (secretaryType) => {
        const { documentTypes2, defaultDocumentTypes } = this.state;
        this.setState({ secretaryType })
        if (secretaryType == 'individual') {
            this.setState({ documentTypes: documentTypes2 })
        } else {
            this.setState({ documentTypes: defaultDocumentTypes })
        }
    }

    async getStates(country) {
        const states = await locationService.getStates(country);
        return states;
    }

    async getCities(state) {
        const cities = await locationService.getCities(state);
        return cities;
    }

    updateSex = (sex) => {
        this.setState({ sex })
    }

    updateDocType = (documentType) => {
        this.setState({ documentType })
    }

    updateDOB = (dob) => {
        this.setState({ dob })
    }


    updateNationality = async (nationality) => {
        const { documentTypes2, defaultDocumentTypes } = this.state;
        this.setState({ nationality: nationality.name });

        if (nationality.country_name !== 'Nigeria') {
            this.setState({ documentTypes: documentTypes2 })
        } else {
            this.setState({ documentTypes: defaultDocumentTypes })
        }
    }


    updateCountry = async (country) => {
        this.setState({ country: country.name, statesLoading: true });
        let states = await this.getStates(country.name);
        this.setState({ states, statesLoading: false });
    }

    updateState = async (state) => {
        // let lgas = await this.getCities(state.name);
        let lgas = [];
        this.setState({ state: state.name });
        let lgaNames = await NaijaStates.lgas(state.name).lgas;
        for (var name of lgaNames) lgas.push({ 'name': name })

        this.setState({ lgas });
    }


    showActionSheet = (uploading) => {
        this.setState({ uploading }, () => {
            this.ActionSheet.show()
        })
    }

    getImageFrom(index) {
        const { uploading } = this.state;

        if (index === 0) {
            this.selectCameraImage(uploading)
        }
        if (index === 1) {
            this.selectGalleryImages(uploading)
        }
    }

    selectGalleryImages = (uploading) => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            multiple: false,
            title: 'Select a Picture',
            maxFiles: 4,
            includeBase64: true,
            writeTempFile: true,
            avoidEmptySpaceAroundImage: true,
            loadingLabelText: 'Loading Images...',
            showsSelectedCount: true,
            avoidEmptySpaceAroundImage: true,
            showCropGuidelines: true,
            showCropFrame: true,
            enableRotationGesture: true,
        }).then(image => {
            this.setState({ [uploading]: image })
        });
    }

    selectCameraImage = (uploading) => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true,
            writeTempFile: true,
            avoidEmptySpaceAroundImage: true,
            loadingLabelText: 'Loading Images...',
            showsSelectedCount: true,
            avoidEmptySpaceAroundImage: true,
            showCropGuidelines: true,
            showCropFrame: true,
            enableRotationGesture: true,
        }).then(image => {
            this.setState({ [uploading]: image })
        });
    }

    removeImage = (removing) => {
        this.setState({
            [removing]: null
        })
    }

    sameDay(d1, d2) {
        let date1 = new Date(d1);
        let date2 = new Date(d2);
        return date1.toDateString() === date2.toDateString();
    }

    // renderForm() {
    //     const { secretaryType } = this.state;

    //     if (secretaryType === 'individual') {
    //         return (

    //         )
    //     } else if (secretaryType === 'corporateBody') {
    //         return (

    //         )
    //     } else {
    //         return null
    //     }
    // }

    handleSubmit = async data => {
        const { navigation, save, companyRegData, updateSecretary } = this.props;
        const {
            secretaryType,
            sex,
            documentType,
            dob,
            nationality,
            formerNationality,
            country,
            state,
            lga,
            signature,
            passport,
            document,
            serviceCountry,
            serviceState,
            serviceLga
        } = this.state;

        if (country == '' ||
            state == ''
        ) {
            alert('Please complete entire form');
            return;
        } else if (
            secretaryType === 'individual' && (
                sex == '' ||
                nationality == '' ||
                documentType == '' ||
                !signature ||
                !document ||
                !passport
            )
        ) {
            alert('Please complete entire form');
            return;
        }

        var regData = { ...data }


        if (secretaryType === 'individual') {
            regData['sex'] = sex;
            regData['documentType'] = documentType;
            regData['nationality'] = nationality;
            regData['formerNationality'] = formerNationality;
            regData['dob'] = dob.toISOString();
            regData['signature'] = signature;
            regData['passport'] = passport;
            regData['document'] = document;
        }
        regData['secretaryType'] = secretaryType;
        regData['principalAddress']['country'] = country;
        regData['principalAddress']['state'] = state;
        if (country === 'Nigeria') regData['principalAddress']['lga'] = lga;

        updateSecretary(regData);
    }

    render() {
        const {
            secretaryType,
            secretaryTypes,
            sex,
            sexes,
            dob,
            states,
            lgas,
            documentTypes,
            documentType,
            signature,
            passport,
            document,
            added,
            statesLoading,
            country
        } = this.state;

        const { countries, navigation } = this.props;

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={styles.content}>
                <View style={[Custom.mv30]}>
                    <Text style={[styles.boldText]}>
                        Company <TinyArrows />
                    </Text>
                    <Text style={[styles.boldText]}>
                        Registration Made <Text style={[styles.primary]}>Easy</Text>
                    </Text>
                </View>
                <View style={[styles.textInline, Custom.mv20, styles.textCenter,]}>
                    <Illustration12 />
                </View>
                <Text style={[Custom.mv20, Typography.FONT_BOLD]}>Secretary</Text>
                <Formik
                    initialValues={
                        secretaryType === 'individual' ?
                            {
                                surname: '',
                                firstName: '',
                                otherName: '',
                                formerName: '',
                                occupation: '',
                                documentId: '',
                                email: '',
                                phone: '',
                                principalAddress: {
                                    city: '',
                                    houseNumber: '',
                                    streetName: '',
                                    postalCode: '',
                                    lga: ''
                                }
                            }
                            :
                            {
                                companyName: '',
                                regNum: '',
                                phone: '',
                                email: '',
                                principalAddress: {
                                    city: '',
                                    houseNumber: '',
                                    streetName: '',
                                    postalCode: '',
                                    lga: ''
                                }
                            }
                    }
                    onSubmit={values => { this.handleSubmit(values) }}
                    validationSchema={secretaryType === 'individual' ? individualValidationSchema : corporateValidationSchema}
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

                                <CustomSelect
                                    options={secretaryTypes}
                                    selected={secretaryType}
                                    updateSelected={this.updateSecretaryType}
                                    customStyle={[Custom.mb20]}
                                    placeholder={{ label: 'Secretary Type' }}
                                />




                                {
                                    secretaryType === 'individual' ?
                                        <View>
                                            <CustomInput
                                                name='surname'
                                                value={values.surname}
                                                placeholder='Surname'
                                                // customStyle={[Custom.mt20]}
                                                iconName='asterisk'
                                                iconColor={Colors.DANGER}
                                                onChangeText={handleChange('surname')}
                                                onBlur={handleBlur('surname')}
                                            />
                                            <ErrorMessage errorValue={touched.surname && errors.surname} />

                                            <CustomInput
                                                name='firstName'
                                                value={values.firstName}
                                                placeholder='First Name'
                                                // customStyle={[Custom.mt20]}
                                                iconName='asterisk'
                                                iconColor={Colors.DANGER}
                                                onChangeText={handleChange('firstName')}
                                                onBlur={handleBlur('firstName')}
                                            />
                                            <ErrorMessage errorValue={touched.firstName && errors.firstName} />

                                            <CustomInput
                                                name='otherName'
                                                value={values.otherName}
                                                placeholder='Other Name'
                                                // customStyle={[Custom.mt20]}
                                                // iconName='asterisk'
                                                iconColor={Colors.DANGER}
                                                onChangeText={handleChange('otherName')}
                                                onBlur={handleBlur('otherName')}
                                            />
                                            <ErrorMessage errorValue={touched.otherName && errors.otherName} />

                                            <CustomDatepicker
                                                label='Date of Birth:'
                                                date={dob}
                                                updateDOB={this.updateDOB}
                                                required={true}
                                            />

                                            <CustomSelect
                                                options={sexes}
                                                selected={sex}
                                                updateSelected={this.updateSex}
                                                customStyle={[Custom.mb20]}
                                                placeholder={{ label: 'Sex' }}
                                                required={true}
                                            />

                                            <CustomSearchableDropdown
                                                options={countries}
                                                onItemSelect={(item) => this.updateNationality(item)}
                                                placeholder='Nationality'
                                                required={true}
                                            />

                                            <CustomInput
                                                name='formerName'
                                                value={values.formerName}
                                                placeholder='Former Name'
                                                // customStyle={[Custom.mt20]}
                                                // iconName='asterisk'
                                                iconColor={Colors.DANGER}
                                                onChangeText={handleChange('formerName')}
                                                onBlur={handleBlur('formerName')}
                                            />
                                            <ErrorMessage errorValue={touched.formerName && errors.formerName} />

                                            <CustomSearchableDropdown
                                                options={countries}
                                                onItemSelect={(item) => this.setState({ formerNationality: item.name })}
                                                placeholder='Former Nationality'
                                                required={true}
                                            />

                                            <CustomInput
                                                name='occupation'
                                                value={values.occupation}
                                                placeholder='Occupation'
                                                // customStyle={[Custom.mt20]}
                                                iconName='asterisk'
                                                iconColor={Colors.DANGER}
                                                onChangeText={handleChange('occupation')}
                                                onBlur={handleBlur('occupation')}
                                            />
                                            <ErrorMessage errorValue={touched.occupation && errors.occupation} />

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


                                            <CustomSelect
                                                options={documentTypes}
                                                selected={documentType}
                                                updateSelected={this.updateDocType}
                                                customStyle={[Custom.mb20]}
                                                placeholder={{ label: 'Means of Identification' }}
                                                required={true}
                                            />


                                            <UploadInput
                                                rightIcon={<Upload />}
                                                placeholder='Upload means of Identification'
                                                uploaded={document}
                                                remove={() => this.removeImage('document')}
                                                onPress={() => this.showActionSheet('document')}
                                                required={true}
                                            />

                                            {
                                                (documentType && documentType !== '') ?
                                                    <View>
                                                        <CustomInput
                                                            name='documentId'
                                                            value={values.documentId}
                                                            placeholder={documentType + ' ID number'}
                                                            customStyle={[Custom.mt20]}
                                                            iconName='asterisk'
                                                            iconColor={Colors.DANGER}
                                                            onChangeText={handleChange('documentId')}
                                                            onBlur={handleBlur('documentId')}
                                                        />
                                                        <ErrorMessage errorValue={touched.documentId && errors.documentId} />
                                                    </View> : null
                                            }

                                            <UploadInput
                                                customStyle={Custom.mt20}
                                                rightIcon={<Upload />}
                                                placeholder='Signature of Secretary'
                                                uploaded={signature}
                                                remove={() => this.removeImage('signature')}
                                                onPress={() => this.showActionSheet('signature')}
                                                required={true}
                                            />

                                            <UploadInput
                                                customStyle={Custom.mt20}
                                                rightIcon={<Passport />}
                                                placeholder='Passport Photograph of Secretary'
                                                uploaded={passport}
                                                remove={() => this.removeImage('passport')}
                                                onPress={() => this.showActionSheet('passport')}
                                                required={true}
                                            />


                                        </View>
                                        : secretaryType === 'corporateBody' ?
                                            <View>
                                                <CustomInput
                                                    name='companyName'
                                                    value={values.companyName}
                                                    placeholder='Company Name'
                                                    // customStyle={[Custom.mt20]}
                                                    iconName='asterisk'
                                                    iconColor={Colors.DANGER}
                                                    onChangeText={handleChange('companyName')}
                                                    onBlur={handleBlur('companyName')}
                                                />
                                                <ErrorMessage errorValue={touched.companyName && errors.companyName} />

                                                <CustomInput
                                                    name='regNum'
                                                    value={values.regNum}
                                                    placeholder='Registration Number'
                                                    // customStyle={[Custom.mt20]}
                                                    iconName='asterisk'
                                                    iconColor={Colors.DANGER}
                                                    onChangeText={handleChange('regNum')}
                                                    onBlur={handleBlur('regNum')}
                                                />
                                                <ErrorMessage errorValue={touched.regNum && errors.regNum} />

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
                                            </View>
                                            :
                                            null
                                }

                                <Text style={[styles.boldText, Custom.mv10]}>Registered or Principal Address</Text>

                                <CustomSearchableDropdown
                                    options={countries}
                                    onItemSelect={(item) => this.updateCountry(item)}
                                    placeholder='Nationality'
                                    required={true}
                                />

                                {
                                    !statesLoading ?
                                        <CustomSearchableDropdown
                                            options={states}
                                            onItemSelect={(item) => this.updateState(item)}
                                            placeholder='State'
                                            required={true}
                                        />
                                        :
                                        <Text style={[Custom.mv10]}>Loading states...</Text>
                                }

                                {
                                    country==='Nigeria'?
<CustomSearchableDropdown
                                    options={lgas}
                                    onItemSelect={(item) => this.setState({ lga: item.name })}
                                    placeholder='LGA'
                                    required={true}
                                /> 
                                :
                                <View>
                                <CustomInput
                                    name='principalAddress.lga'
                                    value={values.principalAddress.lga}
                                    placeholder='LGA'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('principalAddress.lga')}
                                    onBlur={handleBlur('principalAddress.lga')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'principalAddress.lga') && getIn(errors, 'principalAddress.lga')} />
                                </View>
                                }

                                

                                <CustomInput
                                    name='principalAddress.city'
                                    value={values.principalAddress.city}
                                    placeholder='City/Town/Village'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('principalAddress.city')}
                                    onBlur={handleBlur('principalAddress.city')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'principalAddress.city') && getIn(errors, 'principalAddress.city')} />

                                <CustomInput
                                    name='principalAddress.postalCode'
                                    value={values.principalAddress.postalCode}
                                    placeholder='Postal Code'
                                    // customStyle={[Custom.mt20]}
                                    // iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('principalAddress.postalCode')}
                                    onBlur={handleBlur('principalAddress.postalCode')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'principalAddress.postalCode') && getIn(errors, 'principalAddress.postalCode')} />

                                <CustomInput
                                    name='principalAddress.houseNumber'
                                    value={values.principalAddress.houseNumber}
                                    placeholder='House Number/Building Name'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('principalAddress.houseNumber')}
                                    onBlur={handleBlur('principalAddress.houseNumber')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'principalAddress.houseNumber') && getIn(errors, 'principalAddress.houseNumber')} />

                                <CustomInput
                                    name='principalAddress.streetName'
                                    value={values.principalAddress.streetName}
                                    placeholder='Street Name'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('principalAddress.streetName')}
                                    onBlur={handleBlur('principalAddress.streetName')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'principalAddress.streetName') && getIn(errors, 'principalAddress.streetName')} />


                                <CustomButton
                                    title='Next'
                                    buttonStyle={styles.buttonStyle}
                                    customStyle={styles.primaryButtonStyle}
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                    buttonColor={Colors.SECONDARY}
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

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Select Image From'}
                    options={['Camera', 'Gallery', 'cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={2}
                    onPress={(index) => this.getImageFrom(index)}
                />
            </ScrollView>
        )
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SecretaryFormView); 
