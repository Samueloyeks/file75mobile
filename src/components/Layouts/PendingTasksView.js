import React, { Component } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import styles from './styles';


// components 
import TaskCard from '../molecules/TaskCard';
import BusRegTaskCard from '../molecules/BusRegTaskCard';
import CompanyRegTaskCard from '../molecules/CompanyRegTaskCard';




const PendingTasksView = ({
    pendingTasks,
    navigation,
    props,
    refreshing,
    onRefresh,
    ListFooterComponent,
    onEndReachedThreshold,
    onEndReached
}) => {

    return (
        <View style={styles.customBackground}>
            <FlatList
                data={pendingTasks}
                renderItem={({ item, index }) => {
                    if (item.category && item.category.code === 'name_rsv') {
                        return (((item.status && item.status.code) === 'pending')
                            ?
                            <TaskCard
                                key={index}
                                status={item.status.code}
                                task={item}
                                onPress={() => { navigation.navigate('ReservationDetails', { reservation: item, index: index }) }}
                            />
                            :
                            null)
                    } else if (item.category && item.category.code === 'business_reg') {
                        return (((item.status && item.status.code) === 'pending')
                            ?
                            <BusRegTaskCard
                                key={index}
                                status={item.status.code}
                                task={item}
                                onPress={() => { navigation.navigate('BusRegDetails', { busReg: item, index: index }) }}
                            />
                            :
                            null)
                    } else if (item.category && item.category.code === 'company_reg') {
                        return (((item.status && item.status.code) === 'pending')
                            ?
                            <CompanyRegTaskCard
                                key={index}
                                status={item.status.code}
                                task={item}
                                onPress={() => { navigation.navigate('CompanyRegDetails', { companyReg: item, index: index }) }}
                            />
                            :
                            null)
                    }
                }

                }
                keyExtractor={item => item._id}
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={false}
                extraData={props}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListFooterComponent={ListFooterComponent}
                onEndReachedThreshold={onEndReachedThreshold}
                onEndReached={onEndReached}
                scrollEnabled={true}
            />
        </View>
    )
}


export default PendingTasksView;