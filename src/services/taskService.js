import api from './api';
import db from '../utils/db';
import { getToken } from '../helpers/auth';
import { encodeAssociations } from '../helpers/encode';
import axios from 'axios';
import {
    API_URL
} from 'react-native-dotenv';
import qs from 'qs';



const baseURL = API_URL;


export const taskService = {
    getTasks,
    getTaskFiles,
    markAsViewed
};

async function getTasks(params) {
    const token = await getToken();
    params.associations = await encodeAssociations(params.associations);
    const config = {
        headers: {
            Authorization: "Bearer " + token
        },
        params
    }
    const reservations_url = `${baseURL}/reservation`;
    const bus_reg_url = `${baseURL}/businessReg`;
    const company_reg_url = `${baseURL}/companyReg`;


    try {
        const reservations_resp = await axios.get(reservations_url, config);
        const bus_reg_resp = await axios.get(bus_reg_url, config);
        const company_reg_resp = await axios.get(company_reg_url, config);
        // const resp = await axios.get(url, config);


        if (
            reservations_resp.data &&
            reservations_resp.data.data &&
            bus_reg_resp.data &&
            bus_reg_resp.data.data &&
            company_reg_resp.data &&
            company_reg_resp.data.data
        ) {
            let result = [].concat(
                reservations_resp.data.data.result,
                bus_reg_resp.data.data.result,
                company_reg_resp.data.data.result)

            return result;
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}

async function getTaskFiles(responseFiles) {
    const files = []

    for (var file of responseFiles) {
        let responseFile = await getTaskFile(file);
        files.push(responseFile.data)
    }

    return files;
}

async function getTaskFile(path) {
    const token = await getToken();

    const config = {
        headers: {
            Authorization: "Bearer " + token
        },
        params: { filePath: path }
    }
    const url = `${baseURL}/uploads`;


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

async function markAsViewed(id, service) {
    const token = await getToken()
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const url = `${baseURL}/${service}/markAsViewed/${id}`;

    let data = {
        "_id": id
    }

    try {
        const resp = await axios.put(url, data, config);
        if (resp.data) {
            return resp.data;
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}

