import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userActions } from '../../store/actions';
import { getUser } from '../../helpers/auth'


import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'

// components 
import CustomFooter from '../../components/atoms/CustomFooter';
import CustomInput from '../../components/atoms/CustomInput';
import CustomButton from '../../components/atoms/CustomButton';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import ContactBlock from '../../components/atoms/ContactBlock';
import LabelInput from '../../components/molecules/LabelInput';

// svg 
import Illustration7 from '../../assets/svg/Illustration7.svg';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //     .label('Email')
    //     .email('Enter a valid email')
    //     .required('Please enter a registered email'),
    // phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    //     .min(11)
    //     .required('This is a required field')

})

function mapStateToProps(state) {
    const { loading, userData } = state.user


    return {
        loading,
        userData
    };
}


function mapDispatchToProps(dispatch) {
    return {

    };
}





class AccountScreen extends PureComponent {

    state = {
        signature: null,
        passport: null,
        userData: ''
    }

    handleSubmit = async data => {

        console.log(data);
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


    async componentDidMount() {
        let userData = await getUser();
        this.setState({ userData })
        this.setState({
            passport: userData.passport,
            signature: userData.signature
        })
    }

    render() {
        const { navigation, loading } = this.props;
        const { signature, passport, userData } = this.state;

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>

                    <Formik
                        initialValues={{
                            // email: userData.email,
                            phone: userData.phone,
                            fullName: userData.fullName
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

                                    <Text style={[styles.boldText, Custom.mv20]}>EDIT PROILE</Text>


                                    {/* <LabelInput
                                        name='email'
                                        value={userData.email}
                                        placeholder='Email'
                                        keyboardType='email-address'
                                        labelStyle={styles.labelStyle}
                                        labelText='EMAIL'
                                        onChangeText={handleChange('email')}
                                        autoCapitalize='none'
                                        onBlur={handleBlur('email')}
                                    />
                                    <ErrorMessage errorValue={touched.email && errors.email} /> */}

                                    <LabelInput
                                        name='fullName'
                                        value={userData.fullName}
                                        placeholder='Full Name'
                                        // keyboardType='email-address'
                                        labelStyle={styles.labelStyle}
                                        labelText='FULL NAME'
                                        onChangeText={handleChange('fullName')}
                                        // autoCapitalize='none'
                                        onBlur={handleBlur('fullName')}
                                    />
                                    <ErrorMessage errorValue={touched.fullName && errors.fullName} />

                                    <LabelInput
                                        name='phone'
                                        value={userData.phone}
                                        placeholder='Phone Number'
                                        keyboardType='phone-pad'
                                        labelStyle={styles.labelStyle}
                                        labelText='PHONE NUMBER'
                                        onChangeText={handleChange('phone')}
                                        autoCapitalize='none'
                                        onBlur={handleBlur('phone')}
                                    />
                                    <ErrorMessage errorValue={touched.phone && errors.phone} />

                                    <Text style={[styles.labelStyle]}>PASSPORT</Text>
                                    <View style={styles.imageContainer}>
                                        <View style={styles.image}>
                                            {passport ?
                                                <Image
                                                    source={{ uri: passport.path ? passport.path : passport }}
                                                    style={{ width: 200, height: 150, }}
                                                /> :
                                                <Illustration7 />
                                            }
                                        </View>
                                        <CustomButton
                                            title='Upload Passport'
                                            buttonStyle={styles.buttonStyle}
                                            customStyle={styles.primaryButtonStyle}
                                            onPress={() => this.showActionSheet('passport')}
                                            // disabled={!isValid}
                                            buttonColor={Colors.SECONDARY}
                                            loading={loading}
                                        />
                                    </View>

                                    <Text style={[styles.labelStyle]}>SIGNATURE</Text>
                                    <View style={styles.imageContainer}>
                                        <View style={styles.image}>
                                            {signature ?
                                                <Image
                                                    source={{ uri: signature.path ? signature.path : signature }}
                                                    style={{ width: 200, height: 150, }}
                                                /> :
                                                <Illustration7 />
                                            }
                                        </View>
                                        <CustomButton
                                            title='Upload Signature'
                                            buttonStyle={styles.buttonStyle}
                                            customStyle={styles.primaryButtonStyle}
                                            onPress={() => this.showActionSheet('signature')}
                                            // disabled={!isValid}
                                            buttonColor={Colors.SECONDARY}
                                            loading={loading}
                                        />
                                    </View>

                                    <CustomButton
                                        title='Submit'
                                        buttonStyle={styles.buttonStyle}
                                        customStyle={styles.primaryButtonStyle}
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                        buttonColor={Colors.SECONDARY}
                                        loading={loading}
                                    />
                                </View>
                            )}
                    </Formik>
                </ScrollView>
                <CustomButton
                    title='Back'
                    buttonStyle={styles.buttonStyle}
                    customStyle={styles.secondaryButtonStyle}
                    buttonColor={Colors.WHITE}
                    onPress={() => navigation.goBack(null)}
                />
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



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountScreen);
