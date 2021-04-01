import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk';
import {  persistStore,persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';



const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whiteist: ['user', 'tasks']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



const store = () => {
    return createStore(
        rootReducer,
        // persistedReducer,
        applyMiddleware(thunkMiddleware)
    )
};

export default store;