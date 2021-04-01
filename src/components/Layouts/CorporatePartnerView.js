import React, { Component, PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { businessRegActions, locationActions } from '../../store/actions';
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


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration10 from '../../assets/svg/Illustration10.svg'
import Upload from '../../assets/svg/Upload.svg'
import Passport from '../../assets/svg/Passport.svg'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    companyName: Yup.string()
        .required('This is a required field'),
    regNumber: Yup.string()
        .required('This is a required field'),
    authorizedSignatory: Yup.object().shape({
        surname: Yup.string()
            .required('This is a required field'),
        firstName: Yup.string()
            .required('This is a required field'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
            .required('This is a required field')
            .min(11),
        email: Yup.string()
            .label('Email')
            .required('This is a required field')
            .email('Enter a valid email'),
    }),
    residentialAddress: Yup.object().shape({
        city: Yup.string()
            .required('This is a required field'),
        houseNumber: Yup.string()
            .required('This is a required field'),
        streetName: Yup.string()
            .required('This is a required field'),
        // lga: Yup.string()
        //     .required('This is a required field')
    }),
    serviceAddress: Yup.object().shape({
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
        businessRegData
    } = state.businessReg;


    return {
        businessRegData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // getStates: (country) => dispatch(locationActions.getStates(country)),
        // getCities: (state) => dispatch(locationActions.getCities(state))
    };
}


class CorporatePartnerView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sex: '',
            sexes: [
                { label: 'Male', value: 'male', },
                { label: 'Female', value: 'female' },
            ],
            dob: new Date(),
            country: '',
            states: [],
            state: '',
            lgas: [],
            lga: '',
            serviceCountry: '',
            serviceState: '',
            serviceLga: '',
            nationality: '',
            signature: null,
            passport: null,
            uploading: '',
            corporatePartner: null,
            added: false,
            statesLoading: false,
            serviceStatesLoading: false
        }

        this.removeCorporatePartner = this.removeCorporatePartner.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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

    updateCountry = async (country) => {
        // const { documentTypes2, defaultDocumentTypes } = this.state;
        this.setState({ country: country.name, statesLoading: true });
        let states = await this.getStates(country.name);
        this.setState({ states, statesLoading: false });
        // if (country.country_name !== 'Nigeria') {
        //     this.setState({ documentTypes: documentTypes2 })
        // } else {
        //     this.setState({ documentTypes: defaultDocumentTypes })
        // }
    }



    updateState = async (state) => {
        // let lgas = await this.getCities(state.name);
        let lgas = [];
        this.setState({ state: state.name });
        let lgaNames = await NaijaStates.lgas(state.name).lgas;
        for (var name of lgaNames) lgas.push({ 'name': name })

        this.setState({ lgas });
    }


    updateServiceCountry = async (country) => {
        this.setState({ serviceCountry: country.name, serviceStatesLoading: true });
        let states = await this.getStates(country.name);
        this.setState({ states, serviceStatesLoading: false });
    }


    updateServiceState = async (state) => {
        // let lgas = await this.getCities(state.name);
        let lgas = [];
        this.setState({ serviceState: state.name });
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

    yearsDiff(d1, d2) {
        let date1 = new Date(d1);
        let date2 = new Date(d2);
        let yearsDiff = Math.abs(date2.getFullYear() - date1.getFullYear());
        return yearsDiff;
    }


    handleSubmit = async data => {
        const { index, updateCorporates } = this.props;
        const {
            sex,
            documentType,
            dob,
            nationality,
            country,
            state,
            lga,
            serviceCountry,
            serviceState,
            serviceLga,
            signature,
            passport,
        } = this.state;

        // if ((this.yearsDiff(new Date(), dob) < 18)) {
        //     alert('Age is too young');
        //     return;
        // }

        if (
            sex == '' ||
            nationality == '' ||
            documentType == '' ||
            country == '' ||
            state == '' ||
            !signature ||
            !passport
        ) {
            alert('Please complete entire form');
            return;
        }
        var regData = { ...data }

        regData['index'] = index;
        regData['authorizedSignatory']['sex'] = sex;
        regData['authorizedSignatory']['nationality'] = nationality;
        regData['authorizedSignatory']['dob'] = dob.toISOString();
        regData['authorizedSignatory']['signature'] = signature;
        regData['authorizedSignatory']['passport'] = passport;
        regData['residentialAddress']['country'] = country;
        regData['residentialAddress']['state'] = state;
        if (country === 'Nigeria') regData['residentialAddress']['lga'] = lga;
        regData['serviceAddress']['country'] = serviceCountry;
        regData['serviceAddress']['state'] = serviceState;
        if (serviceCountry === 'Nigeria') regData['serviceAddress']['lga'] = serviceLga;

        this.setState({ added: true })
        updateCorporates(regData);
    }

    removeCorporatePartner = (index) => {
        const { remove } = this.props;
        this.setState({ added: false })
        remove(index);
    }

    render() {
        const { sex,
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
            serviceStatesLoading,
            country,
            serviceCountry
        } = this.state;
        const {
            countries,
            title,
            index,
            removeText,
            remove,
            corporatePartners,
            updateValues
        } = this.props;

        return (
            <View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ marginVertical: 20, fontWeight: 'bold', flex: 0.5 }}>{title}</Text>
                    <TouchableOpacity style={{ flex: 0.5, alignItems: 'flex-end', marginVertical: 20 }} onPress={() => remove(index)}>
                        <Text style={{ color: 'red', fontSize: 12, fontWeight: 'bold', }}>{removeText}</Text>
                    </TouchableOpacity>

                </View>
                <Formik
                    initialValues={{
                        companyName: '',
                        regNumber: '',
                        authorizedSignatory: {
                            surname: '',
                            firstName: '',
                            otherName: '',
                            email: '',
                            phone: '',
                        },
                        residentialAddress: {
                            city: '',
                            houseNumber: '',
                            streetName: '',
                            postalCode: '',
                            lga: ''
                        },
                        serviceAddress: {
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
                    {({
                        handleChange,
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
                                    name='regNumber'
                                    value={values.regNumber}
                                    placeholder='Registration Number'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('regNumber')}
                                    onBlur={handleBlur('regNumber')}
                                />
                                <ErrorMessage errorValue={touched.regNumber && errors.regNumber} />

                                <Text style={[styles.boldText, Custom.mv10]}>Authorized Signatory Details</Text>

                                <CustomInput
                                    name='authorizedSignatory.surname'
                                    value={values.authorizedSignatory.surname}
                                    placeholder='Surname'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('authorizedSignatory.surname')}
                                    onBlur={handleBlur('authorizedSignatory.surname')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'authorizedSignatory.surname') && getIn(errors, 'authorizedSignatory.surname')} />

                                <CustomInput
                                    name='authorizedSignatory.firstName'
                                    value={values.authorizedSignatory.firstName}
                                    placeholder='First Name'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('authorizedSignatory.firstName')}
                                    onBlur={handleBlur('authorizedSignatory.firstName')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'authorizedSignatory.firstName') && getIn(errors, 'authorizedSignatory.firstName')} />

                                <CustomInput
                                    name='authorizedSignatory.otherName'
                                    value={values.authorizedSignatory.otherName}
                                    placeholder='Other Name'
                                    // customStyle={[Custom.mt20]}
                                    // iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('authorizedSignatory.otherName')}
                                    onBlur={handleBlur('authorizedSignatory.otherName')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'authorizedSignatory.otherName') && getIn(errors, 'authorizedSignatory.otherName')} />

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
                                    onItemSelect={(item) => this.setState({ nationality: item.name })}
                                    placeholder='Nationality'
                                    required={true}
                                />

                                <CustomInput
                                    name='authorizedSignatory.phone'
                                    value={values.authorizedSignatory.phone}
                                    placeholder='Phone Number'
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    customStyle={[Custom.mt10]}
                                    keyboardType='phone-pad'
                                    onChangeText={handleChange('authorizedSignatory.phone')}
                                    onBlur={handleBlur('authorizedSignatory.phone')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'authorizedSignatory.phone') && getIn(errors, 'authorizedSignatory.phone')} />

                                <CustomInput
                                    name='authorizedSignatory.email'
                                    value={values.authorizedSignatory.email}
                                    placeholder='Email'
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    keyboardType='email-address'
                                    onChangeText={handleChange('authorizedSignatory.email')}
                                    autoCapitalize='none'
                                    onBlur={handleBlur('authorizedSignatory.email')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'authorizedSignatory.email') && getIn(errors, 'authorizedSignatory.email')} />


                                <UploadInput
                                    customStyle={Custom.mt20}
                                    rightIcon={<Upload />}
                                    placeholder='Signature of Proprietor'
                                    uploaded={signature}
                                    remove={() => this.removeImage('signature')}
                                    onPress={() => this.showActionSheet('signature')}
                                    required={true}
                                />

                                <UploadInput
                                    customStyle={Custom.mt20}
                                    rightIcon={<Passport />}
                                    placeholder='Passport Photograph of Proprietor'
                                    uploaded={passport}
                                    remove={() => this.removeImage('passport')}
                                    onPress={() => this.showActionSheet('passport')}
                                    required={true}
                                />

                                <Text style={[styles.boldText, Custom.mv10]}>Residential Address</Text>

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
                                    country === 'Nigeria' ?
                                        <CustomSearchableDropdown
                                            options={lgas}
                                            onItemSelect={(item) => this.setState({ lga: item.name })}
                                            placeholder='LGA'
                                            required={true}
                                        />
                                        :
                                        <View>

                                            <CustomInput
                                                name='residentialAddress.lga'
                                                value={values.residentialAddress.lga}
                                                placeholder='LGA'
                                                // customStyle={[Custom.mt20]}
                                                iconName='asterisk'
                                                iconColor={Colors.DANGER}
                                                onChangeText={handleChange('residentialAddress.lga')}
                                                onBlur={handleBlur('residentialAddress.lga')}
                                            />
                                            <ErrorMessage errorValue={getIn(touched, 'residentialAddress.lga') && getIn(errors, 'residentialAddress.lga')} />
                                        </View>
                                }



                                <CustomInput
                                    name='residentialAddress.city'
                                    value={values.residentialAddress.city}
                                    placeholder='City/Town/Village'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('residentialAddress.city')}
                                    onBlur={handleBlur('residentialAddress.city')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'residentialAddress.city') && getIn(errors, 'residentialAddress.city')} />

                                <CustomInput
                                    name='residentialAddress.postalCode'
                                    value={values.residentialAddress.postalCode}
                                    placeholder='Postal Code'
                                    // customStyle={[Custom.mt20]}
                                    // iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('residentialAddress.postalCode')}
                                    onBlur={handleBlur('residentialAddress.postalCode')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'residentialAddress.postalCode') && getIn(errors, 'residentialAddress.postalCode')} />

                                <CustomInput
                                    name='residentialAddress.houseNumber'
                                    value={values.residentialAddress.houseNumber}
                                    placeholder='House Number/Building Name'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('residentialAddress.houseNumber')}
                                    onBlur={handleBlur('residentialAddress.houseNumber')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'residentialAddress.houseNumber') && getIn(errors, 'residentialAddress.houseNumber')} />

                                <CustomInput
                                    name='residentialAddress.streetName'
                                    value={values.residentialAddress.streetName}
                                    placeholder='Street Name'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('residentialAddress.streetName')}
                                    onBlur={handleBlur('residentialAddress.streetName')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'residentialAddress.streetName') && getIn(errors, 'residentialAddress.streetName')} />

                                <Text style={[styles.boldText, Custom.mv10]}>Service Address</Text>

                                <CustomSearchableDropdown
                                    options={countries}
                                    onItemSelect={(item) => this.updateServiceCountry(item)}
                                    placeholder='Nationality'
                                    required={true}
                                />

                                {
                                    !serviceStatesLoading ?

                                        <CustomSearchableDropdown
                                            options={states}
                                            onItemSelect={(item) => this.updateServiceState(item)}
                                            placeholder='State'
                                            required={true}
                                        />
                                        :
                                        <Text style={[Custom.mv10]}>Loading states...</Text>
                                }

                                {
                                    serviceCountry === 'Nigeria' ?

                                        <CustomSearchableDropdown
                                            options={lgas}
                                            onItemSelect={(item) => this.setState({ serviceLga: item.name })}
                                            placeholder='LGA'
                                            required={true}
                                        />
                                        :
                                        <View>
                                            <CustomInput
                                                name='serviceAddress.lga'
                                                value={values.serviceAddress.lga}
                                                placeholder='LGA'
                                                // customStyle={[Custom.mt20]}
                                                iconName='asterisk'
                                                iconColor={Colors.DANGER}
                                                onChangeText={handleChange('serviceAddress.lga')}
                                                onBlur={handleBlur('serviceAddress.lga')}
                                            />
                                            <ErrorMessage errorValue={getIn(touched, 'serviceAddress.lga') && getIn(errors, 'serviceAddress.lga')} />
                                        </View>
                                }




                                <CustomInput
                                    name='serviceAddress.city'
                                    value={values.serviceAddress.city}
                                    placeholder='City/Town/Village'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('serviceAddress.city')}
                                    onBlur={handleBlur('serviceAddress.city')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'serviceAddress.city') && getIn(errors, 'serviceAddress.city')} />

                                <CustomInput
                                    name='serviceAddress.postalCode'
                                    value={values.serviceAddress.postalCode}
                                    placeholder='Postal Code'
                                    // customStyle={[Custom.mt20]}
                                    // iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('serviceAddress.postalCode')}
                                    onBlur={handleBlur('serviceAddress.postalCode')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'serviceAddress.postalCode') && getIn(errors, 'serviceAddress.postalCode')} />

                                <CustomInput
                                    name='serviceAddress.houseNumber'
                                    value={values.serviceAddress.houseNumber}
                                    placeholder='House Number/Building Name'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('serviceAddress.houseNumber')}
                                    onBlur={handleBlur('serviceAddress.houseNumber')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'serviceAddress.houseNumber') && getIn(errors, 'serviceAddress.houseNumber')} />

                                <CustomInput
                                    name='serviceAddress.streetName'
                                    value={values.serviceAddress.streetName}
                                    placeholder='Street Name'
                                    // customStyle={[Custom.mt20]}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('serviceAddress.streetName')}
                                    onBlur={handleBlur('serviceAddress.streetName')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'serviceAddress.streetName') && getIn(errors, 'serviceAddress.streetName')} />


                                {
                                    !added ?
                                        <CustomButton
                                            title='Add'
                                            buttonStyle={styles.buttonStyle}
                                            customStyle={styles.primaryButtonStyle}
                                            onPress={handleSubmit}
                                            disabled={!isValid}
                                            buttonColor={Colors.SECONDARY}
                                        /> :
                                        <CustomButton
                                            title='Remove'
                                            buttonStyle={styles.buttonStyle}
                                            customStyle={styles.dangerButtonStyle}
                                            onPress={() => {
                                                this.setState({ added: false })
                                                remove(index)
                                            }}
                                            // disabled={!isValid}
                                            buttonColor={Colors.SECONDARY}
                                        />

                                }
                                {/* <CustomButton
                                    title='Back'
                                    buttonStyle={styles.buttonStyle}
                                    customStyle={styles.secondaryButtonStyle}
                                    buttonColor={Colors.WHITE}
                                    onPress={() => navigation.goBack(null)}
                                /> */}
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
            </View>
        )
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CorporatePartnerView); 
