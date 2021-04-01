import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { businessRegActions, locationActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';
import { formatCamelCase, capitalizeWords } from '../../helpers/encode'




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
import IndividualPartnerView from '../../components/Layouts/IndividualPartnerView';
import CorporatePartnerView from '../../components/Layouts/CorporatePartnerView';
import MinorPartnerView from '../../components/Layouts/MinorPartnerView';
import CustomSmallButton from '../../components/atoms/CustomSmallButton';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration1 from '../../assets/svg/Illustration1.svg'
import Info from '../../assets/svg/Info.svg'


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
})

function mapStateToProps(state) {
    const {
        businessRegData,
        businessRegType
    } = state.businessReg;


    const {
        countries
    } = state.location;

    return {
        businessRegData,
        businessRegType,
        countries
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(businessRegActions.saveData(data)),
        getCountries: (data) => dispatch(locationActions.getCountries(data)),
    };
}





class BusinessRegScreen2 extends PureComponent {

    constructor(props) {
        super(props)
        this.updateIndividuals = this.updateIndividuals.bind(this)
        this.updateCorporates = this.updateCorporates.bind(this)
        this.updateMinors = this.updateMinors.bind(this)

        this.removeIndividual = this.removeIndividual.bind(this)
        this.removeCorporate = this.removeCorporate.bind(this)
        this.removeMinor = this.removeMinor.bind(this)

        this.addForm = this.addForm.bind(this)
        this.navigateToNextPage = this.navigateToNextPage.bind(this)
    }

    state = {
        individualPartners: [],
        corporatePartners: [],
        minorPartners: [],
        forms: []
    }


    async componentDidMount() {
        const { getCountries, businessRegData } = this.props;

        await getCountries();
    }

    updateIndividuals = (individual) => {
        const { businessRegData, businessRegType, navigation } = this.props;
        if (businessRegType === 'partnership') {
            businessRegData.individualPartners.push(individual)
        } else {
            businessRegData.proprietor = individual;
            navigation.navigate('BusinessReg3')
        }
    }

    updateCorporates = (corporate) => {
        const { businessRegData } = this.props;
        businessRegData.corporatePartners.push(corporate)
    }

    updateMinors = (minor) => {
        const { businessRegData } = this.props;
        businessRegData.minorPartners.push(minor)
    }

    addForm = (type) => {
        this.setState({ forms: [...this.state.forms, type] })
    }

    removeIndividual = (index) => {
        const { businessRegData } = this.props;
        businessRegData.individualPartners = businessRegData.individualPartners.filter((item) => item.index !== index);
    }

    removeCorporate = (index) => {
        const { businessRegData } = this.props;
        businessRegData.corporatePartners = businessRegData.corporatePartners.filter((item) => item.index !== index);
    }

    removeMinor = (index) => {
        const { businessRegData } = this.props;
        businessRegData.minorPartners = businessRegData.minorPartners.filter((item) => item.index !== index);
    }

    navigateToNextPage = () => {
        const { navigation, companyRegType, businessRegType, businessRegData } = this.props;
        // if (companyRegType === 'limited' || companyRegType === 'unlimited') {
        //     navigation.navigate('LimitedCompanyReg5')
        // } else if (companyRegType === 'limitedByGuarantee') {
        // }
        if (businessRegType === 'soleProprietorship' &&
            businessRegData.individualPartners.length === 0
        ) {
            alert('Please add a proprietor');
            return;
        } else if (businessRegType === 'partnership' &&
            businessRegData.individualPartners.length === 0 &&
            businessRegData.minorPartners.length === 0 &&
            businessRegData.corporatePartners.length === 0 
        ) {
            alert('Please add a partner');
            return;
        }
        navigation.navigate('BusinessReg3')
    }


    render() {
        const { navigation, loading, businessRegData, businessRegType, countries } = this.props;
        const { individualPartners, corporatePartners, minorPartners, forms } = this.state;

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
                    <Text style={[styles.textCenter, styles.boldText, Custom.mt10]}>Particulars of Proprietors</Text>

                    {
                        forms.map((form, index) => {
                            if (form === 'individual') {
                                return (
                                    <IndividualPartnerView
                                        key={index}
                                        index={index}
                                        countries={countries}
                                        individualPartners={individualPartners}
                                        updateValues={this.updateValues}
                                        updateIndividuals={this.updateIndividuals}
                                        // removeText='Remove Director'
                                        remove={this.removeIndividual}
                                        title='New Individual Partner'
                                    />
                                )
                            } else if (form === 'corporate') {
                                return (
                                    <CorporatePartnerView
                                        key={index}
                                        index={index}
                                        countries={countries}
                                        corporatePartners={corporatePartners}
                                        updateValues={this.updateValues}
                                        updateCorporates={this.updateCorporates}
                                        // removeText='Remove Director'
                                        remove={this.removeCorporate}
                                        title='New Corporate Partner'
                                    />
                                )
                            } else if (form === 'minor') {
                                return (
                                    <MinorPartnerView
                                        key={index}
                                        index={index}
                                        countries={countries}
                                        minorPartners={minorPartners}
                                        updateValues={this.updateValues}
                                        updateMinors={this.updateMinors}
                                        // removeText='Remove Director'
                                        remove={this.removeMinor}
                                        title='New Minor Partner'
                                    />
                                )
                            }
                        })
                    }


                    {
                        businessRegType === 'partnership' ?
                            <View style={styles.row}>
                                <View style={styles.oneThirdCol}>
                                    <CustomSmallButton
                                        title='Add Individual partner'
                                        buttonStyle={styles.smallButtonStyle}
                                        customStyle={styles.primaryButtonStyle}
                                        onPress={() => this.addForm('individual')}
                                        buttonColor={Colors.SECONDARY}
                                    />
                                </View>
                                <View style={styles.oneThirdCol}>
                                    <CustomSmallButton
                                        title='Add Corporate partner'
                                        buttonStyle={styles.smallButtonStyle}
                                        customStyle={styles.primaryButtonStyle}
                                        onPress={() => this.addForm('corporate')}
                                        buttonColor={Colors.SECONDARY}
                                    />
                                </View>
                                <View style={styles.oneThirdCol}>
                                    <CustomSmallButton
                                        title='Add Minor partner'
                                        buttonStyle={styles.smallButtonStyle}
                                        customStyle={styles.primaryButtonStyle}
                                        onPress={() => this.addForm('minor')}
                                        buttonColor={Colors.SECONDARY}
                                    />
                                </View>
                            </View>
                            :
                            <IndividualPartnerView
                                key={1}
                                index={1}
                                countries={countries}
                                individualPartners={individualPartners}
                                updateValues={this.updateValues}
                                updateIndividuals={this.updateIndividuals}
                                // removeText='Remove Director'
                                remove={this.removeIndividual}
                                title=''
                            />
                    }


                    <CustomButton
                        title='Next'
                        buttonStyle={styles.buttonStyle}
                        customStyle={styles.primaryButtonStyle}
                        onPress={() => this.navigateToNextPage()}
                        buttonColor={Colors.SECONDARY}
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
)(BusinessRegScreen2);
