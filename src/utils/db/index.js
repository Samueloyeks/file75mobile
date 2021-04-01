import { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';



class Storage extends Component {

    constructor(props) {
        super(props)
        this.set = this.set.bind(this)
        this.get = this.get.bind(this)

    }



    async set(targetName, data) {

        try {
            await AsyncStorage.setItem(targetName, JSON.stringify(data));
        } catch (ex) {
            console.log('AsyncStorage error: ' + ex.message);
        }

        return;
    }

    async get(targetName) {
        let data;
        try {
            data = await AsyncStorage.getItem(targetName);
        } catch (ex) {
            console.log('AsyncStorage error: ' + ex.message);
        }

        return data;
    }

    async delete(targetName) {

        try {
            await AsyncStorage.removeItem(targetName)
        } catch (ex) {
            console.log('AsyncStorage error: ' + ex.message);
        }
        return;
    }

    render() {
        return null
    }
}

const db = new Storage()
export default db