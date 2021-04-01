import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { taskActions, serviceActions, feedbackEmailActions } from '../../store/actions';
import { getUser } from '../../helpers/auth';



// components 
import CustomFooter from '../../components/atoms/CustomFooter';
import CustomInput from '../../components/atoms/CustomInput';
import CustomButton from '../../components/atoms/CustomButton';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import ContactBlock from '../../components/atoms/ContactBlock';
import CustomSelect from '../../components/atoms/CustomSelect';
import CustomSearchableDropdown from '../../components/atoms/CustomSearchableDropdown';



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .min(11),
    body: Yup.string()
        .required('This is a required field'),
})

function mapStateToProps(state) {
    const {
        tasks,
        params,
        loadingMore,
        refreshing
    } = state.tasks;
    const { services } = state.services;
    const loadingTasks = state.tasks.loading
    const { loading } = state.feedback

    return {
        loading,
        tasks,
        services,
        params,
        loadingMore,
        refreshing,
        loadingTasks
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTasks: (params) => dispatch(taskActions.getTasks(params)),
        getServices: () => dispatch(serviceActions.getServices()),
        sendFeedback: (data) => dispatch(feedbackEmailActions.sendFeedback(data))
    };
}





class ContactsScreen extends PureComponent {

    state = {
        categoryCode: '',
        submissionId: ''
    }

    updateService = async (categoryCode) => {
        const { getTasks, params, tasks } = this.props;
        const userData = await getUser();

        params.byUserId = userData.id;
        params.byCategorycode = categoryCode

        this.setState({ categoryCode })
        await getTasks(params);
    }

    updateSubmission = (task) => this.setState({ submissionId: task._id })

    handleSubmit = async data => {
        const { sendFeedback } = this.props;
        const { categoryCode, submissionId } = this.state
        const userData = await getUser();

        data.categoryCode = categoryCode;
        data.submissionId = submissionId;
        data.user = userData;

        sendFeedback(data);
    }


    async componentDidMount() {
        const { getTasks, params, getServices } = this.props;

        await getServices();
    }

    render() {
        var { navigation, services, loadingTasks, tasks, loading } = this.props;
        const { categoryCode, submissionId } = this.state;

        services = services.filter(service => service.category !== 'All')

        for (var service of services) {
            service.label = service.category;
            service.value = service.code
        }
        for (var task of tasks) {
            task.name = task.businessName1 ? task.businessName1 : task.companyName1;
        }


        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}
                    keyboardShouldPersistTaps="handled"
                >

                    <Formik
                        initialValues={{ fullName: '', email: '', phone: '', body: '' }}
                        onSubmit={(values, { resetForm }) => {
                            this.handleSubmit(values);
                            resetForm({ values: '' });
                            this.setState({ categoryCode: '', submissionId: '' })
                        }}
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

                                    <Text style={[styles.boldText, Custom.mv20]}>SUPPORT</Text>
                                    <ContactBlock />
                                    <Text style={[styles.boldText, Custom.mv20]}>MESSAGE US</Text>


                                    <Text style={[Custom.mb20]}>If your message is about a submission, please specify which one</Text>

                                    <CustomSelect
                                        options={services}
                                        selected={categoryCode}
                                        placeholder={{ label: 'Select Category' }}
                                        updateSelected={this.updateService}
                                        customStyle={[Custom.mt20]}
                                    />

                                    {
                                        !loadingTasks ?

                                            <CustomSearchableDropdown
                                                options={tasks}
                                                selected={submissionId}
                                                onItemSelect={(item) => this.updateSubmission(item)}
                                                // customStyle={[Custom.mb20]}
                                                placeholder='Search for Submission'
                                            />
                                            :
                                            <Text style={[Custom.mv10]}>Loading Submissions...</Text>
                                    }


                                    <CustomInput
                                        name='fullName'
                                        value={values.fullName}
                                        placeholder='Full Name'
                                        customStyle={[Custom.mt20]}
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                    />
                                    <ErrorMessage errorValue={touched.fullName && errors.fullName} />

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.48 }}>
                                            <CustomInput
                                                name='email'
                                                value={values.email}
                                                placeholder='Email'
                                                customStyle={[Custom.mt10]}
                                                keyboardType='email-address'
                                                onChangeText={handleChange('email')}
                                                autoCapitalize='none'
                                                onBlur={handleBlur('email')}
                                            />
                                            <ErrorMessage errorValue={touched.email && errors.email} />
                                        </View>

                                        <View style={{ flex: 0.48, marginLeft: 'auto' }}>
                                            <CustomInput
                                                name='phone'
                                                value={values.phone}
                                                placeholder='Phone Number'
                                                customStyle={[Custom.mt10]}
                                                keyboardType='phone-pad'
                                                onChangeText={handleChange('phone')}
                                                onBlur={handleBlur('phone')}
                                            />
                                            <ErrorMessage errorValue={touched.phone && errors.phone} />
                                        </View>
                                    </View>

                                    <CustomInput
                                        name='body'
                                        value={values.body}
                                        placeholder='Message'
                                        customStyle={{ height: 150 }}
                                        rows={5}
                                        multiline={true}
                                        onChangeText={handleChange('body')}
                                        onBlur={handleBlur('body')}
                                    />
                                    <ErrorMessage errorValue={touched.body && errors.body} />

                                    <CustomButton
                                        title='Submit'
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
)(ContactsScreen);
