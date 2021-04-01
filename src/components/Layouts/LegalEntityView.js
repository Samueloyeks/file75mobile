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
import CustomRadioButton from '../atoms/CustomRadioButton';


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
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .required('This is a required field')
        .min(11),
    email: Yup.string()
        .label('Email')
        .required('This is a required field')
        .email('Enter a valid email'),
    // authorizedSignatory: Yup.object().shape({
    //     surname: Yup.string()
    //         .required('This is a required field'),
    //     firstName: Yup.string()
    //         .required('This is a required field')
    // }),
    // companyAddress: Yup.object().shape({
    //     city: Yup.string()
    //         .required('This is a required field'),
    //     houseNumber: Yup.string()
    //         .required('This is a required field'),
    //     streetName: Yup.string()
    //         .required('This is a required field')
    // }),
    serviceAddress: Yup.object().shape({
        city: Yup.string()
            .required('This is a required field'),
        houseNumber: Yup.string()
            .required('This is a required field'),
        streetName: Yup.string()
            .required('This is a required field'),
        // lga: Yup.string()
        //     .required('This is a required field')
    }),
    governingLaw: Yup.string()
        .required('This is a required field'),
})

const validationSchema2 = Yup.object().shape({
    companyName: Yup.string()
        .required('This is a required field'),
    regNumber: Yup.string()
        .required('This is a required field'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .required('This is a required field')
        .min(11),
    email: Yup.string()
        .label('Email')
        .required('This is a required field')
        .email('Enter a valid email'),
    // authorizedSignatory: Yup.object().shape({
    //     surname: Yup.string()
    //         .required('This is a required field'),
    //     firstName: Yup.string()
    //         .required('This is a required field')
    // }),
    // companyAddress: Yup.object().shape({
    //     city: Yup.string()
    //         .required('This is a required field'),
    //     houseNumber: Yup.string()
    //         .required('This is a required field'),
    //     streetName: Yup.string()
    //         .required('This is a required field')
    // }),
    serviceAddress: Yup.object().shape({
        city: Yup.string()
            .required('This is a required field'),
        houseNumber: Yup.string()
            .required('This is a required field'),
        streetName: Yup.string()
            .required('This is a required field'),
        // lga: Yup.string()
        //     .required('This is a required field')
    }),
    percentageHeldDirectly: Yup.string()
        .required('This is a required field'),
    percentageHeldIndirectly: Yup.string()
        .required('This is a required field'),
    votingHeldDirectly: Yup.string()
        .required('This is a required field'),
    votingHeldIndirectly: Yup.string()
        .required('This is a required field'),
    governingLaw: Yup.string()
        .required('This is a required field'),
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


class LegalEntityView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sex:'',
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
            taxResidency: '',
            legalForm: '',
            legalForms: [
                {
                    label: 'Government',
                    value: 'Government'
                },
                {
                    label: 'Statutory Corporation',
                    value: 'Statutory Corporation'
                },
                {
                    label: 'Private Limited Company',
                    value: 'Private Limited Company'
                },
                {
                    label: 'Public Limited Company',
                    value: 'Public Limited Company'
                },
                {
                    label: 'Private Unlimited Company',
                    value: 'Private Unlimited Company'
                },
                {
                    label: 'Public Unlimited Company',
                    value: 'Public Unlimited Company'
                },
                {
                    label: 'Company Limited By Guarantee',
                    value: 'Company Limited By Guarantee'
                },
                {
                    label: 'Limited Liability Partnership',
                    value: 'Limited Liability Partnership'
                },
                {
                    label: 'Incorporated Trustee',
                    value: 'Incorporated Trustee'
                },
                {
                    label: 'Trust',
                    value: 'Trust'
                },
                {
                    label: 'Other Legal Arrangements ',
                    value: 'Other Legal Arrangements '
                },
                {
                    label: 'Others',
                    value: 'Others'
                }
            ],
            nationality: '',
            signature: null,
            passport: null,
            uploading: '',
            individualShareholder: null,
            added: false,
            shareType: '',
            shareTypes: [
                { label: 'Preference', value: 'preference', },
                { label: 'Equity', value: 'equity' },
            ],
            shareTypes2: [
                { label: 'Preference', value: 'preference', },
            ],
            shareTypes3: [
                { label: 'Equity', value: 'equity' },
            ],
            shareUnits: '',
            shareAmount: '',
            sharesAlloted: '',
            prescribedParticulars: '',
            prescribedParticularsList: [
                {
                    label: 'Particulars of any voting rights, including rights that arise only in certain circumstances',
                    value: 'Particulars of any voting rights, including rights that arise only in certain circumstances'
                },
                {
                    label: 'Particulars of any rights, as respects dividends, to participate in a distribution',
                    value: 'Particulars of any rights, as respects dividends, to participate in a distribution'
                },
                {
                    label: 'Particulars of any rights, as respect capital, to participate in a distribution (including on winding up)',
                    value: 'Particulars of any rights, as respect capital, to participate in a distribution (including on winding up)'
                },
                {
                    label: 'Whether the shares are to be redeemed or are liable to be redeemed at the option of the company or the shareholder',
                    value: 'Whether the shares are to be redeemed or are liable to be redeemed at the option of the company or the shareholder'
                },
            ],
            percentageOfTotal: null,
            yesOrNo: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
            ],
            holding5Percent: '',
            voting5Percent: '',
            appointAndRemove: '',
            influence: '',
            IndividualInfluence: '',
            nameType: null,
            nameTypes: [
                {
                    label: "'Translation' - translation of a name",
                    value: "'Translation' - translation of a name"
                },
                {
                    label: "'Former' - former name (for example, a maiden name)",
                    value: "'Former' - former name (for example, a maiden name)"
                },
                {
                    label: "'Alias' - an alias",
                    value: "'Alias' - an alias"
                },
                {
                    label: "'Nick' - a nickname",
                    value: "'Nick' - a nickname"
                },
                {
                    label: "'Birth' - the name of the PSC at birth",
                    value: "'Birth' - the name of the PSC at birth"
                },
            ],
            statesLoading: false,
            serviceStatesLoading: false
        }

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


    updateDOB = (dob) => {
        this.setState({ dob })
    }


    updateNationality = async (nationality) => {
        this.setState({ nationality: nationality.name });
    }

    updateTaxResidency = async (nationality) => {
        this.setState({ taxResidency: nationality.name });
    }
    updateLegalForm = async (legalForm) => {
        this.setState({ legalForm });
    }
    updateNameType = async (nameType) => {
        this.setState({ nameType });
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

    updateShareType = (shareType) => {
        const { companyRegData } = this.props;
        let shares = companyRegData.shareDetails.shares
        const share = shares.find((share) => share.shareType == shareType);

        if (share) this.setState({ shareType, shareUnits: share.units, shareAmount: share.shareCapital })
    }

    updateSharesAlloted = (sharesAlloted) => {
        const { shareUnits, shareAmount } = this.state;
        const { companyRegData } = this.props;

        if (parseInt(sharesAlloted) > parseInt(shareUnits)) {
            alert('Cannot allot more than available share units');
            return
        }

        this.setState({ sharesAlloted }, () => {
            let amountOfTotalShareCapital = (parseInt(sharesAlloted) * parseInt(shareAmount) / parseInt(shareUnits));
            let totalShareCapital = companyRegData.shareDetails.totalShareCapital;
            let percentageOfTotal = ((parseInt(amountOfTotalShareCapital) / parseInt(totalShareCapital)) * 100).toFixed(2)

            this.setState({ percentageOfTotal })
        })
    }

    updatePrescribedParticulars = (prescribedParticulars) => {
        this.setState({ prescribedParticulars })
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
        const { index, updatePSCs } = this.props;
        const {
            sex,
            dob,
            nationality,
            country,
            state,
            lga,
            signature,
            passport,
            serviceCountry,
            serviceState,
            serviceLga,
            nameType,
            shareType,
            sharesAlloted,
            percentageOfTotal,
            prescribedParticulars,
            taxResidency,
            holding5Percent,
            voting5Percent,
            appointAndRemove,
            influence,
            IndividualInfluence,
            legalForm
        } = this.state;


        if (
            taxResidency == '' ||
            legalForm == '' ||
            holding5Percent == '' ||
            appointAndRemove == '' ||
            influence == '' ||
            IndividualInfluence == ''
        ) {
            alert('Please complete entire form');
            return;
        }
        var regData = { ...data }

        regData['index'] = index;
        // regData['authorizedSignatory']['sex'] = sex;
        // regData['authorizedSignatory']['nationality'] = nationality;
        regData['authorizedSignatory']['alternativeNameinfo']['nameType'] = nameType ? nameType : null;
        // regData['companyAddress']['country'] = country;
        // regData['companyAddress']['state'] = state;
        // regData['companyAddress']['lga'] = lga;
        regData['serviceAddress']['country'] = serviceCountry;
        regData['serviceAddress']['state'] = serviceState;
        if (serviceCountry === 'Nigeria') regData['serviceAddress']['lga'] = serviceLga;
        // regData['share'] = {}
        // regData['share']['shareType'] = shareType
        // regData['share']['sharesAlloted'] = sharesAlloted
        // regData['share']['prescribedParticulars'] = prescribedParticulars
        regData['nameType'] = nameType;
        regData['taxResidency'] = taxResidency;
        regData['legalForm'] = legalForm;
        regData['holding5Percent'] = holding5Percent;
        regData['voting5Percent'] = voting5Percent;
        regData['appointAndRemove'] = appointAndRemove;
        regData['influence'] = influence;
        regData['IndividualInfluence'] = IndividualInfluence;
        regData['PSCType'] = 'legalEntity'


        this.setState({ added: true })
        updatePSCs(regData);
    }

    componentDidMount() {
        const { companyRegData } = this.props;
        const { shareTypes2, shareTypes3 } = this.state;
        let shares = companyRegData.shareDetails.shares;
        if (shares.length == 1) {
            if (shares[0].shareType === 'preference') this.setState({ shareTypes: shareTypes2 })
            if (shares[0].shareType === 'equity') this.setState({ shareTypes: shareTypes3 })
        }
    }

    render() {
        const { sex,
            sexes,
            dob,
            states,
            lgas,
            signature,
            passport,
            added,
            shareTypes,
            shareType,
            sharesAlloted,
            shareUnits,
            percentageOfTotal,
            prescribedParticulars,
            prescribedParticularsList,
            yesOrNo,
            holding5Percent,
            voting5Percent,
            legalForm,
            legalForms,
            statesLoading,
            serviceStatesLoading,
            nameTypes,
            nameType,
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
                    initialValues={
                        !(holding5Percent && voting5Percent) ?
                            {
                                companyName: '',
                                regNumber: '',
                                phone: '',
                                email: '',
                                authorizedSignatory: {
                                    alternativeNameinfo: {
                                        nameType: '',
                                        fullName: '',
                                        familyName: '',
                                        givenName: '',
                                        patronymicName: ''
                                    }
                                },
                                // companyAddress: {
                                //     city: '',
                                //     houseNumber: '',
                                //     streetName: '',
                                //     postalCode: ''
                                // },
                                serviceAddress: {
                                    city: '',
                                    houseNumber: '',
                                    streetName: '',
                                    postalCode: '',
                                    lga: ''
                                },
                                register: '',
                                governingLaw: ''
                            }
                            :
                            {
                                companyName: '',
                                regNumber: '',
                                phone: '',
                                email: '',
                                authorizedSignatory: {
                                    alternativeNameinfo: {
                                        nameType: '',
                                        fullName: '',
                                        familyName: '',
                                        givenName: '',
                                        patronymicName: ''
                                    }
                                },
                                // companyAddress: {
                                //     city: '',
                                //     houseNumber: '',
                                //     streetName: '',
                                //     postalCode: ''
                                // },
                                serviceAddress: {
                                    city: '',
                                    houseNumber: '',
                                    streetName: '',
                                    postalCode: '',
                                    lga: ''
                                },
                                register: '',
                                governingLaw: '',
                                percentageHeldDirectly: '',
                                percentageHeldIndirectly: '',
                                votingHeldDirectly: '',
                                votingHeldIndirectly: ''
                            }
                    }
                    onSubmit={values => { this.handleSubmit(values) }}
                    validationSchema={!(holding5Percent && voting5Percent) ? validationSchema : validationSchema2}
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
                                    placeholder='Name of Entity'
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

                                <View style={[Custom.mv10, styles.infoBox]}>
                                    <Text style={[styles.smallText, styles.textCenter, styles.infoText]}>
                                        Select country in which the PSC is resident for tax purposes
                                    </Text>
                                </View>
                                <CustomSearchableDropdown
                                    options={countries}
                                    onItemSelect={(item) => this.updateTaxResidency(item)}
                                    placeholder='Select Tax Residency'
                                    required={true}
                                />


                                <CustomSelect
                                    options={legalForms}
                                    selected={legalForm}
                                    updateSelected={this.updateLegalForm}
                                    placeholder={{ label: 'Legal Form' }}
                                    required={true}
                                />
                                {
                                    legalForm === 'Others' ?
                                        <View>
                                            <CustomInput
                                                name='otherLegalForm'
                                                value={values.otherLegalForm}
                                                placeholder='Other Legal Form'
                                                // customStyle={[Custom.mt20]}
                                                // iconName='asterisk'
                                                // iconColor={Colors.DANGER}
                                                onChangeText={handleChange('otherLegalForm')}
                                                onBlur={handleBlur('otherLegalForm')}
                                            />
                                            <ErrorMessage errorValue={touched.otherLegalForm && errors.otherLegalForm} />
                                        </View>
                                        : null
                                }

                                <CustomInput
                                    name='register'
                                    value={values.register}
                                    placeholder='Register'
                                    // customStyle={[Custom.mt20]}
                                    // iconName='asterisk'
                                    // iconColor={Colors.DANGER}
                                    onChangeText={handleChange('register')}
                                    onBlur={handleBlur('register')}
                                />
                                <ErrorMessage errorValue={touched.register && errors.register} />

                                <CustomInput
                                    name='governingLaw'
                                    value={values.governingLaw}
                                    placeholder='Governing Law'
                                    customStyle={{ height: 150 }}
                                    rows={5}
                                    multiline={true}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('governingLaw')}
                                    onBlur={handleBlur('governingLaw')}
                                />
                                <ErrorMessage errorValue={touched.governingLaw && errors.governingLaw} />

                                <Text style={[styles.boldText, Custom.mv10]}>Alternative Name Information (If any)</Text>

                                <CustomSelect
                                    options={nameTypes}
                                    selected={nameType}
                                    updateSelected={this.updateNameType}
                                    customStyle={[Custom.mb20]}
                                    placeholder={{ label: 'Name Type' }}
                                    required={true}
                                />

                                <CustomInput
                                    name='authorizedSignatory.alternativeNameinfo.fullName'
                                    value={values.authorizedSignatory.alternativeNameinfo.fullName}
                                    placeholder='Full Name'
                                    onChangeText={handleChange('authorizedSignatory.alternativeNameinfo.fullName')}
                                    onBlur={handleBlur('authorizedSignatory.alternativeNameinfo.fullName')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'authorizedSignatory.alternativeNameinfo.fullName') && getIn(errors, 'authorizedSignatory.alternativeNameinfo.fullName')} />

                                <CustomInput
                                    name='authorizedSignatory.alternativeNameinfo.familyName'
                                    value={values.authorizedSignatory.alternativeNameinfo.familyName}
                                    placeholder='Family Name'
                                    onChangeText={handleChange('authorizedSignatory.alternativeNameinfo.familyName')}
                                    onBlur={handleBlur('authorizedSignatory.alternativeNameinfo.familyName')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'authorizedSignatory.alternativeNameinfo.familyName') && getIn(errors, 'authorizedSignatory.alternativeNameinfo.familyName')} />

                                <CustomInput
                                    name='authorizedSignatory.alternativeNameinfo.givenName'
                                    value={values.authorizedSignatory.alternativeNameinfo.givenName}
                                    placeholder='Given Name'
                                    onChangeText={handleChange('authorizedSignatory.alternativeNameinfo.givenName')}
                                    onBlur={handleBlur('authorizedSignatory.alternativeNameinfo.givenName')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'authorizedSignatory.alternativeNameinfo.givenName') && getIn(errors, 'authorizedSignatory.alternativeNameinfo.givenName')} />

                                <CustomInput
                                    name='authorizedSignatory.alternativeNameinfo.patronymicName'
                                    value={values.authorizedSignatory.alternativeNameinfo.patronymicName}
                                    placeholder='Patronymic Name'
                                    onChangeText={handleChange('authorizedSignatory.alternativeNameinfo.patronymicName')}
                                    onBlur={handleBlur('authorizedSignatory.alternativeNameinfo.patronymicName')}
                                />
                                <ErrorMessage errorValue={getIn(touched, 'authorizedSignatory.alternativeNameinfo.patronymicName') && getIn(errors, 'authorizedSignatory.alternativeNameinfo.patronymicName')} />

                                <Text style={[styles.boldText, Custom.mv10]}>Contact Details</Text>

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
                                <ErrorMessage errorValue={getIn(touched, 'phone') && getIn(errors, 'phone')} />

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
                                <ErrorMessage errorValue={getIn(touched, 'email') && getIn(errors, 'email')} />

                                <Text style={[styles.boldText, Custom.mv10]}>Service Address for PSC</Text>

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
                                    serviceCountry==='Nigeria'?
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



                                <View>
                                    <Text style={[styles.boldText, Custom.mv10]}>Details of the interest(s) held</Text>

                                    <View style={[Custom.mv10, styles.infoBox]}>
                                        <Text style={[styles.smallText, styles.textCenter, styles.infoText]}>
                                            Shares in a company or interest in a limited liability partnership
                                                </Text>
                                    </View>

                                    <Text style={{ color: '#A7A7A7', marginVertical: 5 }}>
                                        Does the PSC directly or indirectly hold at least 5% of the shares or interest in a company or limited liability partnership?
                                            </Text>
                                    <CustomRadioButton
                                        radioProps={yesOrNo}
                                        initial={'yes'}
                                        updateSelected={(val) => this.setState({ holding5Percent: val })}
                                        formHorizontal={true}
                                    />

                                    {
                                        holding5Percent === 'yes' ?
                                            <View>
                                                <CustomInput
                                                    name='percentageHeldDirectly'
                                                    value={values.percentageHeldDirectly}
                                                    placeholder='Percentage Held Directly'
                                                    // customStyle={[Custom.mt20]}
                                                    iconName='asterisk'
                                                    iconColor={Colors.DANGER}
                                                    keyboardType='numeric'
                                                    onChangeText={handleChange('percentageHeldDirectly')}
                                                    onBlur={handleBlur('percentageHeldDirectly')}
                                                />
                                                <ErrorMessage errorValue={touched.percentageHeldDirectly && errors.percentageHeldDirectly} />

                                                <CustomInput
                                                    name='percentageHeldIndirectly'
                                                    value={values.percentageHeldIndirectly}
                                                    placeholder='Percentage Held Indirectly'
                                                    // customStyle={[Custom.mt20]}
                                                    iconName='asterisk'
                                                    iconColor={Colors.DANGER}
                                                    keyboardType='numeric'
                                                    onChangeText={handleChange('percentageHeldIndirectly')}
                                                    onBlur={handleBlur('percentageHeldIndirectly')}
                                                />
                                                <ErrorMessage errorValue={touched.percentageHeldIndirectly && errors.percentageHeldIndirectly} />
                                            </View>
                                            : null
                                    }

                                    <Text style={{ color: '#A7A7A7', marginVertical: 5 }}>
                                        Does the PSC directly or indirectly hold at least 5% of the voting rights in a company or limited liability partnership?
                                            </Text>
                                    <CustomRadioButton
                                        radioProps={yesOrNo}
                                        initial={'yes'}
                                        updateSelected={(val) => this.setState({ voting5Percent: val })}
                                        formHorizontal={true}
                                    />

                                    {
                                        voting5Percent === 'yes' ?
                                            <View>
                                                <CustomInput
                                                    name='votingHeldDirectly'
                                                    value={values.votingHeldDirectly}
                                                    placeholder='Percentage Held Directly'
                                                    // customStyle={[Custom.mt20]}
                                                    iconName='asterisk'
                                                    iconColor={Colors.DANGER}
                                                    keyboardType='numeric'
                                                    onChangeText={handleChange('votingHeldDirectly')}
                                                    onBlur={handleBlur('votingHeldDirectly')}
                                                />
                                                <ErrorMessage errorValue={touched.votingHeldDirectly && errors.votingHeldDirectly} />

                                                <CustomInput
                                                    name='votingHeldIndirectly'
                                                    value={values.votingHeldIndirectly}
                                                    placeholder='Percentage Held Indirectly'
                                                    // customStyle={[Custom.mt20]}
                                                    iconName='asterisk'
                                                    iconColor={Colors.DANGER}
                                                    keyboardType='numeric'
                                                    onChangeText={handleChange('votingHeldIndirectly')}
                                                    onBlur={handleBlur('votingHeldIndirectly')}
                                                />
                                                <ErrorMessage errorValue={touched.votingHeldIndirectly && errors.votingHeldIndirectly} />
                                            </View>
                                            : null
                                    }

                                    <View style={[Custom.mv10, styles.infoBox]}>
                                        <Text style={[styles.smallText, styles.textCenter, styles.infoText]}>
                                            The right to appoint or remove a majority of the directors or partners
                                                </Text>
                                    </View>

                                    <Text style={{ color: '#A7A7A7', marginVertical: 5 }}>
                                        Does the PSC directly or indirectly hold the right to appoint or remove a majority of the directors or partners in a company or limited liability partnership?
                                            </Text>
                                    <CustomRadioButton
                                        radioProps={yesOrNo}
                                        initial={'yes'}
                                        updateSelected={(val) => this.setState({ appointAndRemove: val })}
                                        formHorizontal={true}
                                    />

                                    <View style={[Custom.mv10, styles.infoBox]}>
                                        <Text style={[styles.smallText, styles.textCenter, styles.infoText]}>
                                            Significant influence or control over a company or limited partnership                                                </Text>
                                    </View>

                                    <Text style={{ color: '#A7A7A7', marginVertical: 5 }}>
                                        Does the PSC otherwise have the right to exercise or is actually exercising significant influence or control over a company or limited liability partnership?
                                                </Text>
                                    <CustomRadioButton
                                        radioProps={yesOrNo}
                                        initial={'yes'}
                                        updateSelected={(val) => this.setState({ influence: val })}
                                        formHorizontal={true}
                                    />

                                    <View style={[Custom.mv10, styles.infoBox]}>
                                        <Text style={[styles.smallText, styles.textCenter, styles.infoText]}>
                                            Significant influence or control whether or not the PSC is a legal entity, but would itself satisfy any of the first four conditions if it were an individual
                                                </Text>
                                    </View>

                                    <Text style={{ color: '#A7A7A7', marginVertical: 5 }}>
                                        Does the PSC have the right to exercise, or actually exercise significant influence or control over the activities of a trust or firm, whether or not it is a legal entity, but would itself satisfy any of the first four conditions if it were an individual?
                                            </Text>
                                    <CustomRadioButton
                                        radioProps={yesOrNo}
                                        initial={'yes'}
                                        updateSelected={(val) => this.setState({ IndividualInfluence: val })}
                                        formHorizontal={true}
                                    />
                                </View>

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
)(LegalEntityView); 
