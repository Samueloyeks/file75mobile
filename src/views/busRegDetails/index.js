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


class BusRegDetailsScreen extends PureComponent {

    state = {
        busReg: null
    }


    async componentDidMount() {
        const { markAsViewed, navigation, pendingTasks } = this.props;
        let busReg = navigation.getParam('busReg');
        let index = navigation.getParam('index');

        if (!busReg.viewed) {
            markAsViewed(busReg._id, 'businessReg')
        }
    }



    render() {
        const { navigation } = this.props;

        let busReg = navigation.getParam('busReg');

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.detailsContent}
                >
                    <Text style={styles.titleText}>{busReg.category.category}</Text>
                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>First Prefereed Name:  </Text>
                        <Text style={[styles.capitalize]}>{busReg.businessName1}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Second Prefereed Name:  </Text>
                        <Text style={[styles.capitalize]}>{busReg.businessName2}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Type:  </Text>
                        <Text style={[styles.capitalize]}>{formatCamelCase(busReg.type)}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Business Email:  </Text>
                        <Text style={[styles.capitalize]}>{busReg.email}</Text>
                    </View>

                    {
                        busReg.type === 'partnership' ?
                            <View style={[styles.textInline, Custom.mv10]}>
                                <Text style={Custom.boldText}>Number of Partners:  </Text>
                                <Text>{
                                    parseInt(busReg.individualPartners.length) +
                                    parseInt(busReg.corporatePartners.length) +
                                    parseInt(busReg.minorPartners.length)
                                }</Text>
                            </View> :
                            null
                    }

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Status:  </Text>
                        <Text style={{
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            color: (busReg.status.code == 'pending') ?
                                'gray' :
                                busReg.status.code == 'approved' ?
                                    'green' :
                                    'red'
                        }}>{busReg.status.code}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Submitted:  </Text>
                        <DateText
                            customStyle={{ fontSize: 13 }}
                            dateString={busReg.submitted} />
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
)(BusRegDetailsScreen);
