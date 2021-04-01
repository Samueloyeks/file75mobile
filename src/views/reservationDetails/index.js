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
    const { pendingTasks } = state.tasks;

    return {
        pendingTasks
    };
}

function mapDispatchToProps(dispatch) {

    return {
        markAsViewed: (id, service) => dispatch(taskActions.markAsViewed(id, service))
    };
}


class ReservationDetailsScreen extends PureComponent {

    state = {
        reservation: null
    }

    async componentDidMount() {
        const { markAsViewed, navigation, pendingTasks } = this.props;
        let reservation = navigation.getParam('reservation');
        let index = navigation.getParam('index');

        if (!reservation.viewed) {
            markAsViewed(reservation._id, 'reservation')
        }
    }



    render() {
        const { navigation } = this.props;

        let reservation = navigation.getParam('reservation');

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.detailsContent}
                >
                    <Text style={styles.titleText}>{reservation.category.category}</Text>
                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>First Prefereed Name:  </Text>
                        <Text style={[styles.capitalize]}>{reservation.companyName1}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Second Prefereed Name:  </Text>
                        <Text style={[styles.capitalize]}>{reservation.companyName2}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Type:  </Text>
                        <Text style={[styles.capitalize]}>{formatCamelCase(reservation.type)}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Status:  </Text>
                        <Text style={{
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            color: (reservation.status.code == 'pending') ?
                                'gray' :
                                reservation.status.code == 'approved' ?
                                    'green' :
                                    'red'
                        }}>{reservation.status.code}</Text>
                    </View>

                    <View style={[styles.textInline, Custom.mv10]}>
                        <Text style={Custom.boldText}>Submitted:  </Text>
                        <DateText 
                        customStyle={{fontSize:13}}
                         dateString={reservation.submitted} />
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
)(ReservationDetailsScreen);
