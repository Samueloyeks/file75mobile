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
import { locationService } from '../../services/locationService'

import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
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
import ExtraDirectorFormView from '../../components/Layouts/ExtraDirectorFormView';
import UploadInput from '../atoms/UploadInput';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration17 from '../../assets/svg/Illustration17.svg'
import Info from '../../assets/svg/Info.svg'
import Upload from '../../assets/svg/Upload.svg'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({

    surname: Yup.string()
        .required('This is a required field'),
    firstName: Yup.string()
        .required('This is a required field'),
    occupation: Yup.string()
        .required('This is a required field'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .min(11)
        .required('This is a required field'),
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
    residentialAddress: Yup.object().shape({
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





class WitnessFormView extends PureComponent {

    constructor(props) {
        super(props)

    }

    state = {
        sex: '',
        sexes: [
            { label: 'Male', value: 'male', },
            { label: 'Female', value: 'female' },
        ],
        dob: new Date(),
        directors: [],
        directorForms: [],
        states: [],
        lgas: [],
        country: '',
        state: '',
        lga: '',
        signature: null,
        uploading: '',
        added: false,
        statesLoading: false
    }

    async getStates(country) {
        const states = await locationService.getStates(country);
        return states;
    }

    async getCities(state) {
        const cities = await locationService.getCities(state);
        return cities;
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

    updateSex = (sex) => {
        this.setState({ sex })
    }

    updateDOB = (dob) => {
        this.setState({ dob })
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


    handleSubmit = async data => {
        const { country, state, lga, signature } = this.state
        const { updateWitnesses, index } = this.props;

        if (
            country == '' ||
            state == '' ||
            !signature
        ) {
            alert('Please complete entire form');
            return;
        }

        var regData = { ...data }

        regData['index'] = index;
        regData['residentialAddress']['country'] = country;
        regData['residentialAddress']['state'] = state;
        if (country === 'Nigeria') regData['residentialAddress']['lga'] = lga;
        regData['signature'] = signature;

        this.setState({ added: true })
        updateWitnesses(regData)
    }

    render() {
        const { countries, remove, title, removeText, index } = this.props;
        const {
            states,
            lgas,
            added,
            signature,
            statesLoading,
            country
        } = this.state;

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
                        phone: '',
                        email: '',
                        surname: '',
                        firstName: '',
                        otherName: '',
                        occupation: '',
                        residentialAddress: {
                            city: '',
                            houseNumber: '',
                            streetName: '',
                            postalCode: ''
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
                            // { this.renderElement() }
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
                                    // iconColor={Colors.DANGER}
                                    onChangeText={handleChange('otherName')}
                                    onBlur={handleBlur('otherName')}
                                />
                                <ErrorMessage errorValue={touched.otherName && errors.otherName} />

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

                                <UploadInput
                                    // customStyle={Custom.mt20}
                                    rightIcon={<Upload />}
                                    placeholder='Signature of Witness'
                                    uploaded={signature}
                                    remove={() => this.removeImage('signature')}
                                    onPress={() => this.showActionSheet('signature')}
                                    required={true}
                                />

                                <Text style={[styles.boldText, Custom.mv10]}>Witness Residential Address</Text>

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
        );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WitnessFormView); 
