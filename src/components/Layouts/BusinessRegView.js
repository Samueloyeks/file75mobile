import React, { Component } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { businessRegActions } from '../../store/actions';



// components 
import BusinessServiceCard from '../atoms/BusinessServiceCard';

function mapStateToProps(state) {
    const {
        reservationType
    } = state.reserve;

    return {
        reservationType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateType: (type) => dispatch(businessRegActions.updateType(type))
    };
}

const navTo = (item, navigation, updateType) => {
    navigation.navigate(item.navTo);
    updateType(item.type)
}

const BusinessRegView = ({ services, navigation, updateType }) => (
    <View style={styles.customBackground}>
        <FlatList
            data={services}
            renderItem={({ item, index }) =>
                <BusinessServiceCard 
                    key={index}
                    service={item}
                    // onPress={() => navigation.navigate(item.navTo)} 
                    onPress={() => navTo(item, navigation, updateType)}
                />}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 550 }}
            showsVerticalScrollIndicator={false}
        // extraData={this.state}
        // refreshControl={
        //     <RefreshControl
        //         refreshing={this.state.isRefreshing}
        //         onRefresh={this.onRefresh.bind(this)}
        //     />
        // }
        // ListFooterComponent={this.renderFooter.bind(this)}
        // onEndReachedThreshold={0.6}
        // onEndReached={(!this.state.loadingMore) ? this.handleLoadMore.bind(this) : null}
        // scrollEnabled={true}
        />
    </View>)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessRegView);