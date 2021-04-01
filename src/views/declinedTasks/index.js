import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { taskActions, serviceActions } from '../../store/actions';
import { getUser } from '../../helpers/auth';



// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import DeclinedTasksView from '../../components/Layouts/DeclinedTasksView';
import CustomFooter from '../../components/atoms/CustomFooter';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import CustomButton from '../../components/atoms/CustomButton';


// svg
import Dropdown from '../../assets/svg/Dropdown.svg';


function mapStateToProps(state) {
    const {
        loading,
        loadingDeclinedTasks,
        tasks,
        declinedTasks,
        params,
        extraParams,
        loadingMore,
        loadingMoreDeclinedTasks,
        refreshing,
        refreshingDeclinedTasks
    } = state.tasks;
    const { services } = state.services;

    return {
        loading,
        tasks,
        services,
        params,
        loadingMore,
        refreshing,
        loadingDeclinedTasks,
        declinedTasks,
        extraParams,
        loadingMoreDeclinedTasks,
        refreshingDeclinedTasks
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getTasks: (params) => dispatch(taskActions.getTasks(params, "declined")),
        silentlyGetTasks: (params) => dispatch(taskActions.silentlyGetTasks(params, "declined")),
        loadMoreTasks: (params) => dispatch(taskActions.loadMoreTasks(params, "declined")),
        getServices: () => dispatch(serviceActions.getServices())
    };
}

class DeclinedTasksScreen extends Component {

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
        params.byStatusCode = 'rejected';

        await getTasks(params);
    };

    filterTasks = async service => {
        var { params, extraParams, silentlyGetTasks } = this.props;
        this._menu.hide();

        if (service.category == 'All') {
            params.byCategorycode = null;
            params.byStatusCode = 'rejected';
            this.setState({ sortedby: null });
        } else {
            params.byCategorycode = service.code;
            params.byStatusCode = 'rejected';
            this.setState({ sortedby: service.category })
        }

        params.page = 1;
        extraParams.declinedTasksPage = 1;

        silentlyGetTasks(params);
    }

    onRefresh = () => {
        var { params, extraParams, silentlyGetTasks } = this.props;
        params.page = 1;
        extraParams.declinedTasksPage = 1;
        params.byStatusCode = 'rejected';

        silentlyGetTasks(params);
    }

    renderFooter = () => {
        const { loadingMoreDeclinedTasks } = this.props;
        if (!loadingMoreDeclinedTasks) return null;
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


        let page = extraParams.declinedTasksPage;
        extraParams.declinedTasksPage = page + 1;

        params.page = extraParams.declinedTasksPage
        params.byStatusCode = 'rejected';

        loadMoreTasks(params);
    };

    async componentDidMount() {
        // const { getTasks, params, getServices } = this.props;
        // const userData = await getUser();
        // params.byUserId = userData.id;

        // await getTasks(params);
        // await getServices();
    }


    render() {
        const { navigation, loading, loadingDeclinedTasks, tasks, declinedTasks, services, params, refreshing, refreshingDeclinedTasks, loadingMore, loadingMoreDeclinedTasks } = this.props;
        const { sortedby } = this.state;

        if (Array.isArray(declinedTasks)) {
            declinedTasks.sort(function (a, b) {
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
                    <DeclinedTasksView
                        declinedTasks={declinedTasks}
                        navigation={navigation}
                        props={this.props}
                        refreshing={refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0.6}
                        onEndReached={(!loadingMoreDeclinedTasks) ? this.handleLoadMore.bind(this) : null}
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
                    loadingDeclinedTasks
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
)(DeclinedTasksScreen);