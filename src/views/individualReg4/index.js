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

import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'


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
import UploadInput from '../../components/atoms/UploadInput';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration5 from '../../assets/svg/Illustration5.svg'
import Info from '../../assets/svg/Info.svg'
import Upload from '../../assets/svg/Upload.svg'
import Passport from '../../assets/svg/Passport.svg'



const validationSchema = Yup.object().shape({
    state: Yup.string()
        .required('This is a required field'),
    city: Yup.string()
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





class IndividualRegScreen4 extends PureComponent {

    state = {
        signature: null,
        passport: null,
        uploading: ''
    }

    handleSubmit = async data => {
        const { navigation, save, businessRegData } = this.props;
        const { signature, passport } = this.state;

        if (!signature) {
            alert('Please upload signature');
            return;
        }
        if (!passport) {
            alert('Please upload passport');
            return;
        }

        var regData = { ...data }
        for (const key in regData) {
            businessRegData[key] = regData[key]
        }
        businessRegData['signature'] = signature
        businessRegData['passport'] = passport
        businessRegData['type'] = 'individual'


        navigation.navigate('PreviewIndividualReg');
    }

    showActionSheet = (uploading) => {
        this.setState({ uploading }, () => {
            this.ActionSheet.show()
        })
    }

    getImageFrom(index) {
        const { uploading } = this.state;

        if (index === 0) {
            this.selectCameraImage(uploading)
        }
        if (index === 1) {
            this.selectGalleryImages(uploading)
        }
    }

    selectGalleryImages = (uploading) => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            multiple: false,
            title: 'Select a Picture',
            maxFiles: 4,
            includeBase64: true,
            writeTempFile: true,
            avoidEmptySpaceAroundImage: true,
            loadingLabelText: 'Loading Images...',
            showsSelectedCount: true,
            avoidEmptySpaceAroundImage: true,
            showCropGuidelines: true,
            showCropFrame: true,
            enableRotationGesture: true,
        }).then(image => {
            this.setState({ [uploading]: image })
        });
    }

    selectCameraImage = (uploading) => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true,
            writeTempFile: true,
            avoidEmptySpaceAroundImage: true,
            loadingLabelText: 'Loading Images...',
            showsSelectedCount: true,
            avoidEmptySpaceAroundImage: true,
            showCropGuidelines: true,
            showCropFrame: true,
            enableRotationGesture: true,
        }).then(image => {
            this.setState({ [uploading]: image })
        });
    }

    removeImage = (removing) => {
        this.setState({
            [removing]: null
        })
    }

    render() {
        const { navigation, loading, businessRegData } = this.props;
        const { signature, passport } = this.state;

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
                        initialValues={{ state: '', city: '' }}
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
                                        name='state'
                                        value={values.state}
                                        placeholder='State'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        // customStyle={[Custom.mt10]}
                                        onChangeText={handleChange('state')}
                                        onBlur={handleBlur('state')}
                                    />
                                    <ErrorMessage errorValue={touched.state && errors.state} />

                                    <CustomInput
                                        name='city'
                                        value={values.city}
                                        placeholder='City'
                                        iconName='asterisk'
                                        iconColor={Colors.DANGER}
                                        // customStyle={[Custom.mt10]}
                                        onChangeText={handleChange('city')}
                                        onBlur={handleBlur('city')}
                                    />
                                    <ErrorMessage errorValue={touched.city && errors.city} />

                                    <UploadInput
                                        rightIcon={<Upload />}
                                        placeholder='Upload Your Signature'
                                        uploaded={signature}
                                        remove={() => this.removeImage('signature')}
                                        onPress={() => this.showActionSheet('signature')}
                                    />

                                    <UploadInput
                                        customStyle={Custom.mt20}
                                        rightIcon={<Passport />}
                                        placeholder='Upload fairly recent passport photograph'
                                        uploaded={passport}
                                        remove={() => this.removeImage('passport')}
                                        onPress={() => this.showActionSheet('passport')}
                                    />

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

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Select Image From'}
                    options={['Camera', 'Gallery', 'cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={2}
                    onPress={(index) => this.getImageFrom(index)}
                />
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
)(IndividualRegScreen4); 
