
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import * as Yup from 'yup';
import { companyRegActions } from '../../store/actions';
import { Input, Tooltip } from 'react-native-elements';
import { formatCamelCase, capitalizeWords } from '../../helpers/encode'




// components 
import CustomFooter from '../../components/atoms/CustomFooter';
import CustomButton from '../../components/atoms/CustomButton';
import { CustomConfirmDialog } from '../../components/atoms/CustomDialogs';


// svg 
import TinyArrows from '../../assets/svg/TinyArrows.svg'
import Illustration19 from '../../assets/svg/Illustration19.svg'
import Illustration20 from '../../assets/svg/Illustration20.svg'
import Illustration21 from '../../assets/svg/Illustration21.svg'



function mapStateToProps(state) {
    const {
        companyRegData,
        companyRegType
    } = state.companyReg;

    return {
        companyRegData,
        companyRegType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        save: (data) => dispatch(companyRegActions.saveData(data))
    };
}





class LimitedCompanyRegScreen5 extends PureComponent {

    state = {
        shareCapitalUnits: '',
        pricePerShare: '',
        valueOfShares: '',
        dialogVisible: false
    }

    onTouchOutside = () => {
        this.setState({ dialogVisible: false })
    }

    positiveTouched = () => {
        const { navigation, companyRegData } = this.props;
        this.setState({ dialogVisible: false })
        companyRegData.adoptCACArticle = false;
        navigation.navigate('LimitedCompanyReg6')
    }

    negativeTouched = () => {
        this.setState({ dialogVisible: false })
    }

    navigateToNextPage = () => {
        const { navigation, companyRegData } = this.props;
        companyRegData.adoptCACArticle = true;
        navigation.navigate('viewArticle')
    }


    render() {
        const {
            dialogVisible
        } = this.state;

        const { navigation, companyRegType } = this.props;

        let breadcrumbText = companyRegType

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>
                    <Text style={[Custom.breadcrumbText,styles.boldText]}>
                        {"Company Registration > " + formatCamelCase(capitalizeWords(breadcrumbText))}
                    </Text>
                    <View style={[Custom.mv30]}>
                        <Text style={[styles.boldText]}>
                            Company <TinyArrows />
                        </Text>
                        <Text style={[styles.boldText]}>
                            Registration Made <Text style={[styles.primary]}>Easy</Text>
                        </Text>
                    </View>
                    <View style={[styles.textInline, Custom.mv20, styles.textCenter,]}>
                        <Illustration19 />
                    </View>

                    <Text style={[styles.boldText, styles.textCenter, Custom.mb20]}>Articles of Association</Text>


                    <View style={[Custom.row]}>
                        <View style={styles.halfColumn}>
                            <TouchableOpacity
                                onPress={() => this.setState({ dialogVisible: true })}
                                style={styles.addArticleButton}>
                                <Illustration20 style={[Custom.mb10]} />
                                <Text>Draft Articles</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.halfColumn}>
                            <TouchableOpacity
                                onPress={this.navigateToNextPage}
                                style={styles.adoptArticleButton}>
                                <Illustration21 style={[Custom.mb10]} />
                                <Text style={{ color: Colors.PRIMARY }}>Adopt CAC Articles</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <CustomButton
                        title='Next'
                        buttonStyle={styles.buttonStyle}
                        customStyle={styles.primaryButtonStyle}
                        
                        // disabled={!isValid} 
                        buttonColor={Colors.SECONDARY}
                        loading={loading}
                    /> */}
                    <CustomButton
                        title='Back'
                        buttonStyle={styles.buttonStyle}
                        customStyle={styles.secondaryButtonStyle}
                        buttonColor={Colors.WHITE}
                        onPress={() => navigation.goBack(null)}
                    />
                </ScrollView>
                <CustomConfirmDialog
                    visible={dialogVisible}
                    onTouchOutside={() => this.onTouchOutside}
                    positiveTouched={this.positiveTouched}
                    negativeTouched={this.negativeTouched}
                    content={
                        <Text>Please contact our support to help you draft your article.{"\n"}{"\n"}
                        Your registration will NOT be processed until your article is drafted
                        </Text>
                    }
                />
                <CustomFooter />
            </View>
        );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LimitedCompanyRegScreen5);

