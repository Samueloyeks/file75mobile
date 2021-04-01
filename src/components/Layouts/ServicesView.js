import React, { Component } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import styles from './styles';


// components 
import ServiceCard from '../atoms/ServiceCard';


const navTo = (item, navigation) => {
    switch (item.code) {
        case 'name_rsv':
            navigation.navigate('ReservationType');
            break;
        case 'business_reg':
            navigation.navigate('BusinessRegType');
            break;
        case 'company_reg':
            navigation.navigate('CompanyRegType');
            break;
        case 'licensing':
            navigation.navigate('ReservationType');
            break;
        default:
            navigation.navigate('ReservationType');;
    }
}

const ServicesView = ({ services, navigation }) => (
    <View style={styles.customBackground}>
        <FlatList
            data={services.sort((a, b) => a.id - b.id)}
            renderItem={({ item, index }) =>
                item.code ?
                    (
                        <ServiceCard
                            key={item.id}
                            service={item}
                            // onPress={() => navigation.navigate(item.navTo)} 
                            onPress={() => navTo(item, navigation)}
                        />
                    )
                    : null
            }
            keyExtractor={item => item._id}
            contentContainerStyle={{ paddingBottom: 100 }}
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


export default ServicesView;