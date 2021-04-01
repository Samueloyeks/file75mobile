import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { taskActions, serviceActions } from '../../store/actions';
import { getUser } from '../../helpers/auth';



// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import ApprovedTasksView from '../../components/Layouts/ApprovedTasksView';
import CustomFooter from '../../components/atoms/CustomFooter';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import CustomButton from '../../components/atoms/CustomButton';


// svg
import Dropdown from '../../assets/svg/Dropdown.svg';
import { taskConstants } from '../../store/constants/taskConstants';


function mapStateToProps(state) {
    const {
        loading,
        loadingApprovedTasks,
        tasks,
        approvedTasks,
        params,
        extraParams,
        loadingMore,
        loadingMoreApprovedTasks,
        refreshing,
        refreshingApprovedTasks
    } = state.tasks;
    const { services } = state.services;

    return {
        loading,
        tasks,
        services,
        params,
        loadingMore,
        refreshing,
        loadingApprovedTasks,
        approvedTasks,
        loadingMoreApprovedTasks,
        refreshingApprovedTasks,
        extraParams
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getTasks: (params) => dispatch(taskActions.getTasks(params, "approved")),
        getAllTasks: (params) => dispatch(taskActions.getAllTasks(params, "approved")),
        silentlyGetTasks: (params) => dispatch(taskActions.silentlyGetTasks(params, "approved")),
        loadMoreTasks: (params) => dispatch(taskActions.loadMoreTasks(params, "approved")),
        getServices: () => dispatch(serviceActions.getServices()),
        saveFilePaths: (data) => dispatch(taskActions.saveFilePaths(data))
    };
}

class ApprovedTasksScreen extends Component {

    state = {
        sortedby: null
    }

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    searchFilterFunction = async text => {
        const { getTasks, params } = this.props;
        params.search = text
        params.byStatusCode = 'approved';

        await getTasks(params);
    };

    filterTasks = async service => {
        var { getTasks, params, extraParams, silentlyGetTasks } = this.props;
        this._menu.hide();

        if (service.category == 'All') {
            params.byCategorycode = null;
            params.byStatusCode = 'approved';
            this.setState({ sortedby: null });
        } else {
            params.byCategorycode = service.code;
            params.byStatusCode = 'approved';
            this.setState({ sortedby: service.category })
        }

        params.page = 1;
        extraParams.approvedTasksPage = 1

        silentlyGetTasks(params);
    }

    viewResponse = async data => {
        const { navigation, saveFilePaths } = this.props;

        saveFilePaths(data);
        navigation.navigate('ViewPDF');
    }

    onRefresh = () => {
        var { params, extraParams, silentlyGetTasks } = this.props;
        params.page = 1;
        extraParams.approvedTasksPage = 1
        params.byStatusCode = 'approved';

        silentlyGetTasks(params);
    }

    renderFooter = () => {
        const { loadingMoreApprovedTasks } = this.props;
        if (!loadingMoreApprovedTasks) return null;
        return (
            <ActivityIndicator
                style={{ color: '#000' }}
            />
        );
    };

    handleLoadMore = () => {
        var {
            params,
            extraParams,
            loadMoreTasks
        } = this.props;


        let page = extraParams.approvedTasksPage;
        extraParams.approvedTasksPage = page + 1;

        params.page = extraParams.approvedTasksPage
        params.byStatusCode = 'approved';

        loadMoreTasks(params);
    };

    async componentDidMount() {
        const { getTasks, getAllTasks, params, getServices, extraParams } = this.props;
        const userData = await getUser();
        params.byUserId = userData.id;
        params.byStatusCode = 'approved';
        params.page = 1;
        extraParams.pendingTasksPage = 1;
        extraParams.approvedTasksPage = 1;
        extraParams.declinedTasksPage = 1;

        await getAllTasks(params);
        await getServices();
    }


    render() {
        const { navigation, loading, loadingApprovedTasks, tasks, approvedTasks, services, params, refreshing, refreshingApprovedTasks, loadingMore, loadingMoreApprovedTasks } = this.props;
        const { sortedby } = this.state;

        if (Array.isArray(approvedTasks)) [
            approvedTasks.sort(function (a, b) {
                return new Date(b.created_at) - new Date(a.created_at);
            })
        ]

        return (
            <View style={styles.customBackground}>
                <View style={styles.content}>
                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                        <View style={{ flex: 0.7 }}>
                            <CustomSearchInput
                                placeholder='Search for a task'
                                value={params.search}
                                onChangeText={text => this.searchFilterFunction(text)}
                            />
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Menu
                                ref={this.setMenuRef}
                                button={<Text onPress={this.showMenu}>Sort by <Dropdown /></Text>}
                            >{
                                    services.map((service) =>
                                        <MenuItem key={service._id} onPress={() => this.filterTasks(service)}>
                                            <Text style={Custom.capitalize}>{service.category}</Text>
                                        </MenuItem>
                                    )
                                }
                            </Menu>
                        </View>
                    </View>
                    {sortedby ? <Text>Category: {sortedby}</Text> : null}
                    {/* {
                        (tasks.length === 0) ?
                            <Text>No tasks to display</Text>
                            : */}
                    <ApprovedTasksView
                        approvedTasks={approvedTasks}
                        navigation={navigation}
                        viewResponse={this.viewResponse}
                        props={this.props}
                        refreshing={refreshingApprovedTasks}
                        onRefresh={this.onRefresh.bind(this)}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0.6}
                        onEndReached={(!loadingMoreApprovedTasks) ? this.handleLoadMore.bind(this) : null}
                    />
                    {/* } */}
                </View>
                <CustomButton
                    title='Back'
                    buttonStyle={styles.buttonStyle}
                    customStyle={styles.secondaryButtonStyle}
                    buttonColor={Colors.WHITE}
                    onPress={() => navigation.navigate('Home')}
                />
                {
                    loadingApprovedTasks
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
)(ApprovedTasksScreen);