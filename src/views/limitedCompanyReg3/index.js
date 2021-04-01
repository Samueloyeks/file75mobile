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
import DirectorFormView from '../../components/Layouts/DirectorFormView';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration17 from '../../assets/svg/Illustration17.svg'
import Info from '../../assets/svg/Info.svg'




function mapStateToProps(state) {
    const {
        companyRegData,
        businessObjects,
        companyRegType
    } = state.companyReg;

    const {
        countries
    } = state.location;

    return {
        companyRegData,
        businessObjects,
        countries,
        companyRegType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(companyRegActions.saveData(data)),
    };
}





class LimitedCompanyRegScreen3 extends PureComponent {

    constructor(props) {
        super(props)
        // this.updateDirectors = this.updateDirectors.bind(this)
    }

    state = {
        businessCategory: '',
        businessObject: null,
        businessActivityDescription: '',
    }

    updateBusinessObject = async (object) => {
        this.setState({
            businessObject: object.businessObject,
            businessCategory: object.name,
            businessActivityDescription: object.businessObject
        });
    }


    // updateDirectors = (director) => {
    //     const { navigation, companyRegData } = this.props;
    //     companyRegData.directors = [];
    //     companyRegData.directors.push(director)

    //     navigation.navigate('LimitedCompanyReg4');
    // }

    handleSubmit = async data => {
        const { navigation, companyRegData } = this.props;
        const { businessCategory, businessObject } = this.state;
        companyRegData.objectsOfMemorandum = {};

        companyRegData['objectsOfMemorandum']['businessCategory'] = businessCategory;
        companyRegData['objectsOfMemorandum']['businessObject'] = businessObject;

        navigation.navigate('LimitedCompanyReg4');
    }

    render() {
        const { navigation, loading, companyRegType, countries, businessObjects } = this.props;
        const { businessActivityDescription } = this.state;

        let breadcrumbText = companyRegType

        return (
            // <View style={styles.customBackground}>
            //     <DirectorFormView
            //         navigation={navigation}
            //         countries={countries}
            //         updateDirectors={this.updateDirectors}
            //     />
            //     <CustomFooter />
            // </View>

            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={styles.content}>
                    <Text style={[Custom.breadcrumbText,styles.boldText]}>
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
                        <Illustration17 />
                    </View>

                    <Text style={[styles.boldText, styles.textCenter, Custom.mb20]}>Objects of Memorandum</Text>

                    <Formik
                        initialValues={{}}
                        onSubmit={values => { this.handleSubmit(values) }}
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
                                <View>

                                    <CustomSearchableDropdown
                                        options={businessObjects}
                                        onItemSelect={(item) => this.updateBusinessObject(item)}
                                        placeholder='General nature of business'
                                        required={true}
                                    />

                                    <ScrollView style={{ height: 220, backgroundColor: '#CDCDCD', padding: 10 }}>
                                        {
                                            (businessActivityDescription !== '' && Array.isArray(businessActivityDescription)) ?
                                                (
                                                    businessActivityDescription.map((description, index) => {
                                                        return (
                                                            <Text key={index} style={[Custom.mb10]}>{index + 1}. {description}</Text>
                                                        )
                                                    })
                                                )
                                                : null
                                        }
                                    </ScrollView>


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
            </View>
        );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LimitedCompanyRegScreen3); 
