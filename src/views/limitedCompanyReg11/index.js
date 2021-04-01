import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { companyRegActions, locationActions, serviceActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';
import { formatCamelCase, capitalizeWords } from '../../helpers/encode'
import { calculateFinalCharge } from '../../helpers/companyRegFunctions'




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
import NaturalPersonView from '../../components/Layouts/NaturalPersonView';
import LegalEntityView from '../../components/Layouts/LegalEntityView';
import CustomSmallButton from '../../components/atoms/CustomSmallButton';
import CustomRadioButton from '../../components/atoms/CustomRadioButton';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration22 from '../../assets/svg/Illustration22.svg'
import Info from '../../assets/svg/Info.svg'
import { mb10 } from '../../styles/custom';


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
        updateServicePayment: (service) => dispatch(serviceActions.updateServicePayment(service))
    };

}



class LimitedCompanyRegScreen11 extends PureComponent {

    constructor(props) {
        super(props)
        this.updatePSCs = this.updatePSCs.bind(this)
        this.removePsc = this.removePsc.bind(this)

        this.addForm = this.addForm.bind(this)
        this.navigateToNextPage = this.navigateToNextPage.bind(this)
    }

    state = {
        forms: [],
        isValid: false,
        yesOrNo: [
            {
                label: 'A: person with significant control (either a registrable person or registrable RLE) in relation to the company',
                value: 'yes'
            },
            {
                label: 'B: The company knows or has reason to believe that there will be no person with significant control (either a registrable person or RLE) in relation to the company',
                value: 'no'
            }
        ],
        addPSC: ''
    }



    updatePSCs = (psc) => {
        const { companyRegData } = this.props;
        companyRegData.PSCs.push(psc)
    }

    updateAddPSC = (val) => {
        const { companyRegData } = this.props;
        if (val === 'no' && companyRegData.PSCs.length > 0) {
            alert('A shareholder currently holds 5% or greater of your total shares and has been added as a PSC');
            // this.setState({
            //     addPSC: val,
            //     isValid: false
            // })
            // return;
        }
        this.setState({
            addPSC: val,
            isValid: true
        })
    }

    addForm = (type) => {
        this.setState({ forms: [...this.state.forms, type] })
    }

    removePsc = (index) => {
        const { companyRegData } = this.props;
        companyRegData.PSCs = companyRegData.PSCs.filter((item) => item.index !== index);
    }


    navigateToNextPage = async () => {
        const { navigation, companyRegData, companyRegType, updateServicePayment } = this.props;
        // if (companyRegType === 'limited' || companyRegType === 'unlimited') {
        //     navigation.navigate('LimitedCompanyReg5')
        // } else if (companyRegType === 'limitedByGuarantee') {
        // }
        const shareCapital = companyRegData['shareDetails']['totalShareCapital'];
        const companyType = companyRegData['companyType'];

        companyRegData.charge = await calculateFinalCharge(shareCapital, companyRegType, companyType);
        updateServicePayment(companyRegType);

        navigation.navigate('SelectPaymentMethod')
    }

    // async componentDidMount() {
    //     const { getCountries } = this.props;

    //     await getCountries();
    // }


 
    render() {
        const { navigation, loading, companyRegData, companyRegType, countries } = this.props;
        const {
            naturalPersons,
            legalEntities,
            forms,
            yesOrNo,
            addPSC,
            isValid
        } = this.state;

        let availablePSCs = companyRegData.PSCs ? companyRegData.PSCs.length : 0;

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
                        <Illustration22 />
                    </View>
                    <Text style={[styles.textCenter, styles.boldText]}>Persons with Significant Control (PSC)</Text>

                    <View style={[Custom.mv10, styles.infoBox]}>
                        <Text style={[styles.smallText, styles.textCenter, styles.infoText]}>
                            If on incorporation there is someone who will count as a person with significant control (either a registrable person or registrable relevant legal entity (RLE)) in relation to the company, tick the box in A and complete any relevant sections. If there will be no registrable person or RLE tick the box in B.
                        </Text>
                    </View>

                    <CustomRadioButton
                        radioProps={yesOrNo}
                        initial={'yes'}
                        updateSelected={(val) => this.updateAddPSC(val)}
                        formHorizontal={false}
                    />


                    {
                        addPSC === 'yes' ?
                            <View>
                                {
                                    forms.map((form, index) => {
                                        if (form === 'naturalPerson') {
                                            return (
                                                <NaturalPersonView
                                                    key={index + availablePSCs}
                                                    index={index + availablePSCs}
                                                    countries={countries}
                                                    naturalPersons={naturalPersons}
                                                    updateValues={this.updateValues}
                                                    updatePSCs={this.updatePSCs}
                                                    // removeText='Remove Director'
                                                    remove={this.removePsc}
                                                    title='New Natural Person'
                                                />
                                            )
                                        } else if (form === 'legalEntity') {
                                            return (
                                                <LegalEntityView
                                                    key={index + availablePSCs}
                                                    index={index + availablePSCs}
                                                    countries={countries}
                                                    legalEntities={legalEntities}
                                                    updateValues={this.updateValues}
                                                    updatePSCs={this.updatePSCs}
                                                    // removeText='Remove Director'
                                                    remove={this.removePsc}
                                                    title='New Legal Entity'
                                                />
                                            )
                                        }
                                    })
                                }



                                <View style={styles.row}>
                                    <View style={styles.halfCol}>
                                        <CustomSmallButton
                                            title='Add Natural Person'
                                            buttonStyle={styles.smallButtonStyle}
                                            customStyle={styles.primaryButtonStyle}
                                            onPress={() => this.addForm('naturalPerson')}
                                            buttonColor={Colors.SECONDARY}
                                        />
                                    </View>
                                    <View style={styles.halfCol}>
                                        <CustomSmallButton
                                            title='Add Legal Entity'
                                            buttonStyle={styles.smallButtonStyle}
                                            customStyle={styles.primaryButtonStyle}
                                            onPress={() => this.addForm('legalEntity')}
                                            buttonColor={Colors.SECONDARY}
                                        />
                                    </View>
                                </View>
                            </View>
                            : null
                    }




                    <CustomButton
                        title='Next'
                        buttonStyle={styles.buttonStyle}
                        customStyle={styles.primaryButtonStyle}
                        onPress={() => this.navigateToNextPage()}
                        buttonColor={Colors.SECONDARY}
                        disabled={!isValid}
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
)(LimitedCompanyRegScreen11);
