import React, { Component } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import styles from './styles';


// components 
import TaskCard from '../molecules/TaskCard';
import BusRegTaskCard from '../molecules/BusRegTaskCard';
import CompanyRegTaskCard from '../molecules/CompanyRegTaskCard';



const ApprovedTasksView = ({
    approvedTasks,
    navigation,
    viewResponse,
    props,
    refreshing,
    onRefresh,
    ListFooterComponent,
    onEndReachedThreshold,
    onEndReached
}) => (
        <View style={styles.customBackground}>
            <FlatList
                data={approvedTasks}
                renderItem={({ item, index }) => {
                    if (item.category.code === 'name_rsv') {
                        return (((item.status && item.status.code) == 'approved')
                            ?
                            <TaskCard
                                key={index}
                                status={item.status.code}
                                task={item}
                                onPress={() => viewResponse(item.responseFiles)}
                            />
                            :
                            null)
                    } else if (item.category.code === 'business_reg') {
                        return (((item.status && item.status.code) == 'approved')
                            ?
                            <BusRegTaskCard
                                key={index}
                                status={item.status.code}
                                task={item}
                                onPress={() => viewResponse(item.responseFiles)}
                            />
                            :
                            null)
                    } else if (item.category && item.category.code === 'company_reg') {
                        return (((item.status && item.status.code) === 'approved')
                            ?
                            <CompanyRegTaskCard
                                key={index}
                                status={item.status.code}
                                task={item}
                                onPress={() => viewResponse(item.responseFiles)}
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
        </View>)


export default ApprovedTasksView;