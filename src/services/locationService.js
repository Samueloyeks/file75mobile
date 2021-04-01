import api from './api';
import db from '../utils/db';
import { getToken } from '../helpers/auth';
import axios from 'axios';
import {
    LOCATION_API_TOKEN,
    LOCATION_URL,
    AEG_MAIL
} from 'react-native-dotenv';




const baseURL = LOCATION_URL;




export const locationService = {
    getCountries,
    getStates,
    getCities
};

async function getCountries() {

    let token = await getLocatoionAuthToken();

    const config = {
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json"
        }
    }
    const url = `${baseURL}/countries`;


    try {
        const resp = await axios.get(url, config);
        if (resp.data) {
            return resp.data;
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}

async function getStates(country) {

    let token = await getLocatoionAuthToken();

    const config = {
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json"
        }
    }
    const url = `${baseURL}/states/${country}`;


    try {
        const resp = await axios.get(url, config);
        if (resp.data) {
            for (let i = 0; i < resp.data.length; i++) {
                resp.data[i].name = resp.data[i].state_name
            }
            return resp.data;
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}
 
async function getCities(state) {

    let token = await getLocatoionAuthToken();

    const config = {
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json"
        }
    }
    const url = `${baseURL}/cities/${state}`;


    try {
        const resp = await axios.get(url, config);
        if (resp.data) {
            for (let i = 0; i < resp.data.length; i++) {
                resp.data[i].name = resp.data[i].city_name
            }
            return resp.data;
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}

async function getLocatoionAuthToken() {

    const config = {
        headers: {
            "Accept": "application/json",
            "api-token": LOCATION_API_TOKEN,
            "user-email": AEG_MAIL
        }
    }

    const url = `${LOCATION_URL}/getaccesstoken`;


    try {
        const resp = await axios.get(url, config);
        if (resp.data) {
            return resp.data.auth_token;
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}


