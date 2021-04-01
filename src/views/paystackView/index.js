import PaystackWebView from 'react-native-paystack-webview';
import React, { PureComponent, useRef } from 'react';
import {
    Platform,
    Text,
    View,
    StyleSheet,
    Button,
    TextInput,
    BackHandler,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {
    PAYSTACK_PUBLIC_KEY,
    PAYSTACK_SECRET_KEY,
    AEG_MAIL,
    AEG_PHONE,
    AEG_NAME
} from 'react-native-dotenv';
import { Colors } from '../../styles';
import { reservationActions, businessRegActions, companyRegActions } from '../../store/actions';
import { generateId } from '../../helpers/uniqueId';
import { getUser } from '../../helpers/auth';






function mapStateToProps(state) {
    const {
        loading,
        reservationData
    } = state.reserve;

    const {
        businessIndividualRegData,
        businessRegData
    } = state.businessReg;

    const {
        companyRegData
    } = state.companyReg;

    const {
        payForService,
        transactionRef
    } = state.services


    return {
        loading,
        reservationData,
        businessRegData,
        businessIndividualRegData,
        companyRegData,
        transactionRef,
        payForService
    };
}

function mapDispatchToProps(dispatch) {
    return {
        reserveName: (data) => dispatch(reservationActions.reserveName(data)),
        registerBusiness: (data) => dispatch(businessRegActions.registerBusiness(data)),
        registerIndividualBusiness: (data) => dispatch(businessRegActions.registerIndividualBusiness(data)),
        registerLimitedCompany: (data) => dispatch(companyRegActions.registerLimitedCompany(data)),
        registerUnlimitedCompany: (data) => dispatch(companyRegActions.registerUnlimitedCompany(data)),
        registerLimitedGuaranteeCompany: (data) => dispatch(companyRegActions.registerLimitedGuaranteeCompany(data)),
    };
}


class PaystackViewScreen extends PureComponent {

    state = {
        userData: null,
        data: null
    }

    async componentDidMount() {
        const userData = await getUser();
        this.setState({ userData })
    }

    submit = async (resp) => {
        const {
            navigation,
            payForService
        } = this.props;

        const { userData } = this.state;

        let data = await this.getData(payForService);

        if (!data) {
            alert('No service selected');
            return;
        }

        const transactionData = {
            status: resp.data.event,
            reference: resp.data.transactionRef.reference,
            provider: 'paystack',
            amount: data.charge
        };
        data.transactionData = transactionData;
        data.user = userData;
        this.setState({ data: data });

        this.getFunction(payForService);

        navigation.goBack(null);
    }

    getData(service) {
        const {
            businessRegData,
            reservationData,
            companyRegData
        } = this.props;


        switch (service) {
            case 'nameReservation':
                return reservationData
            case 'businessRegistration':
                return businessRegData
            case 'individualRegistration':
                return businessRegData
            case 'limited':
                return companyRegData
            case 'unlimited':
                return companyRegData
            case 'limitedByGuarantee':
                return companyRegData
            default:
                return null
        }
    }

    getFunction(service) {
        const {
            reserveName,
            registerBusiness,
            registerIndividualBusiness,
            registerLimitedCompany,
            registerUnlimitedCompany,
            registerLimitedGuaranteeCompany
        } = this.props;
        const { data } = this.state;


        switch (service) {
            case 'nameReservation':
                return reserveName(data);
            case 'businessRegistration':
                return registerBusiness(data);
            case 'individualRegistration':
                return registerIndividualBusiness(data);
            case 'limited':
                return registerLimitedCompany(data);
            case 'unlimited':
                return registerLimitedCompany(data);
            case 'limitedByGuarantee':
                return registerLimitedCompany(data);
            default:
                return null
        }
    }


    render() {
        const { navigation, payForService, transactionRef, businessRegData } = this.props;
        const { userData } = this.state;
        const data = this.getData(payForService);

        const { charge } = data;

        return (
            <View style={{ flex: 1 }}>
                <PaystackWebView
                    buttonText="Pay Now"
                    showPayButton={false}
                    paystackKey={PAYSTACK_PUBLIC_KEY}
                    amount={charge}
                    billingEmail={userData && userData.email}
                    billingMobile={AEG_PHONE}
                    billingName={userData && userData.fullName}
                    refNumber={transactionRef}
                    ActivityIndicatorColor={Colors.PRIMARY}
                    onCancel={() => {
                        navigation.goBack();
                    }}
                    onSuccess={(resp) => {
                        this.submit(resp);
                    }}
                    autoStart={true}
                />
            </View>
        )
    }


}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaystackViewScreen);