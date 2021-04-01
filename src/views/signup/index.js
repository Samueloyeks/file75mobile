import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
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
  fullName: Yup.string()
    .required('name is a required field'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
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

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (data) => dispatch(userActions.signup(data))
  };
}

class SignupScreen extends Component {

  constructor(props) {
    super(props);

  }

  handleSubmit = async data => {
    const { signup } = this.props;

    if (data) {
      signup(data);
    }
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated, navigation,userData } = this.props;

    if (isAuthenticated !== prevProps.isAuthenticated && isAuthenticated) {
      // navigation.navigate('Home')
      navigation.navigate('Login')
      alert('Please verify your email to log In')
    }
  }

  render() {
    const { navigation, loading } = this.props;

    return (
      <Formik
        initialValues={{ fullName: '', email: '', password: '' }}
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
              showsVerticalScrollIndicator={false}>
              <View style={styles.customBackground}>

                <Logo />
                <Text style={styles.titleStyle}>Create your account</Text>

                <LabelInput
                  name='fullName'
                  value={values.fullName}
                  placeholder='John Doe'
                  labelStyle={styles.labelStyle}
                  labelText='Full name'
                  onChangeText={handleChange('fullName')}
                  autoCapitalize
                  onBlur={handleBlur('fullName')}
                />
                <ErrorMessage errorValue={touched.fullName && errors.fullName} />

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
                  title='Sign up'
                  buttonStyle={styles.buttonStyle}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  buttonColor={Colors.SECONDARY}
                  loading={loading}
                />
                <SocialAuthBlock />
                <View style={[styles.textCenter, styles.textInline, Custom.mt40]}>
                  <Text>Already have an account? </Text><ClickableText text='Sign In' textStyle={styles.boldText} action={() => navigation.navigate('Login')} />
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
)(SignupScreen);