import api from './api';
import db from '../utils/db';
import { getToken } from '../helpers/auth';
import axios from 'axios';
import {
    API_URL
} from 'react-native-dotenv';
import { generateId } from '../helpers/uniqueId';
import { modifyImage } from '../helpers/encode';
import { serialize } from 'object-to-formdata';



const baseURL = API_URL;




export const businessRegService = {
    registerBusiness,
    generateRef,
    registerIndividualBusiness,
    getNaturesOfBusiness
};

async function registerBusiness(data) {
    const token = await getToken()

    if (data.document && data.document.data) {
        let document = await uploadImage(data.document)
        data.document = document.data.url;
    }

    if (data.corporatePartners) {
        for (let i = 0; i < data.corporatePartners.length; i++) {
            if (data.corporatePartners[i].authorizedSignatory.signature.data) {
                let signature = await uploadImage(data.corporatePartners[i].authorizedSignatory.signature)
                data.corporatePartners[i].authorizedSignatory.signature = signature.data.url
            }
            if (data.corporatePartners[i].authorizedSignatory.passport.data) {
                let passport = await uploadImage(data.corporatePartners[i].authorizedSignatory.passport)
                data.corporatePartners[i].authorizedSignatory.passport = passport.data.url
            }
        }
    }

    if (data.individualPartners) {
        for (let i = 0; i < data.individualPartners.length; i++) {
            if (data.individualPartners[i].signature.data) {
                let signature = await uploadImage(data.individualPartners[i].signature)
                data.individualPartners[i].signature = signature.data.url
            }
            if (data.individualPartners[i].passport.data) {
                let passport = await uploadImage(data.individualPartners[i].passport)
                data.individualPartners[i].passport = passport.data.url
            }
            if (data.individualPartners[i].document.data) {
                let document = await uploadImage(data.individualPartners[i].document)
                data.individualPartners[i].document = document.data.url
            }
        }
    }

    if (data.minorPartners) {
        for (let i = 0; i < data.minorPartners.length; i++) {
            if (data.minorPartners[i].signature.data) {
                let signature = await uploadImage(data.minorPartners[i].signature)
                data.minorPartners[i].signature = signature.data.url
            }
            if (data.minorPartners[i].passport.data) {
                let passport = await uploadImage(data.minorPartners[i].passport)
                data.minorPartners[i].passport = passport.data.url
            }
            if (data.minorPartners[i].document.data) {
                let document = await uploadImage(data.minorPartners[i].document)
                data.minorPartners[i].document = document.data.url
            }

            if (data.minorPartners[i].attestee) {
                if (data.minorPartners[i].attestee.signature.data) {
                    let signature = await uploadImage(data.minorPartners[i].attestee.signature)
                    data.minorPartners[i].attestee.signature = signature.data.url
                }
                if (data.minorPartners[i].attestee.passport.data) {
                    let passport = await uploadImage(data.minorPartners[i].attestee.passport)
                    data.minorPartners[i].attestee.passport = passport.data.url
                }
                if (data.minorPartners[i].attestee.document.data) {
                    let document = await uploadImage(data.minorPartners[i].attestee.document)
                    data.minorPartners[i].attestee.document = document.data.url
                }
            }
        }
    }


    const config = {
        headers: {
            Authorization: "Bearer " + token,
            // 'Content-Type': 'multipart/form-data',
        }
    }
    const url = `${baseURL}/businessReg`;


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

async function registerIndividualBusiness(data) {
    const token = await getToken()

    if (data.document && data.document.data) {
        let document = await uploadImage(data.document)
        data.document = document.data.url;
    }

    if (data.proprietor.document.data) {
        let proprietorDocument = await uploadImage(data.proprietor.document);
        data.proprietor.document = proprietorDocument.data.url;
    }

    if (data.proprietor.passport.data) {
        let proprietorPassport = await uploadImage(data.proprietor.passport);
        data.proprietor.passport = proprietorPassport.data.url;
    }

    if (data.proprietor.signature.data) {
        let proprietorSignature = await uploadImage(data.proprietor.signature);
        data.proprietor.signature = proprietorSignature.data.url;
    }

    const config = {
        headers: {
            Authorization: "Bearer " + token,
            // 'Content-Type': 'multipart/form-data',
        }
    }
    const url = `${baseURL}/businessReg`;


    try {
        const resp = await axios.post(url, data, config);
        if (resp.data) {
            return resp.data;
        }
    } catch (error) {
        return error;
    }
}

async function generateRef() {
    const transactionRef = await generateId();
    return transactionRef;
}

async function uploadImage(data) {
    const token = await getToken()

    // const formData = new FormData();
    // formData.append('files[]', data);

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const url = `${baseURL}/businessReg/uploadImage/`;

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

async function getNaturesOfBusiness() {
    const token = await getToken()

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const url = `${baseURL}/businessNaturesOfBusiness`;

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

