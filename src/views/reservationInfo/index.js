import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';




// components 
import CustomFooter from '../../components/atoms/CustomFooter';
import CustomButton from '../../components/atoms/CustomButton';


// svg 
import LargeArrowRight from '../../assets/svg/LargeArrowRight.svg'
import LargeArrowLeft from '../../assets/svg/LargeArrowLeft.svg'



function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}





class ReservationInfoScreen extends PureComponent {


    render() {
        const { navigation, loading } = this.props;

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>
                    <LargeArrowRight />
                    <View style={[styles.textCenter, Custom.mv30]}>
                        <Text style={[styles.boldText, styles.largeText]}>
                            Step-by-Step process to  <Text style={styles.primary}>reserve</Text> name
                        </Text>
                    </View>

                    <View style={styles.stepsContainer}>
                        <View style={[styles.textInline, styles.steps]}>
                            <Text style={styles.boldText}>1. </Text>
                            <Text>Propose enterprise names</Text>
                        </View>

                        <View style={[styles.textInline, styles.steps]}>
                            <Text style={styles.boldText}>2. </Text>
                            <Text>Submit a valid phone number</Text>
                        </View>

                        <View style={[styles.textInline, styles.steps]}>
                            <Text><Text style={styles.boldText}>3. </Text>
                            Pay a filing fee of One thousand naira only
                                <Text style={styles.boldText}>(₦5000)</Text>
                            </Text>
                        </View>

                        <View style={[styles.textInline, styles.steps, Custom.mb30]}>
                            <Text style={styles.boldText}>4. </Text>
                            <Text>Get a response within 24hrs - 48hrs</Text>
                        </View>

                        <View style={[styles.textInline, styles.steps]}>
                            <Text><Text style={styles.boldDangerText}>NB: </Text>
                            Free regulatory advisory service for every name you reserve with Us.</Text>
                        </View>

                        <View style={styles.bottomArrow}>
                            <LargeArrowLeft />
                        </View>
                    </View>
                    <CustomButton
                        title='Back'
                        buttonStyle={styles.buttonStyle}
                        customStyle={styles.secondaryButtonStyle}
                        buttonColor={Colors.WHITE}
                        onPress={() => navigation.goBack(null)}
                    />
                </ScrollView>
                <CustomFooter />
            </View>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReservationInfoScreen);
