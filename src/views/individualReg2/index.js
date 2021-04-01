import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NAME_RESERVATION_CHARGE } from 'react-native-dotenv';
import { businessRegActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';




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


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration5 from '../../assets/svg/Illustration5.svg'
import Info from '../../assets/svg/Info.svg'



const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('This is a required field'),
    surname: Yup.string()
        .required('This is a required field'),
    age: Yup.string()
        .required('This is a required field'),
})

function mapStateToProps(state) {
    const {
        businessRegData
    } = state.businessReg;

    return {
        businessRegData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(businessRegActions.saveData(data))
    };
}





class IndividualRegScreen2 extends PureComponent {

    state = {
        sex:'', 
        sexes: [
            { label: 'Male', value: 'male', },
            { label: 'Female', value: 'female' },
        ]
    }

    handleSubmit = async data => {
        const { navigation, save, businessRegData } = this.props;
        const { sex } = this.state;

        var regData = { ...data }
        for (const key in regData) {
            businessRegData[key] = regData[key]
        }
        businessRegData['sex'] = sex;

        navigation.navigate('IndividualReg3');
    }

    updateSex = (sex) => {
        this.setState({ sex })
    }


    render() {
        const { navigation, loading, businessRegData } = this.props;
        const { sex, sexes } = this.state;

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>
                    <View style={[Custom.mv30]}>
                        <Text style={[styles.boldText]}>
                            Business Name <TinyArrows />
                        </Text>
                        <Text style={[styles.boldText]}>
                            Registration Made <Text style={[styles.primary]}>Easy</Text>
                        </Text>
                    </View>
                    <View style={[styles.textInline, Custom.mv20, styles.textCenter,]}>
                        <Illustration5 />
                    </View>
                    <Text style={[Custom.mv20, Typography.FONT_BOLD]}>Particulars of Proprietors (the relevant information are as follows:</Text>
                    <Formik
                        initialValues={{ fullName: '', surname: '', age: '' }}
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
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                        rightIcon={
                                            <Tooltip
                                                height={100}
                                                backgroundColor='#4D4D4D'
                                                popover={
                                                    <Text style={{ color: '#FFF' }}>
                                                        Input your first
                                                        name and last name
                                                </Text>
                                                }>
                                                <Info />
                                            </Tooltip>
                                        }
                                    />
                                    <ErrorMessage errorValue={touched.fullName && errors.fullName} />

                                    <CustomInput
                                        name='surname'
                                        value={values.surname}
                                        placeholder='Any Former Forename or Surname'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('surname')}
                                        onBlur={handleBlur('surname')}
                                        rightIcon={
                                            <Tooltip
                                                height={70}
                                                backgroundColor='#4D4D4D'
                                                popover={
                                                    <Text style={{ color: '#FFF' }}>
                                                        Input your former
                                                        name (if any)
                                                </Text>
                                                }>
                                                <Info />
                                            </Tooltip>
                                        }
                                    />
                                    <ErrorMessage errorValue={touched.surname && errors.surname} />

                                    {/* <CustomInput
                                        name='sex'
                                        value={values.sex}
                                        placeholder='Sex'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('sex')}
                                        onBlur={handleBlur('sex')}
                                    />
                                    <ErrorMessage errorValue={touched.sex && errors.sex} /> */}

                                    <CustomSelect
                                        options={sexes}
                                        selected={sex}
                                        updateSelected={this.updateSex}
                                        customStyle={[Custom.mb20]}
                                        placeholder={{label:'Sex'}}
                                    />

                                    <CustomInput
                                        name='age'
                                        value={values.age}
                                        placeholder='Age'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        customStyle={[Custom.mt10]}
                                        keyboardType='number-pad'
                                        onChangeText={handleChange('age')}
                                        onBlur={handleBlur('age')}
                                    />
                                    <ErrorMessage errorValue={touched.age && errors.age} />

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
)(IndividualRegScreen2); 
