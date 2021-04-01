import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { taskActions, serviceActions } from '../../store/actions';
import { getUser } from '../../helpers/auth';



// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import PendingTasksView from '../../components/Layouts/PendingTasksView';
import CustomFooter from '../../components/atoms/CustomFooter';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import CustomButton from '../../components/atoms/CustomButton';


// svg
import Dropdown from '../../assets/svg/Dropdown.svg';


function mapStateToProps(state) {
    const {
        loading,
        loadingPendingTasks,
        tasks,
        pendingTasks,
        params,
        extraParams,
        loadingMore,
        loadingMorePendingTasks,
        refreshing,
        refreshingPendingTasks
    } = state.tasks;
    const { services } = state.services;

    return {
        loading,
        loadingPendingTasks,
        tasks,
        pendingTasks,
        services,
        params,
        extraParams,
        loadingMore,
        loadingMorePendingTasks,
        refreshing,
        refreshingPendingTasks
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getTasks: (params) => dispatch(taskActions.getTasks(params, "pending")),
        silentlyGetTasks: (params) => dispatch(taskActions.silentlyGetTasks(params, "pending")),
        loadMoreTasks: (params) => dispatch(taskActions.loadMoreTasks(params, "pending")),
        getServices: () => dispatch(serviceActions.getServices())
    };
}

class PendingTasksScreen extends Component {

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
        const { getTasks, params, silentlyGetTasks, extraParams } = this.props;
        params.search = text
        params.byStatusCode = 'pending'
        params.page = 1;
        extraParams.pendingTasksPage = 1

        await getTasks(params);
    };

    filterTasks = async service => {
        var { getTasks, params, extraParams, silentlyGetTasks } = this.props;
        this._menu.hide();

        if (service.category == 'All') {
            params.byCategorycode = null;
            params.byStatusCode = 'pending'
            this.setState({ sortedby: null });
        } else {
            params.byCategorycode = service.code;
            params.byStatusCode = 'pending'
            this.setState({ sortedby: service.category })
        }

        params.page = 1;
        extraParams.pendingTasksPage = 1

        silentlyGetTasks(params);
    }

    onRefresh = () => {
        var { params, extraParams, silentlyGetTasks } = this.props;
        params.page = 1;
        extraParams.pendingTasksPage = 1
        params.byStatusCode = 'pending';

        silentlyGetTasks(params);
    }

    renderFooter = () => {
        const { loadingMorePendingTasks } = this.props;
        if (!loadingMorePendingTasks) return null;
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

        let page = extraParams.pendingTasksPage
        extraParams.pendingTasksPage = page + 1;

        params.page = extraParams.pendingTasksPage
        params.byStatusCode = 'pending';

        loadMoreTasks(params);
    };

    async componentDidMount() {
        // const { getTasks, params, getServices } = this.props;
        // const userData = await getUser();
        // params.byUserId = userData.id;
        // params.byStatusCode = 'pending';

        // await getTasks(params);
        // await getServices();
    }


    render() {
        const { navigation, loading, loadingPendingTasks, tasks, pendingTasks, services, params, refreshing, refreshingPendingTasks, loadingMore, loadingMorePendingTasks } = this.props;
        const { sortedby } = this.state;

        if (Array.isArray(pendingTasks)) {
            pendingTasks.sort(function (a, b) {
                return new Date(b.created_at) - new Date(a.created_at);
            });
        }

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
                    <PendingTasksView
                        pendingTasks={pendingTasks}
                        navigation={navigation}
                        props={this.props}
                        refreshing={refreshingPendingTasks}
                        onRefresh={this.onRefresh.bind(this)}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0.6}
                        onEndReached={(!loadingMorePendingTasks) ? this.handleLoadMore.bind(this) : null}
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
                    loadingPendingTasks
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
)(PendingTasksScreen);