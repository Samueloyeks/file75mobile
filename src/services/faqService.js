import api from './api';
import db from '../utils/db';
import { getToken } from '../helpers/auth';
import axios from 'axios';
import {
    API_URL
} from 'react-native-dotenv';


const baseURL = API_URL;




export const faqService = {
    getFaq
};

async function getFaq() {
    const token = await getToken()
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const url = `${baseURL}/faq`;


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

