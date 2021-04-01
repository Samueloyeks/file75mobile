import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { reservationActions, serviceActions, taskActions } from '../../store/actions';
import { getUser } from '../../helpers/auth';



// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import ServicesView from '../../components/Layouts/ServicesView';
import CustomFooter from '../../components/atoms/CustomFooter';
import ClickableText from '../../components/atoms/ClickableText';
import CustomInput from '../../components/atoms/CustomInput';
import CustomButton from '../../components/atoms/CustomButton';
import Paystack from '../../assets/svg/Paystack.svg';



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .min(11)
        .required('This is a required field'),
    companyName1: Yup.string()
        .required('This is a required field'),
    companyName2: Yup.string()
        .required('This is a required field'),
})

function mapStateToProps(state) {
    const { reservationData, submitted, loading } = state.reserve;
    const busRegLoading = state.businessReg.loading;
    const busRegSubmitted = state.businessReg.submitted;
    const companyRegLoading = state.companyReg.loading;
    const companyRegSubmitted = state.companyReg.submitted;
    const {
        params,
        extraParams
    } = state.tasks;


    return {
        loading,
        busRegLoading,
        reservationData,
        submitted,
        busRegSubmitted,
        companyRegLoading,
        companyRegSubmitted,
        params,
        extraParams
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // generateRef: () => dispatch(reservationActions.generateRef()),
        generateRef: () => dispatch(serviceActions.generateRef()),
        getTasks: (params) => dispatch(taskActions.getTasks(params, "pending")),
        getAllTasks: (params) => dispatch(taskActions.getAllTasks(params, "pending"))
    };
}




class SelectPaymentMethodScreen extends PureComponent {

    payWith = async method => {
        const { navigation, loading, generateRef } = this.props;

        switch (method) {
            case 'paystack':
                await generateRef();
                navigation.navigate('PaystackView')
        }
    }

    async componentDidUpdate(prevProps) {
        const { submitted, busRegSubmitted, companyRegSubmitted, navigation, params, extraParams, getTasks, getAllTasks } = this.props;

        if (
            (submitted !== prevProps.submitted && submitted) ||
            (busRegSubmitted !== prevProps.busRegSubmitted && busRegSubmitted) ||
            (companyRegSubmitted !== prevProps.companyRegSubmitted && companyRegSubmitted)
        ) {
            // const userData = await getUser();
            // params.byUserId = userData.id;
            // extraParams.pendingTasksPage = 1
            // params.page = extraParams.pendingTasksPage;
            // params.byStatusCode = 'pending';
            // getTasks(params);

            navigation.navigate('Home')
        }

    }


    render() {
        const { navigation, loading, busRegLoading, companyRegLoading } = this.props;

        return (
            <View
                style={{ flex: 1 }}
            // showsVerticalScrollIndicator={false}
            // keyboardShouldPersistTaps='handled'
            >
                <View style={[styles.customBackground]}>
                    <Text style={[Custom.mb20]}>Select Payment Method:</Text>
                    <View style={[Custom.row]}>
                        <View style={[Custom.col]}>
                            <TouchableOpacity onPress={() => this.payWith('paystack')}>
                                <Paystack />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.bottomView}>
                        <CustomButton
                            title='Back'
                            buttonStyle={styles.buttonStyle}
                            customStyle={styles.secondaryButtonStyle}
                            buttonColor={Colors.WHITE}
                            onPress={() => navigation.goBack(null)}
                        />
                    </View>
                </View>
                {
                    loading
                        ?
                        <View style={styles.overlay}>
                            <ActivityIndicator size='large' color={Colors.PRIMARY} />
                        </View>
                        :
                        null
                }
                {
                    busRegLoading
                        ?
                        <View style={styles.overlay}>
                            <ActivityIndicator size='large' color={Colors.PRIMARY} />
                        </View>
                        :
                        null
                }
                {
                    companyRegLoading
                        ?
                        <View style={styles.overlay}>
                            <ActivityIndicator size='large' color={Colors.PRIMARY} />
                        </View>
                        :
                        null
                }
                <CustomFooter />
            </View>
        );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectPaymentMethodScreen);
