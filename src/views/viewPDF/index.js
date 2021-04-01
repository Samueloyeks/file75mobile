import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { taskActions, serviceActions } from '../../store/actions';
import { getUser } from '../../helpers/auth';
import PDFView from 'react-native-view-pdf';





// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import PendingTasksView from '../../components/Layouts/PendingTasksView';
import CustomFooter from '../../components/atoms/CustomFooter';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import CustomButton from '../../components/atoms/CustomButton';


// svg
import ArrowRight from '../../assets/svg/ArrowRight.svg';


function mapStateToProps(state) {
    const {
        // gettingFiles,
        files,
        filePaths
    } = state.tasks;

    return {
        // gettingFiles,
        files,
        filePaths
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getTaskFiles: (params) => dispatch(taskActions.getTaskFiles(params)),
    };
}

class ViewPDFScreen extends Component {

    state = {
        gettingFiles: true
    }



    render() {
        const { files, filePaths,navigation } = this.props;
        const { gettingFiles } = this.state
        const resourceType = 'url'

        return (
            <View style={styles.customBackground}>
                <View style={styles.content}>

                    {/* <PDFView
                        fadeInDuration={250.0}
                        style={{ flex: 1 }}
                        resource={filePaths[0]}
                        resourceType={resourceType}
                        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                        onError={(error) => console.log('Cannot render PDF', error)}
                    /> */}

                    {filePaths.map((path, index) =>
                        <PDFView
                            key={index}
                            fadeInDuration={250.0}
                            style={{ flex: 1 }}
                            resource={path}
                            resourceType={resourceType}
                            onLoad={() => this.setState({ gettingFiles: false })}
                        />
                    )}

                </View>
                {/* <CustomButton
                    title='Register your business'
                    buttonStyle={styles.buttonStyle}
                    customStyle={styles.primaryButtonStyle}
                    buttonColor={Colors.SECONDARY}
                /> */}

                <CustomButton
                    title='Back'
                    buttonStyle={styles.buttonStyle}
                    customStyle={styles.secondaryButtonStyle}
                    buttonColor={Colors.WHITE}
                    onPress={() => navigation.goBack(null)}
                />
                {
                    gettingFiles
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
)(ViewPDFScreen);