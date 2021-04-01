import React, { Component, PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { companyRegActions, locationActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';
import { locationService } from '../../services/locationService'


import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'

// components 
import CustomInput from '../atoms/CustomInput';
import CustomButton from '../atoms/CustomButton';
import ErrorMessage from '../atoms/ErrorMessage';
import CustomSelect from '../atoms/CustomSelect';
import CustomDatepicker from '../atoms/CustomDatepicker';
import CustomSearchableDropdown from '../atoms/CustomSearchableDropdown';
import UploadInput from '../atoms/UploadInput';
import PrefixInput from '../atoms/PrefixInput';
import SuffixInput from '../atoms/SuffixInput';




// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration11 from '../../assets/svg/Illustration11.svg'
import Upload from '../../assets/svg/Upload.svg'
import Naira from '../../assets/svg/Naira.svg'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('This is a required field'),
    // surname: Yup.string()
    //     .required('This is a required field'),
    documentId: Yup.string()
        .required('This is a required field'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .required('This is a required field')
        .min(11),
    amountGuaranteed: Yup.string()
        .required('This is a required field'),
    amountGuaranteedWords: Yup.string()
        .required('This is a required field'),
    email: Yup.string()
        .label('Email')
        .required('This is a required field')
        .email('Enter a valid email')
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
        // getStates: (country) => dispatch(locationActions.getStates(country)),
        // getCities: (state) => dispatch(locationActions.getCities(state))
    };
}


class GuarantorFormView extends Component {


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
        documentType: '',
        dob: new Date(),
        country: '',
        states: [],
        state: '',
        cities: [],
        city: '',
        residence: '',
        signature: null,
        document: null,
        uploading: '',
        added: false
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
        const { documentTypes2,defaultDocumentTypes } = this.state;
        this.setState({ country: country.name });
        let states = await this.getStates(country.name);
        this.setState({ states });
        if (country.country_name !== 'Nigeria') {
            this.setState({ documentTypes: documentTypes2 })
        }else{
            this.setState({ documentTypes:defaultDocumentTypes })
        }
    }


    updateState = async (state) => {
        this.setState({ state: state.name });
        let cities = await this.getCities(state.name);
        this.setState({ cities });
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
        const { navigation, save, companyRegData, updateGuarantors } = this.props;
        const {
            sex,
            documentType,
            dob,
            country,
            state,
            city,
            residence,
            signature,
            document,
            suffix
        } = this.state;


        if (
            sex == '' ||
            documentType == '' ||
            country == '' ||
            state == '' ||
            city == '' ||
            suffix == '' ||
            residence == '' ||
            !signature ||
            !document
        ) {
            alert('Please complete entire form');
            return;
        }
        var regData = { ...data }

        regData['sex'] = sex;
        regData['documentType'] = documentType;
        regData['dob'] = dob.toISOString();
        regData['country'] = country;
        regData['state'] = state;
        regData['city'] = city;
        regData['residence'] = residence;
        regData['signature'] = signature;
        regData['document'] = document;
        regData['index'] = 0;

        this.setState({ added: true })
        updateGuarantors(regData);
    }

    render() {
        const { sex,
            sexes,
            dob,
            states,
            cities,
            documentTypes,
            documentType,
            signature,
            document,
            suffix,
            suffixes,
            added
        } = this.state;
        const {
            countries,
            title,
            index,
            removeText,
            remove,
            updateValues,
            navigation
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
                        fullName: '',
                        documentId: '',
                        email: '',
                        phone: '',
                        amountGuaranteed: '',
                        amountGuaranteedWords: ''
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
                                    name='fullName'
                                    value={values.fullName}
                                    placeholder='Name'
                                    // customStyle={[Custom.mt20]}
                                    // iconName='asterisk'
                                    // iconColor={Colors.DANGER}
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                />
                                <ErrorMessage errorValue={touched.fullName && errors.fullName} />


                                <CustomDatepicker
                                    label='Date of Birth:'
                                    date={dob}
                                    updateDOB={this.updateDOB}
                                />


                                <CustomSelect
                                    options={sexes}
                                    selected={sex}
                                    updateSelected={this.updateSex}
                                    customStyle={[Custom.mb20]}
                                    placeholder={{ label: 'Sex' }}
                                />

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

                                <CustomInput
                                    labelStyle={styles.labelStyle}
                                    placeholder='Amount Guaranteed'
                                    name='amountGuaranteed'
                                    value={values.amountGuaranteed}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('amountGuaranteed')}
                                    keyboardType='numeric'
                                    onBlur={handleBlur('amountGuaranteed')}
                                    icon={<Naira />}
                                />
                                <ErrorMessage errorValue={touched.amountGuaranteed && errors.amountGuaranteed} />

                                <CustomInput
                                    labelStyle={styles.labelStyle}
                                    placeholder='Amount Guaranteed in Words'
                                    name='amountGuaranteedWords'
                                    value={values.amountGuaranteedWords}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('amountGuaranteedWords')}
                                    keyboardType='numeric'
                                    onBlur={handleBlur('amountGuaranteedWords')}
                                />
                                <ErrorMessage errorValue={touched.amountGuaranteedWords && errors.amountGuaranteedWords} />

                                <CustomSearchableDropdown
                                    options={countries}
                                    onItemSelect={(item) => this.updateCountry(item)}
                                    placeholder='Nationality'
                                />

                                <CustomSearchableDropdown
                                    options={states}
                                    onItemSelect={(item) => this.updateState(item)}
                                    placeholder='State'
                                />

                                <CustomSearchableDropdown
                                    options={cities}
                                    onItemSelect={(item) => this.setState({ city: item.name })}
                                    placeholder='City/LGA'
                                />

                                <CustomSelect
                                    options={documentTypes}
                                    selected={documentType}
                                    updateSelected={this.updateDocType}
                                    customStyle={[Custom.mb20]}
                                    placeholder={{ label: 'Identification Document' }}
                                />

                                {
                                    (documentType && documentType !== '') ?
                                        <View>
                                            <CustomInput
                                                name='documentId'
                                                value={values.documentId}
                                                placeholder={documentType + ' ID number'}
                                                // customStyle={[Custom.mt20]}
                                                iconName='asterisk'
                                                iconColor={Colors.DANGER}
                                                onChangeText={handleChange('documentId')}
                                                onBlur={handleBlur('documentId')}
                                            />
                                            <ErrorMessage errorValue={touched.documentId && errors.documentId} />
                                        </View> : null
                                }

                                <CustomSearchableDropdown
                                    options={countries}
                                    onItemSelect={(item) => this.setState({ residence: item.name })}
                                    placeholder='Country of Residence'
                                />

                                <UploadInput
                                    rightIcon={<Upload />}
                                    placeholder='Upload identification document'
                                    uploaded={document}
                                    remove={() => this.removeImage('document')}
                                    onPress={() => this.showActionSheet('document')}
                                />

                                <UploadInput
                                    customStyle={Custom.mt20}
                                    rightIcon={<Upload />}
                                    placeholder='Upload Your Signature'
                                    uploaded={signature}
                                    remove={() => this.removeImage('signature')}
                                    onPress={() => this.showActionSheet('signature')}
                                />



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
                                            onPress={remove}
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
)(GuarantorFormView); 
