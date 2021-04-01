import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
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
import CustomSelect from '../../components/atoms/CustomSelect';
import CustomDatepicker from '../../components/atoms/CustomDatepicker';
import CustomSearchableDropdown from '../../components/atoms/CustomSearchableDropdown';
// import ShareholderFormView from '../../components/Layouts/ShareholderFormView';
import DirectorFormView from '../../components/Layouts/DirectorFormView';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration11 from '../../assets/svg/Illustration11.svg'
import Info from '../../assets/svg/Info.svg'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    // fullName: Yup.string()
    //     .required('This is a required field'),
    // surname: Yup.string()
    //     .required('This is a required field'),
    // age: Yup.string()
    //     .required('This is a required field'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .min(11),
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
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
        countries,
        companyRegType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(companyRegActions.saveData(data)),
        getCountries: (data) => dispatch(locationActions.getCountries(data))
    };
}





class LimitedCompanyRegScreen6 extends PureComponent {

    constructor(props) {
        super(props)
        // this.updateShareholders = this.updateShareholders.bind(this)
        this.updateDirectors = this.updateDirectors.bind(this)

    }

    state = {
        sex:'',
        sexes: [
            { label: 'Male', value: 'male', },
            { label: 'Female', value: 'female' },
        ],
        dob: new Date()
    }



    updateSex = (sex) => {
        this.setState({ sex })
    }

    updateDOB = (dob) => {
        this.setState({ dob })
    }

    async componentDidMount() {
        const { getCountries, countries } = this.props;

        await getCountries();
    }

    // updateShareholders = (shareholder) => {
    //     const { navigation, companyRegData } = this.props;
    //     companyRegData.shareholders = [];
    //     companyRegData.shareholders.push(shareholder)

    //     navigation.navigate('LimitedCompanyReg7');
    // }

    updateDirectors = (director) => {
        const { navigation, companyRegData } = this.props;
        companyRegData.directors = [];
        companyRegData.directors.push(director)

        navigation.navigate('LimitedCompanyReg7');
    }

    render() {
        const { navigation, loading, companyRegType, countries } = this.props;
        const { sex, sexes, dob } = this.state;

        let breadcrumbText = companyRegType

        return (
            // <View style={styles.customBackground}>
            //     <ShareholderFormView 
            //         navigation={navigation}
            //         countries={countries}
            //         updateShareholders={this.updateShareholders}
            //     />
            //     <CustomFooter />
            // </View> 

            <View style={styles.customBackground}>
                    <Text style={[Custom.breadcrumbText,styles.boldText]}>
                    {"Company Registration > " + formatCamelCase(capitalizeWords(breadcrumbText))}
                </Text>
                <DirectorFormView
                    navigation={navigation}
                    countries={countries}
                    updateDirectors={this.updateDirectors}
                />
                <CustomFooter />
            </View>
        );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LimitedCompanyRegScreen6); 
