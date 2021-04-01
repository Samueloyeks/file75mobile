import { Component } from "react";
import { Linking } from 'react-native';
import axios from 'axios';
import {
    API_URL
} from 'react-native-dotenv';
import db from '../../utils/db';


var authHeader = '';

const baseURL = API_URL
// const defaultHeader = {
//     // 'Authorization': authHeader,
//     "Content-Type": "application/x-www-form-urlencoded",
//     'Accept': 'application/json'
// }
const defaultHeader = {
    'Authorization': authHeader,
    "Content-Type": "application/json",
    'Accept': '*/*'
}


class API extends Component {

    constructor(props) {
        super(props)
        this.post = this.post.bind(this)
        this.get = this.get.bind(this)
        this.getToken = this.getToken.bind(this)
    }


    async post(targetFunction, data) {
        await this.getToken();

        const defaultHeader = {
            'Authorization': authHeader,
            "Content-Type": "application/json",
            'Accept': '*/*'
        }
        const url = baseURL + targetFunction;

        try {
            return await axios.post(url, data, {
                headers: defaultHeader
            }).catch(function (error) {
                if (error.response && error.response.status=='500') {
                    return 'user'
                } 
            });
        } catch (ex) {
            console.log('ERR=>' + ex)
        }
    }


    async get(targetFunction) {
        await this.getToken();

        const defaultHeader = {
            'Authorization': authHeader,
            "Content-Type": "application/json",
            'Accept': '*/*'
        }
        const url = baseURL + targetFunction;

        try {
            return await axios.get(url, {
                headers: defaultHeader
            })
        } catch (ex) {
            console.log(ex)
        }
    }


    async getToken() {
        try {
            const userToken = await db.get('userToken');
            authHeader = `Bearer ${userToken}`;
        } catch (ex) {
            console.log('Error getting token: ' + ex)
        }
        return;
    }

    render() {
        return null
    }
}

const api = new API();
export default api;