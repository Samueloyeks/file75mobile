import React, { Component, PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors, Typography } from '../../styles';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { numberToWords } from '../../helpers/encode'


// components 
import CustomButton from '../atoms/CustomButton';
import ErrorMessage from '../atoms/ErrorMessage';
import CustomSelect from '../atoms/CustomSelect';
import LabelInput from '../../components/molecules/LabelInput';



// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration12 from '../../assets/svg/Illustration12.svg'
import Naira from '../../assets/svg/Naira.svg'




const validationSchema = Yup.object().shape({
    // surname: Yup.string()
    //     .required('This is a required field'),

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

    };
}


class ShareFormView extends Component {


    state = {
        shareType: '',
        uploading: '',
        shareCapital: '',
        shareCapitalWords: '',
        units: '',
        nominalShareValue: '',
        added: false
    }


    updateShareType = (shareType) => {
        this.setState({ shareType })
    }

    updateShareCapital(capital) {
        const { units } = this.state;

        this.setState({ shareCapital: capital }, () => {
            if (capital !== '') {
                let shareCapitalWords = numberToWords(capital) + ' naira';
                this.setState({ shareCapitalWords })
            } else {
                this.setState({ shareCapitalWords: '' })
            }

            this.updateUnits(units);
        })
    }

    updateUnits(units) {
        this.setState({ units }, () => {
            const { units, shareCapital } = this.state
            if (units !== '' && shareCapital !== '') {
                let nominalShareValue = parseInt(shareCapital) / parseInt(units);
                this.setState({ nominalShareValue: nominalShareValue.toFixed(2).toString() })
            } else {
                this.setState({ nominalShareValue: '' })
            }
        })
    }


    handleSubmit = async data => {
        const { navigation, companyRegData, updateShares, totalShareCapital,index } = this.props;
        const {
            shareType,
            shareCapital,
            shareCapitalWords,
            units,
            nominalShareValue
        } = this.state;
        let shares = companyRegData.shareDetails.shares;
        let totalAmount = 0

        if (
            shareType == '' ||
            shareCapital == '' ||
            shareCapitalWords == '' ||
            units == '' ||
            nominalShareValue == ''
        ) {
            alert('Please complete form');
            return;
        }


        for (let i = 0; i < shares.length; i++) {
            totalAmount += shares[i].shareCapital
        }

        if (totalShareCapital !== '' && (parseInt(totalAmount) + parseInt(shareCapital) > parseInt(totalShareCapital))) {
            alert('Total share capital exceeded');
            return;
        }


        var regData = {
            shareType,
            shareCapital,
            shareCapitalWords,
            units,
            nominalShareValue,
            index
        }

        this.setState({ added: true })
        updateShares(regData);
    }

    render() {
        const { added, shareType, shareCapital, shareCapitalWords, units, nominalShareValue } = this.state;

        const { navigation, title, index, remove, removeText, shareTypes } = this.props;

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={styles.content}>
                <Text style={[Custom.mv20, Typography.FONT_BOLD]}>Share</Text>
                <Formik
                    initialValues={{

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
                            <View>

                                <CustomSelect
                                    options={shareTypes}
                                    selected={shareType}
                                    updateSelected={this.updateShareType}
                                    customStyle={[Custom.mb20]}
                                    placeholder={{ label: 'Share Type' }}
                                    required={true}
                                />

                                <LabelInput
                                    labelStyle={styles.labelStyle}
                                    labelText='Issued Share Capital'
                                    name='shareCapital'
                                    value={shareCapital}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={(text) => this.updateShareCapital(text)}
                                    keyboardType='numeric'
                                    onBlur={handleBlur('shareCapital')}
                                    icon={<Naira />}
                                />
                                <ErrorMessage errorValue={touched.shareCapital && errors.shareCapital} />

                                <LabelInput
                                    labelStyle={styles.labelStyle}
                                    labelText='Issued Share Capital in Words'
                                    name='shareCapitalWords'
                                    value={shareCapitalWords}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('shareCapitalWords')}
                                    keyboardType='numeric'
                                    onBlur={handleBlur('shareCapitalWords')}
                                    editable={false}
                                    customStyle={{ backgroundColor: '#C4C4C4' }}
                                />
                                <ErrorMessage errorValue={touched.shareCapitalWords && errors.shareCapitalWords} />

                                <LabelInput
                                    labelStyle={styles.labelStyle}
                                    labelText='Divided Into (number of units)'
                                    name='units'
                                    value={units}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={(text) => this.updateUnits(text)}
                                    keyboardType='numeric'
                                    onBlur={handleBlur('units')}
                                />
                                <ErrorMessage errorValue={touched.units && errors.units} />

                                <LabelInput
                                    labelStyle={styles.labelStyle}
                                    labelText='Issued Share Capital'
                                    name='Nominal value of each share (price per unit)'
                                    value={nominalShareValue}
                                    iconName='asterisk'
                                    iconColor={Colors.DANGER}
                                    onChangeText={handleChange('nominalShareValue')}
                                    keyboardType='numeric'
                                    onBlur={handleBlur('nominalShareValue')}
                                    editable={false}
                                    icon={<Naira />}
                                    customStyle={{ backgroundColor: '#C4C4C4' }}
                                />
                                <ErrorMessage errorValue={touched.nominalShareValue && errors.nominalShareValue} />

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

                            </View>
                        )}
                </Formik>

            </ScrollView>
        )
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareFormView); 
