import api from './api';
import db from '../utils/db';
import { getToken } from '../helpers/auth';
import axios from 'axios';
import {
    API_URL
} from 'react-native-dotenv';
import { generateId } from '../helpers/uniqueId';


const baseURL = API_URL;

 


export const feedbackEmailService = {
    sendFeedback,
};

async function sendFeedback(data) {
    const token = await getToken()
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const url = `${baseURL}/feedback`;


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



