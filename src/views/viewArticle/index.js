import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { taskActions, serviceActions, companyRegActions } from '../../store/actions';
import { getUser } from '../../helpers/auth';
import PDFView from 'react-native-view-pdf';





// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import PendingTasksView from '../../components/Layouts/PendingTasksView';
import CustomFooter from '../../components/atoms/CustomFooter';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import CustomButton from '../../components/atoms/CustomButton';



function mapStateToProps(state) {
    const {
        gettingArticles,
        articles
    } = state.companyReg;

    return {
        gettingArticles,
        articles
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getArticles: () => dispatch(companyRegActions.getArticles()),
    };
}

class ViewArticleScreen extends Component {


    async componentDidMount() {
        const { getArticles } = this.props;

        await getArticles()
    }

    render() {
        const { gettingArticles, articles, navigation } = this.props;
        const resourceType = 'url'

        return (
            <View style={styles.customBackground}>
                <View style={styles.content}>

                    <PDFView
                        fadeInDuration={250.0}
                        style={{ flex: 1 }}
                        resource={articles[0]}
                        resourceType={resourceType}
                        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                        onError={(error) => console.log('Cannot render PDF', error)}
                    />

                </View>
                <CustomButton
                    title='Proceed'
                    buttonStyle={styles.buttonStyle}
                    customStyle={styles.primaryButtonStyle}
                    onPress={() => navigation.navigate('LimitedCompanyReg6')}
                    buttonColor={Colors.SECONDARY}
                />

                <CustomButton
                    title='Back'
                    buttonStyle={styles.buttonStyle}
                    customStyle={styles.secondaryButtonStyle}
                    buttonColor={Colors.WHITE}
                    onPress={() => navigation.goBack(null)}
                />

                {
                    gettingArticles
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
)(ViewArticleScreen);