import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COMPANY_REGISTRATION_CHARGE } from 'react-native-dotenv';
import { companyRegActions, serviceActions, locationActions } from '../../store/actions';
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
import CustomSelect from '../../components/atoms/CustomSelect';
import CustomDatepicker from '../../components/atoms/CustomDatepicker';
import CustomSearchableDropdown from '../../components/atoms/CustomSearchableDropdown';
import SecretaryFormView from '../../components/Layouts/SecretaryFormView';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration11 from '../../assets/svg/Illustration11.svg'
import Info from '../../assets/svg/Info.svg'



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
        updateServicePayment: (service) => dispatch(serviceActions.updateServicePayment(service)),
        getCountries: (data) => dispatch(locationActions.getCountries(data))
    };
}





class LimitedCompanyRegScreen8 extends PureComponent {

    constructor(props) {
        super(props)
        this.updateSecretary = this.updateSecretary.bind(this)
    }



    updateSecretary = (secretary) => {
        const { navigation, companyRegData, companyRegType, updateServicePayment } = this.props;
        companyRegData['secretary'] = secretary
        // companyRegData['type'] = companyRegType 

        navigation.navigate('LimitedCompanyReg9');
    }

    async componentDidMount() {
        const { getCountries, countries } = this.props;

        await getCountries(); 
    }

    render() {
        const { navigation, loading, companyRegType, countries } = this.props;

        let breadcrumbText = companyRegType

        return (
            <View style={styles.customBackground}>
                    <Text style={[Custom.breadcrumbText,styles.boldText]}>
                    {"Company Registration > " + formatCamelCase(capitalizeWords(breadcrumbText))}
                </Text>
                <SecretaryFormView
                    navigation={navigation}
                    countries={countries}
                    updateSecretary={this.updateSecretary}
                />
                <CustomFooter />
            </View>
        );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LimitedCompanyRegScreen8); 
