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
import ExtraDirectorFormView from '../../components/Layouts/ExtraDirectorFormView';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration10 from '../../assets/svg/Illustration10.svg'
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
        companyRegType,
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





class LimitedCompanyRegScreen7 extends PureComponent {

    constructor(props) {
        super(props)
        this.updateDirectors = this.updateDirectors.bind(this)
        this.addDirector = this.addDirector.bind(this)
        this.remove = this.remove.bind(this)
        this.navigateToNextPage = this.navigateToNextPage.bind(this)
    }

    state = {
        sex:'',
        sexes: [
            { label: 'Male', value: 'male', },
            { label: 'Female', value: 'female' },
        ],
        dob: new Date(),
        directors: [],
        directorForms: []
    }



    updateSex = (sex) => {
        this.setState({ sex })
    }

    updateDOB = (dob) => {
        this.setState({ dob })
    }

    async componentDidMount() {
        const { getCountries, countries, companyRegData } = this.props;

        await getCountries();
    }

    updateDirectors = (director) => {
        const { navigation, companyRegData } = this.props;
        companyRegData.directors.push(director)
    }

    addDirector = () => {
        this.setState({ directorForms: [...this.state.directorForms, ""] })
    }

    remove = (index) => {
        const { companyRegData } = this.props;
        companyRegData.directors = companyRegData.directors.filter((item) => item.index !== index);
    }

    navigateToNextPage = () => {
        const { navigation, companyRegType } = this.props;
        if (companyRegType === 'limited' || companyRegType === 'unlimited') {
            navigation.navigate('LimitedCompanyReg8')
        } else if (companyRegType === 'limitedByGuarantee') {
            navigation.navigate('LimitedCompanyReg8')
        }
    }
 

    render() {
        const { navigation, loading, companyRegType, countries } = this.props;
        const { sex, sexes, dob, directors, directorForms } = this.state;

        let breadcrumbText = companyRegType

        return (
            <View style={styles.customBackground}>
                    <Text style={[Custom.breadcrumbText,styles.boldText]}>
                    {"Company Registration > " + formatCamelCase(capitalizeWords(breadcrumbText))}
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={styles.content}>
                    <ExtraDirectorFormView
                        index={1}
                        navigation={navigation}
                        countries={countries}
                        directors={directors}
                        updateValues={this.updateValues}
                        updateDirectors={this.updateDirectors}
                        remove={this.remove}
                        title=''
                    />
                    {
                        directorForms.map((directors, index) => {
                            return (
                                <ExtraDirectorFormView
                                    key={index + 2}
                                    index={index + 2}
                                    countries={countries}
                                    directors={directors}
                                    updateValues={this.updateValues}
                                    updateDirectors={this.updateDirectors}
                                    // removeText='Remove Director'
                                    remove={this.remove}
                                    title='New Director'
                                />
                            )
                        })
                    }

                    <TouchableOpacity style={styles.addFormButton} onPress={this.addDirector}>
                        <Text style={{ color: 'black', fontWeight: 'bold', textDecorationLine: 'underline' }}>Add More Directors</Text>
                    </TouchableOpacity>

                    <CustomButton
                        title='Next'
                        buttonStyle={styles.buttonStyle}
                        customStyle={styles.primaryButtonStyle}
                        onPress={() => this.navigateToNextPage()}
                        buttonColor={Colors.SECONDARY}
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
)(LimitedCompanyRegScreen7); 
