import api from './api';
import db from '../utils/db';
import { getToken } from '../helpers/auth';
import axios from 'axios';
import {
    API_URL
} from 'react-native-dotenv';
import { generateId } from '../helpers/uniqueId';


const baseURL = API_URL;




export const reservationService = {
    reserveName,
    generateRef
};

async function reserveName(data) {
    const token = await getToken()
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const url = `${baseURL}/reservation`;


    try {
        const resp = await axios.post(url, data, config);
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

