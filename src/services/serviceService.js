import api from './api';
import db from '../utils/db';
import { getToken } from '../helpers/auth';
import axios from 'axios';
import {
    API_URL
} from 'react-native-dotenv';
import { generateId } from '../helpers/uniqueId';



const baseURL = API_URL; 


export const serviceService = {
    getServices,
    generateRef
};

async function getServices() {
    const token = await getToken();
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    } 
    const url = `${baseURL}/services`;


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

async function generateRef() {
    const transactionRef = await generateId();
    return transactionRef;
}

