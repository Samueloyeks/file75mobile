import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Typography } from '../../styles';
import { taskActions } from '../../store/actions';
import { Colors } from '../../styles';
import { formatCamelCase } from '../../helpers/encode'


// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import ServicesView from '../../components/Layouts/ServicesView';
import CustomFooter from '../../components/atoms/CustomFooter';
import CustomButton from '../../components/atoms/CustomButton';
import DateText from '../../components/atoms/DateText';


function mapStateToProps(state) {

    return {

    };
}

function mapDispatchToProps(dispatch) {

    return {
        markAsViewed: (id, service) => dispatch(taskActions.markAsViewed(id, service))
    };
}


class CompanyRegDetailsScreen extends PureComponent {

    state = {
        reservation: null
    }

    async componentDidMount() {
        const { navigation,markAsViewed } = this.props;

        let companyReg = navigation.getParam('companyReg');
        let index = navigation.getParam('index');

        if (!companyReg.viewed) {
            markAsViewed(companyReg._id, 'companyReg')
        }
    }



    render() {
        const { navigation } = this.props;

        let companyReg = navigation.getParam('companyReg');

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.detailsContent}
                >
                    <Text style={styles.titleText}>{companyReg.category.category}</Text>
                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>First Prefereed Name:  </Text>
                        <Text style={[styles.capitalize]}>{companyReg.companyName1}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Second Prefereed Name:  </Text>
                        <Text style={[styles.capitalize]}>{companyReg.companyName2}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Type:  </Text>
                        <Text style={[styles.capitalize]}>{formatCamelCase(companyReg.type)}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Company Email:  </Text>
                        <Text style={[styles.capitalize]}>{companyReg.email}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Company Phone:  </Text>
                        <Text style={[styles.capitalize]}>{companyReg.phone}</Text>
                    </View>


                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Number of Partners:  </Text>
                        <Text>{
                            parseInt(companyReg.individualShareholders.length) +
                            parseInt(companyReg.corporateShareholders.length) +
                            parseInt(companyReg.minorShareholders.length)
                        }</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Number of Directors:  </Text>
                        <Text>{
                            parseInt(companyReg.directors.length) 
                        }</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Total Shares:  </Text>
                        <Text style={[styles.capitalize]}>₦{companyReg.shareDetails.totalShareCapital}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Status:  </Text>
                        <Text style={{
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            color: (companyReg.status.code == 'pending') ?
                                'gray' :
                                companyReg.status.code == 'approved' ?
                                    'green' :
                                    'red'
                        }}>{companyReg.status.code}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Submitted:  </Text>
                        <DateText
                            customStyle={{ fontSize: 13 }}
                            dateString={companyReg.submitted} />
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
)(CompanyRegDetailsScreen);
