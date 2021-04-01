import React from 'react';
import Navigator from './navigations';
import { Provider } from 'react-redux';
import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Platform, StatusBar, StyleSheet, View, Text, NetInfo, YellowBox, Alert, AppRegistry } from 'react-native';
import NetworkUtils from './utils/NetworkUtils'
import SplashScreen from 'react-native-splash-screen';



const store = configureStore();
const persistedStore = persistStore(store);

// CheckConnectivity = async () => {
//     const isConnected = await NetworkUtils.isNetworkAvailable()
//     if (!isConnected) {
//         toast.show('No internet Connection')
//     }
// };

class App extends React.Component {

    componentDidMount() {
        SplashScreen.hide()
    }
 
    render() {
        return (
            <Provider store={store}>
                {/* <PersistGate loading={null} persistor={persistedStore}> */}
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" backgroundColor="#ffff" />}
                    <Navigator />
                </View>
                {/* </PersistGate> */}
            </Provider>
        )
    }
}

// const App = () =>



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default App;