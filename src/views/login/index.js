import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userActions } from '../../store/actions';





// components 
import CustomButton from '../../components/atoms/CustomButton';
import LabelInput from '../../components/molecules/LabelInput';
import ClickableText from '../../components/atoms/ClickableText';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import SocialAuthBlock from '../../components/atoms/SocialAuthBlock';
import CustomFooter from '../../components/atoms/CustomFooter';



// svgs 
import Logo from '../../assets/svg/Logo.svg';


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
})



function mapStateToProps(state) {
  const {
    loading,
    isAuthenticated,
    userData
  } = state.user;


  return {
    loading,
    isAuthenticated,
    userData
  };
}


function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(userActions.login(data)),
    facebookAuth: (data) => dispatch(userActions.facebookAuth(data)),
    googleAuth: (data) => dispatch(userActions.googleAuth(data))
  };
}

class LoginScreen extends Component {

  constructor(props) {
    super(props);

  }

  handleSubmit = async data => {
    const { login } = this.props;

    if (data) {
      login(data);
    }
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated, navigation, userData } = this.props;

    if (isAuthenticated !== prevProps.isAuthenticated && isAuthenticated) {
      if (userData.verified) {
        navigation.navigate('Home')
      } else {
        alert('Please verify your email to Log In')
      }
    }
  }



  render() {
    const { navigation, facebookAuth, googleAuth, loading } = this.props;

    return (
      <Formik
        initialValues={{ email: '', password: '' }}
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps='handled'>
              <View style={styles.customBackground}>

                <Logo />
                <Text style={styles.titleStyle}>Login to your account</Text>

                <LabelInput
                  name='email'
                  value={values.email}
                  placeholder='email@example.com'
                  keyboardType='email-address'
                  labelStyle={styles.labelStyle}
                  labelText='Email address'
                  onChangeText={handleChange('email')}
                  autoCapitalize='none'
                  onBlur={handleBlur('email')}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />


                <LabelInput
                  placeholder='........'
                  labelStyle={styles.labelStyle}
                  labelText='Password'
                  secureTextEntry={true}
                  name='password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  autoCapitalize='none'
                  onBlur={handleBlur('password')}
                />
                <ErrorMessage errorValue={touched.password && errors.password} />

                <CustomButton
                  title='Login'
                  buttonStyle={styles.buttonStyle}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  buttonColor={Colors.SECONDARY}
                  loading={loading}
                />
                <SocialAuthBlock
                  // handleFacebookSubmit={this._facebookLogin}
                  handleFacebookSubmit={facebookAuth}
                  handleGoogleSubmit={googleAuth}
                />
                <View style={[styles.textCenter, styles.textInline, Custom.mt20]}>
                  <Text>Don’t have an account? </Text><ClickableText text='Register' textStyle={styles.boldText} action={() => navigation.navigate('Signup')} />
                </View>
                <View style={[styles.textCenter, styles.textInline, Custom.mt20]}>
                  <Text>Forgot your password? </Text><ClickableText text='Recover password' textStyle={styles.boldText} action={() => navigation.navigate('ForgotPassword')} />
                </View>

              </View>
              <CustomFooter />
            </ScrollView>
          )}
      </Formik>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);