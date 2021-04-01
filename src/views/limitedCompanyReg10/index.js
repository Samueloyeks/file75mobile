import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { companyRegActions, locationActions } from '../../store/actions';
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
import IndividualShareholderView from '../../components/Layouts/IndividualShareholderView';
import CorporateShareholderView from '../../components/Layouts/CorporateShareholderView';
import MinorShareholderView from '../../components/Layouts/MinorShareholderView';
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
        getCountries: (data) => dispatch(locationActions.getCountries(data)),
    };
}





class LimitedCompanyRegScreen10 extends PureComponent {

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
        individualShareholders: [],
        corporateShareholders: [],
        minorShareholders: [],
        forms: []
    }


    async componentDidMount() {
        const { getCountries, companyRegData } = this.props;
        // companyRegData.individualShareholders = [];
        // companyRegData.corporateShareholders = [];
        // companyRegData.minorShareholders = [];
        // companyRegData.PSCs = [];


        await getCountries();
    }

    updateIndividuals = (individual) => {
        const { companyRegData } = this.props;
        companyRegData.individualShareholders.push(individual)
    }

    updateCorporates = (corporate) => {
        const { companyRegData } = this.props;
        companyRegData.corporateShareholders.push(corporate)
    }

    updateMinors = (minor) => {
        const { companyRegData } = this.props;
        companyRegData.minorShareholders.push(minor)
    }

    updatePSCs = (psc) => {
        const { companyRegData } = this.props;
        companyRegData.PSCs.push(psc)
    }

    addForm = (type) => {
        this.setState({ forms: [...this.state.forms, type] })
    }

    removeIndividual = (index) => {
        const { companyRegData } = this.props;
        companyRegData.individualShareholders = companyRegData.individualShareholders.filter((item) => item.index !== index);
    }

    removeCorporate = (index) => {
        const { companyRegData } = this.props;
        companyRegData.corporateShareholders = companyRegData.corporateShareholders.filter((item) => item.index !== index);
    }

    removeMinor = (index) => {
        const { companyRegData } = this.props;
        companyRegData.minorShareholders = companyRegData.minorShareholders.filter((item) => item.index !== index);
    }

    navigateToNextPage = () => {
        const { navigation, companyRegType, companyRegData } = this.props;

        if (companyRegData.corporateShareholders.length === 0 &&
            companyRegData.individualShareholders.length === 0 &&
            companyRegData.minorShareholders.length === 0
        ) {
            alert('Please add shareholder');
            return
        }
        navigation.navigate('LimitedCompanyReg11')
    }
 

    render() {
        const { navigation, loading, companyRegData, companyRegType, countries } = this.props;
        const { individualShareholders, corporateShareholders, minorShareholders, forms } = this.state;

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
                    <Text style={[styles.textCenter, styles.boldText]}>Shareholders</Text>

                    {
                        forms.map((form, index) => {
                            if (form === 'individual') {
                                return (
                                    <IndividualShareholderView
                                        key={index}
                                        index={index}
                                        countries={countries}
                                        individualShareholders={individualShareholders}
                                        updateValues={this.updateValues}
                                        updateIndividuals={this.updateIndividuals}
                                        updatePSCs={this.updatePSCs}
                                        // removeText='Remove Director'
                                        remove={this.removeIndividual}
                                        title='New Individual Shareholder'
                                    />
                                )
                            } else if (form === 'corporate') {
                                return (
                                    <CorporateShareholderView
                                        key={index}
                                        index={index}
                                        countries={countries}
                                        corporateShareholders={corporateShareholders}
                                        updateValues={this.updateValues}
                                        updateCorporates={this.updateCorporates}
                                        updatePSCs={this.updatePSCs}
                                        // removeText='Remove Director'
                                        remove={this.removeCorporate}
                                        title='New Corporate Shareholder'
                                    />
                                )
                            } else if (form === 'minor') {
                                return (
                                    <MinorShareholderView
                                        key={index}
                                        index={index}
                                        countries={countries}
                                        minorShareholders={minorShareholders}
                                        updateValues={this.updateValues}
                                        updateMinors={this.updateMinors}
                                        updatePSCs={this.updatePSCs}
                                        // removeText='Remove Director'
                                        remove={this.removeMinor}
                                        title='New Minor Shareholder'
                                    />
                                )
                            }
                        })
                    }



                    <View style={styles.row}>
                        <View style={styles.oneThirdCol}>
                            <CustomSmallButton
                                title='Add Individual Shareholder'
                                buttonStyle={styles.smallButtonStyle}
                                customStyle={styles.primaryButtonStyle}
                                onPress={() => this.addForm('individual')}
                                buttonColor={Colors.SECONDARY}
                            />
                        </View>
                        <View style={styles.oneThirdCol}>
                            <CustomSmallButton
                                title='Add Corporate Shareholder'
                                buttonStyle={styles.smallButtonStyle}
                                customStyle={styles.primaryButtonStyle}
                                onPress={() => this.addForm('corporate')}
                                buttonColor={Colors.SECONDARY}
                            />
                        </View>
                        <View style={styles.oneThirdCol}>
                            <CustomSmallButton
                                title='Add Minor Shareholder'
                                buttonStyle={styles.smallButtonStyle}
                                customStyle={styles.primaryButtonStyle}
                                onPress={() => this.addForm('minor')}
                                buttonColor={Colors.SECONDARY}
                            />
                        </View>
                    </View>



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



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LimitedCompanyRegScreen10);
