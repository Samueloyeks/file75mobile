import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { businessRegActions, locationActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';
import { locationService } from '../../services/locationService'
import { formatCamelCase, capitalizeWords } from '../../helpers/encode'

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
import CustomDatepicker from '../../components/atoms/CustomDatepicker';
import CustomSearchableDropdown from '../../components/atoms/CustomSearchableDropdown';
import UploadInput from '../../components/atoms/UploadInput';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration2 from '../../assets/svg/Illustration2.svg'
import Info from '../../assets/svg/Info.svg'
import Upload from '../../assets/svg/Upload.svg'





const validationSchema = Yup.object().shape({
    businessName1: Yup.string()
        .required('This is a required field'),
    email: Yup.string()
        .label('Email')
        .required('This is a required field')
        .email('Enter a valid email'),
    placeOfBusiness: Yup.object().shape({
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
        businessRegData,
        businessRegType
    } = state.businessReg;

    const {
        states
    } = state.location;

    return {
        states,
        businessRegData,
        businessRegType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(businessRegActions.saveData(data)),
        getStates: (data) => dispatch(locationActions.getStates(data)),
        getNaturesOfBusiness: () => dispatch(businessRegActions.getNaturesOfBusiness())
    };
}





class BusinessRegScreen1 extends PureComponent {

    state = {
        commencementDate: new Date(),
        state: '',
        lgas: [],
        lga: '',
        document: null,
        uploading: ''
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
        if (!data.availabilityCode && !(data.businessName1)) {
            alert('Please provide an availability code or  a business name');
            return;
        }
        const { navigation, save, businessRegData, businessRegType } = this.props;
        const { commencementDate, state, lga, document } = this.state;

        var regData = { ...data }
        for (const key in regData) {
            businessRegData[key] = regData[key]
        }

        if (
            commencementDate == '' ||
            state == ''
        ) {
            alert('Please complete entire form');
            return;
        }
        businessRegData['commencementDate'] = commencementDate.toISOString();
        businessRegData['placeOfBusiness']['state'] = state;
        businessRegData['placeOfBusiness']['lga'] = lga;
        businessRegData['document'] = document;
        businessRegData.individualPartners = [];
        businessRegData.corporatePartners = [];
        businessRegData.minorPartners = [];

        if (businessRegType == 'partnership') {
            navigation.navigate('BusinessReg2');
        } else if (businessRegType == 'soleProprietorship') {
            navigation.navigate('BusinessReg2');
        }
    }

    updateCommencementDate = (commencementDate) => {
        this.setState({ commencementDate })
    }

    updateState = async (state) => {
        // let lgas = await this.getCities(state.name);
        let lgas = [];
        this.setState({ state: state.name });
        let lgaNames = await NaijaStates.lgas(state.name).lgas;
        for (var name of lgaNames) lgas.push({ 'name': name })

        this.setState({ lgas });
    }

    async getCities(state) {
        const cities = await locationService.getCities(state);
        return cities;
    }

    async componentDidMount() {
        const { getStates, states, getNaturesOfBusiness } = this.props;
        await getStates('Nigeria')
        await getNaturesOfBusiness()
    }

    render() {
        const { navigation, loading, states, businessRegType } = this.props;
        const { commencementDate, lgas, document } = this.state;

        let breadcrumbText = businessRegType

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={styles.content}>
                    <Text style={[Custom.breadcrumbText, styles.boldText]}>
                        {"Business Registration > " + formatCamelCase(capitalizeWords(breadcrumbText))}
                    </Text>
                    <View style={[Custom.mv30]}>
                        <Text style={[styles.boldText]}>
                            Business Name <TinyArrows />
                        </Text>
                        <Text style={[styles.boldText]}>
                            Registration Made <Text style={[styles.primary]}>Easy</Text>
                        </Text>
                    </View>
                    {/* <View style={[styles.textInline, Custom.mv40, styles.textCenter,]}>
                        <Illustration2 />
                    </View> */}
                    <Text style={[styles.boldText, styles.textCenter, Custom.mb10]}>Business Details</Text>
                    <Formik
                        initialValues={{
                            email: '',
                            availabilityCode: '',
                            businessName1: '',
                            businessName2: '',
                            placeOfBusiness: {
                                city: '',
                                houseNumber: '',
                                streetName: '',
                                postalCode: '',
                                branchAddress: '',
                                lga: ''
                            }
                            // city: '',
                            // houseNumber: '',
                            // streetName: '',
                            // branchAddress: ''
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

                                    <CustomInput
                                        name='businessName1'
                                        value={values.businessName1}
                                        placeholder='First preferred name'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
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
                                        // iconName='asterisk'
                                        // iconColor={Colors.DANGER}
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

                                    <CustomDatepicker
                                        label='Business commencement date:'
                                        date={commencementDate}
                                        updateDOB={this.updateCommencementDate}
                                        required={true}
                                    />

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

                                    <Text style={[styles.boldText, Custom.mv10]}>Principal Place of business</Text>

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
                                        name='placeOfBusiness.lga'
                                        value={values.placeOfBusiness.lga}
                                        placeholder='LGA'
                                        // customStyle={[Custom.mt20]}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('placeOfBusiness.lga')}
                                        onBlur={handleBlur('placeOfBusiness.lga')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'placeOfBusiness.lga') && getIn(errors, 'placeOfBusiness.lga')} /> */}

                                    <CustomInput
                                        name='placeOfBusiness.city'
                                        value={values.placeOfBusiness.city}
                                        placeholder='City/Town/Village'
                                        // customStyle={[Custom.mt20]}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('placeOfBusiness.city')}
                                        onBlur={handleBlur('placeOfBusiness.city')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'placeOfBusiness.city') && getIn(errors, 'placeOfBusiness.city')} />

                                    <CustomInput
                                        name='placeOfBusiness.postalCode'
                                        value={values.placeOfBusiness.postalCode}
                                        placeholder='Postal Code'
                                        // customStyle={[Custom.mt20]}
                                        // iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('placeOfBusiness.postalCode')}
                                        onBlur={handleBlur('placeOfBusiness.postalCode')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'placeOfBusiness.postalCode') && getIn(errors, 'placeOfBusiness.postalCode')} />

                                    <CustomInput
                                        name='placeOfBusiness.houseNumber'
                                        value={values.placeOfBusiness.houseNumber}
                                        placeholder='House Number/Building Name'
                                        // customStyle={[Custom.mt20]}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('placeOfBusiness.houseNumber')}
                                        onBlur={handleBlur('placeOfBusiness.houseNumber')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'placeOfBusiness.houseNumber') && getIn(errors, 'placeOfBusiness.houseNumber')} />

                                    <CustomInput
                                        name='placeOfBusiness.streetName'
                                        value={values.placeOfBusiness.streetName}
                                        placeholder='Street Name'
                                        // customStyle={[Custom.mt20]}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('placeOfBusiness.streetName')}
                                        onBlur={handleBlur('placeOfBusiness.streetName')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'placeOfBusiness.streetName') && getIn(errors, 'placeOfBusiness.streetName')} />

                                    <CustomInput
                                        name='placeOfBusiness.branchAddress'
                                        value={values.placeOfBusiness.branchAddress}
                                        placeholder='Full Address of Branches'
                                        customStyle={{ height: 150 }}
                                        rows={5}
                                        multiline={true}
                                        onChangeText={handleChange('placeOfBusiness.branchAddress')}
                                        onBlur={handleBlur('placeOfBusiness.branchAddress')}
                                    />
                                    <ErrorMessage errorValue={getIn(touched, 'placeOfBusiness.branchAddress') && getIn(errors, 'placeOfBusiness.branchAddress')} />

                                    <UploadInput
                                        rightIcon={<Upload />}
                                        placeholder='Other Documents'
                                        uploaded={document}
                                        remove={() => this.removeImage('document')}
                                        onPress={() => this.showActionSheet('document')}
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
)(BusinessRegScreen1);
