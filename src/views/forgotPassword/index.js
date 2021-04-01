import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userActions } from '../../store/actions';




// components 
import { CustomBackground } from '../../components/Layouts';
import CustomButton from '../../components/atoms/CustomButton';
import LabelInput from '../../components/molecules/LabelInput';
import ClickableText from '../../components/atoms/ClickableText';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import CustomFooter from '../../components/atoms/CustomFooter';



// svgs 
import Logo from '../../assets/svg/Logo.svg';


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
})



function mapStateToProps(state) {
  const loading = state.user.loading;
  const resetTokenSent = state.user.resetTokenSent;


  return {
    loading,
    resetTokenSent
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: (data) => dispatch(userActions.forgotPassword(data)),
  };
}

class ForgotPasswordScreen extends Component {

  constructor(props) {
    super(props);

  }

  handleSubmit = async data => {
    const { forgotPassword } = this.props;

    if (data) {
      forgotPassword(data);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.resetTokenSent !== prevProps.resetTokenSent && this.props.resetTokenSent) {
      alert('A password reset token has been sent to your email')
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <Formik
        initialValues={{ email: '' }}
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
            <View style={{ flex: 1 }}>
              <View style={styles.customBackground}>

                <Text style={styles.titleStyle}>Forgot Password?</Text>

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

                <CustomButton
                  title='Submit'
                  buttonStyle={styles.buttonStyle}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  buttonColor={Colors.SECONDARY}
                  loading={loading}
                />

              </View>
              <CustomFooter />
            </View>
          )}
      </Formik>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);