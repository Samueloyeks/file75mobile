import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COMPANY_REGISTRATION_CHARGE } from 'react-native-dotenv';
import { companyRegActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';
import { numberToWords } from '../../helpers/encode'
import { formatCamelCase, capitalizeWords } from '../../helpers/encode'




// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import ServicesView from '../../components/Layouts/ServicesView';
import CustomFooter from '../../components/atoms/CustomFooter';
import ClickableText from '../../components/atoms/ClickableText';
import CustomInput from '../../components/atoms/CustomInput';
import LabelInput from '../../components/molecules/LabelInput';
import SuffixInput from '../../components/atoms/SuffixInput';
import PrefixInput from '../../components/atoms/PrefixInput';
import CustomButton from '../../components/atoms/CustomButton';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import ShareFormView from '../../components/Layouts/ShareFormView';

// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration13 from '../../assets/svg/Illustration13.svg'
import Info from '../../assets/svg/Info.svg'
import Naira from '../../assets/svg/Naira.svg'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    // shareDetails: Yup.object().shape({
    //     city: Yup.string()
    //         .required('This is a required field'),
    //     houseNumber: Yup.string()
    //         .required('This is a required field'),
    //     streetName: Yup.string()
    //         .required('This is a required field')
    // })
})

function mapStateToProps(state) {
    const {
        companyRegData,
        companyRegType
    } = state.companyReg;

    return {
        companyRegData,
        companyRegType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(companyRegActions.saveData(data))
    };
}





class LimitedCompanyRegScreen9 extends PureComponent {

    constructor(props) {
        super(props)
        this.updateShares = this.updateShares.bind(this)
        this.addShare = this.addShare.bind(this)
        this.remove = this.remove.bind(this)
    }

    state = {
        totalShareCapital: '',
        totalShareCapitalWords: '',
        preferenceShareCreated: false,
        equityShareCreated: false,
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
        shareForms: [],
        numberOfShares: 0
    }

    updateTotalShareCapital(capital) {
        this.setState({ totalShareCapital: capital }, () => {
            if (capital !== '') {
                let totalShareCapitalWords = numberToWords(capital) + ' naira';
                this.setState({ totalShareCapitalWords })
            } else {
                this.setState({ totalShareCapitalWords: '' })
            }
        })
    }


    addShare = () => {
        this.setState({ shareForms: [...this.state.shareForms, ""] })
    }

    remove = (index) => {
        const { companyRegData } = this.props;
        const { numberOfShares } = this.state;

        companyRegData.shareDetails.shares = companyRegData.shareDetails.shares.filter((item) => item.index !== index);
        this.setState({ numberOfShares: numberOfShares - 1 })

    }

    updateShares = (share) => {
        const { navigation, companyRegData } = this.props;
        const { numberOfShares } = this.state;

        if (numberOfShares < 1) {
            if (share.shareType === 'preference') this.setState({ preferenceShareCreated: true })
            if (share.shareType === 'equity') this.setState({ equityShareCreated: true })
        }

        companyRegData.shareDetails.shares.push(share)
        this.setState({ numberOfShares: numberOfShares + 1 })
    }

    handleSubmit = async data => {
        const { navigation, save, companyRegData } = this.props;
        const {
            totalShareCapital,
            totalShareCapitalWords
        } = this.state;


        if (
            totalShareCapital == '' ||
            totalShareCapitalWords == ''
        ) {
            alert('Please complete entire form');
            return;
        }
        if (companyRegData.shareDetails.shares.length == 0) {
            alert('Please add shares');
            return
        }

        let shares = companyRegData.shareDetails.shares;
        let totalAmount = 0;
        for (let i = 0; i < shares.length; i++) {
            totalAmount += parseInt(shares[i].shareCapital)
        }


        if (parseInt(totalAmount) !== parseInt(totalShareCapital)) {
            alert('Shares must add up to total issued share capital');
            return;
        }

        companyRegData['shareDetails']['totalShareCapital'] = totalShareCapital;
        companyRegData['shareDetails']['totalShareCapitalWords'] = totalShareCapitalWords;


        navigation.navigate('LimitedCompanyReg10');
    }


    componentDidMount() {
        const { companyRegData } = this.props;
        // companyRegData.shareDetails = {}
        // companyRegData.shareDetails.shares = [];

    }

    render() {
        const {
            shareCapitalUnits,
            pricePerShare,
            valueOfShares,
            shareForms,
            equityShareCreated,
            preferenceShareCreated,
            shareTypes,
            shareTypes2,
            shareTypes3,
            totalShareCapital,
            totalShareCapitalWords,
            numberOfShares
        } = this.state;

        const { navigation, loading, companyRegType } = this.props;

        let breadcrumbText = companyRegType

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
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
                        <Illustration13 />
                    </View>
                    <Text style={[styles.boldText, styles.textCenter]}>
                        Statement of Issues Share
                        </Text>
                    <View style={[Custom.mv10, styles.infoBox]}>
                        <Text style={[styles.smallText, styles.textCenter, styles.infoText]}>
                            Preference shares means a share by whatever name called which does not entitle the holder of it to any right to participate beyond a specified amount in any distribution whether by way of dividened or on redemption, in a winding up or otherwise.{"\n\n"}

                            Equity share(ordinary) means any share other than a preference share
                            </Text>
                    </View>
                    <Formik
                        initialValues={{
                            totalShareCapital: totalShareCapital,
                            totalShareCapitalWords: totalShareCapitalWords
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
                                    <LabelInput
                                        labelStyle={styles.labelStyle}
                                        labelText='Total Issued Share Capital'
                                        name='totalShareCapital'
                                        value={totalShareCapital}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={(text) => this.updateTotalShareCapital(text)}
                                        keyboardType='numeric'
                                        onBlur={handleBlur('totalShareCapital')}
                                        icon={<Naira />}
                                    />
                                    <ErrorMessage errorValue={touched.totalShareCapital && errors.totalShareCapital} />

                                    <LabelInput
                                        labelStyle={styles.labelStyle}
                                        labelText='Total Issued Share Capital in Words'
                                        name='totalShareCapitalWords'
                                        value={totalShareCapitalWords}
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        onChangeText={handleChange('totalShareCapitalWords')}
                                        keyboardType='numeric'
                                        onBlur={handleBlur('totalShareCapitalWords')}
                                        editable={false}
                                        customStyle={{ backgroundColor: '#C4C4C4' }}
                                    />
                                    <ErrorMessage errorValue={touched.totalShareCapitalWords && errors.totalShareCapitalWords} />

                                    <View style={[Custom.mv10, styles.infoBox]}>

                                        <Text style={[styles.smallText, styles.textCenter, styles.infoText]}>
                                            A breakdown of the total issued share capital into PREFERENCE and/or EQUITY(ordinary) shares
                                        </Text>
                                    </View>

                                    <ShareFormView
                                        key={0}
                                        index={0}
                                        navigation={navigation}
                                        updateShares={this.updateShares}
                                        remove={this.remove}
                                        totalShareCapital={totalShareCapital}
                                        shareTypes={shareTypes}
                                        title=''
                                    />
                                    {
                                        shareForms.map((shares, index) => {
                                            return (
                                                <ShareFormView
                                                    key={index + 1}
                                                    index={index + 1}
                                                    navigation={navigation}
                                                    updateShares={this.updateShares}
                                                    remove={this.remove}
                                                    totalShareCapital={totalShareCapital}
                                                    shareTypes={
                                                        equityShareCreated ?
                                                            shareTypes2 : preferenceShareCreated ?
                                                                shareTypes3 : []
                                                    }
                                                    title='New Share'
                                                />
                                            )
                                        })
                                    }

                                    {
                                        (numberOfShares > 0 && numberOfShares < 2) ?
                                            <TouchableOpacity style={styles.addFormButton} onPress={this.addShare}>
                                                <Text style={{ color: 'black', fontWeight: 'bold', textDecorationLine: 'underline' }}>Add Share</Text>
                                            </TouchableOpacity>
                                            : null
                                    }


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
)(LimitedCompanyRegScreen9);