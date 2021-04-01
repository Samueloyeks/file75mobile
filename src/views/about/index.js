import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';




// components 
import CustomFooter from '../../components/atoms/CustomFooter';
import CustomInput from '../../components/atoms/CustomInput';
import CustomButton from '../../components/atoms/CustomButton';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import ContactBlock from '../../components/atoms/ContactBlock';
import CustomSelect from '../../components/atoms/CustomSelect';


// svg 
import Illustration6 from '../../assets/svg/Illustration6.svg';


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}





class AboutScreen extends PureComponent {


    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>

                    <View style={[styles.textCenter, Custom.bgPrimary]}>
                        <Illustration6 />
                    </View>

                    <View style={[Custom.mt20]}>
                        <Text>
                            File is Silicon Edge’s flagship product. Silicon Edge is on a mission to accelerate Nigeria's economy through business registration support to new entrants and entrepreneurs looking to legalise their business.{"\n"}{"\n"} We also provide you with the advice you need to ensure that your new company complies with its statutory obligations with our regulatory advisory feature.{"\n"}{"\n"}

                            File is advancing business growth providing online company registration service for all stakeholders of the economy in Nigeria.{"\n"}{"\n"} We are building critical infrastructure to consolidate legal businesses in Nigeria – from limited liability companies to sole proprietorship to public liability companies.
                        </Text>
                    </View>

                </ScrollView>
                <CustomButton
                    title='Back'
                    buttonStyle={styles.buttonStyle}
                    customStyle={styles.secondaryButtonStyle}
                    buttonColor={Colors.WHITE}
                    onPress={() => navigation.goBack(null)}
                />
                <CustomFooter />
            </View>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutScreen);
