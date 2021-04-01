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




export const companyRegService = {
    registerLimitedCompany,
    registerUnlimitedCompany,
    registerLimitedGuaranteeCompany,
    generateRef,
    getBusinessObjects,
    getNaturesOfBusiness,
    getArticles
    // registerIndividualBusiness
};

async function registerLimitedCompany(data) {
    const token = await getToken()

    if (data.articlesOfAssociation.witnesses.length > 0) {
        for (let i = 0; i < data.articlesOfAssociation.witnesses.length; i++) {
            if (data.articlesOfAssociation.witnesses[i].signature.data) {
                let signature = await uploadImage(data.articlesOfAssociation.witnesses[i].signature)
                data.articlesOfAssociation.witnesses[i].signature = signature.data.url
            }
        }
    }

    for (let i = 0; i < data.directors.length; i++) {
        if (data.directors[i].signature.data) {
            let signature = await uploadImage(data.directors[i].signature)
            data.directors[i].signature = signature.data.url
        }
        if (data.directors[i].document.data) {
            let document = await uploadImage(data.directors[i].document)
            data.directors[i].document = document.data.url
        }
        if (data.directors[i].passport.data) {
            let passport = await uploadImage(data.directors[i].passport)
            data.directors[i].passport = passport.data.url
        }
    }

    if (data.individualShareholders.length > 0) {
        for (let i = 0; i < data.individualShareholders.length; i++) {
            if (data.individualShareholders[i].signature.data) {
                let signature = await uploadImage(data.individualShareholders[i].signature)
                data.individualShareholders[i].signature = signature.data.url
            }
            if (data.individualShareholders[i].document.data) {
                let document = await uploadImage(data.individualShareholders[i].document)
                data.individualShareholders[i].document = document.data.url
            }
            if (data.individualShareholders[i].passport.data) {
                let passport = await uploadImage(data.individualShareholders[i].passport)
                data.individualShareholders[i].passport = passport.data.url
            }
        }
    }

    if (data.minorShareholders.length > 0) {
        for (let i = 0; i < data.minorShareholders.length; i++) {
            if (data.minorShareholders[i].signature.data) {
                let signature = await uploadImage(data.minorShareholders[i].signature)
                data.minorShareholders[i].signature = signature.data.url
            }
            if (data.minorShareholders[i].document.data) {
                let document = await uploadImage(data.minorShareholders[i].document)
                data.minorShareholders[i].document = document.data.url
            }
            if (data.minorShareholders[i].passport.data) {
                let passport = await uploadImage(data.minorShareholders[i].passport)
                data.minorShareholders[i].passport = passport.data.url
            }
        }
    }

    if (data.corporateShareholders.length > 0) {
        for (let i = 0; i < data.corporateShareholders.length; i++) {
            if (data.corporateShareholders[i].authorizedSignatory.signature.data) {
                let signature = await uploadImage(data.corporateShareholders[i].authorizedSignatory.signature)
                data.corporateShareholders[i].authorizedSignatory.signature = signature.data.url
            }
            if (data.corporateShareholders[i].authorizedSignatory.passport.data) {
                let passport = await uploadImage(data.corporateShareholders[i].authorizedSignatory.passport)
                data.corporateShareholders[i].authorizedSignatory.passport = passport.data.url
            }
        }
    }



    if (data.PSCs.length > 0) {
        for (let i = 0; i < data.PSCs.length; i++) {
            if (data.PSCs[i].PSCType === 'naturalPerson') {
                if (data.PSCs[i].signature && data.PSCs[i].document && data.PSCs[i].passport) {
                    if (data.PSCs[i].signature.data) {
                        let signature = await uploadImage(data.PSCs[i].signature)
                        data.PSCs[i].signature = signature.data.url
                    }
                    if (data.PSCs[i].document.data) {
                        let document = await uploadImage(data.PSCs[i].document)
                        data.PSCs[i].document = document.data.url
                    }
                    if (data.PSCs[i].passport.data) {
                        let passport = await uploadImage(data.PSCs[i].passport)
                        data.PSCs[i].passport = passport.data.url
                    }
                }

                if (data.PSCs[i].authorizedSignatory && data.PSCs[i].authorizedSignatory.signature && data.PSCs[i].authorizedSignatory.passport) {
                    if (data.PSCs[i].authorizedSignatory.signature.data) {
                        let signature = await uploadImage(data.PSCs[i].authorizedSignatory.signature)
                        data.PSCs[i].authorizedSignatory.signature = signature.data.url
                    }
                    if (data.PSCs[i].authorizedSignatory.passport.data) {
                        let passport = await uploadImage(data.PSCs[i].authorizedSignatory.passport)
                        data.PSCs[i].authorizedSignatory.passport = passport.data.url
                    }
                }
            }

        }
    }

    if (data.secretary.secretaryType === 'individual') {
        if (data.secretary.signature.data) {
            let signature = await uploadImage(data.secretary.signature)
            data.secretary.signature = signature.data.url
        }
        if (data.secretary.document.data) {
            let document = await uploadImage(data.secretary.document)
            data.secretary.document = document.data.url
        }
        if (data.secretary.passport.data) {
            let passport = await uploadImage(data.secretary.passport)
            data.secretary.passport = passport.data.url
        }
    }



    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    const url = `${baseURL}/companyReg`;


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

async function registerUnlimitedCompany(data) {
    const token = await getToken()

    if (data.articlesOfAssociation.witnesses.length > 0) {
        for (let i = 0; i < data.articlesOfAssociation.witnesses.length; i++) {
            if (data.articlesOfAssociation.witnesses[i].signature.data) {
                let signature = await uploadImage(data.articlesOfAssociation.witnesses[i].signature)
                data.articlesOfAssociation.witnesses[i].signature = signature.data.url
            }
        }
    }

    for (let i = 0; i < data.directors.length; i++) {
        if (data.directors[i].signature.data) {
            let signature = await uploadImage(data.directors[i].signature)
            data.directors[i].signature = signature.data.url
        }
        if (data.directors[i].document.data) {
            let document = await uploadImage(data.directors[i].document)
            data.directors[i].document = document.data.url
        }
        if (data.directors[i].passport.data) {
            let passport = await uploadImage(data.directors[i].passport)
            data.directors[i].passport = passport.data.url
        }
    }

    if (data.individualShareholders.length > 0) {
        for (let i = 0; i < data.individualShareholders.length; i++) {
            if (data.individualShareholders[i].signature.data) {
                let signature = await uploadImage(data.individualShareholders[i].signature)
                data.individualShareholders[i].signature = signature.data.url
            }
            if (data.individualShareholders[i].document.data) {
                let document = await uploadImage(data.individualShareholders[i].document)
                data.individualShareholders[i].document = document.data.url
            }
            if (data.individualShareholders[i].passport.data) {
                let passport = await uploadImage(data.individualShareholders[i].passport)
                data.individualShareholders[i].passport = passport.data.url
            }
        }
    }

    if (data.minorShareholders.length > 0) {
        for (let i = 0; i < data.minorShareholders.length; i++) {
            if (data.minorShareholders[i].signature.data) {
                let signature = await uploadImage(data.minorShareholders[i].signature)
                data.minorShareholders[i].signature = signature.data.url
            }
            if (data.minorShareholders[i].document.data) {
                let document = await uploadImage(data.minorShareholders[i].document)
                data.minorShareholders[i].document = document.data.url
            }
            if (data.minorShareholders[i].passport.data) {
                let passport = await uploadImage(data.minorShareholders[i].passport)
                data.minorShareholders[i].passport = passport.data.url
            }
        }
    }

    if (data.corporateShareholders.length > 0) {
        for (let i = 0; i < data.corporateShareholders.length; i++) {
            if (data.corporateShareholders[i].signature.data) {
                let signature = await uploadImage(data.corporateShareholders[i].signature)
                data.corporateShareholders[i].signature = signature.data.url
            }
            if (data.corporateShareholders[i].passport.data) {
                let passport = await uploadImage(data.corporateShareholders[i].passport)
                data.corporateShareholders[i].passport = passport.data.url
            }
        }
    }

    if (data.PSCs.length > 0) {
        for (let i = 0; i < data.PSCs.length; i++) {
            if (data.PSCs[i].PSCType === 'naturalPerson') {
                if (data.PSCs[i].signature.data) {
                    let signature = await uploadImage(data.PSCs[i].signature)
                    data.PSCs[i].signature = signature.data.url
                }
                if (data.PSCs[i].document.data) {
                    let document = await uploadImage(data.PSCs[i].document)
                    data.PSCs[i].document = document.data.url
                }
                if (data.PSCs[i].passport.data) {
                    let passport = await uploadImage(data.PSCs[i].passport)
                    data.PSCs[i].passport = passport.data.url
                }
            }
        }
    }

    if (data.secretary.secretaryType === 'individual') {
        if (data.secretary.signature.data) {
            let signature = await uploadImage(data.secretary.signature)
            data.secretary.signature = signature.data.url
        }
        if (data.secretary.document.data) {
            let document = await uploadImage(data.secretary.document)
            data.secretary.document = document.data.url
        }
        if (data.secretary.passport.data) {
            let passport = await uploadImage(data.secretary.passport)
            data.secretary.passport = passport.data.url
        }
    }


    const config = {
        headers: {
            Authorization: "Bearer " + token,
            // 'Content-Type': 'multipart/form-data',
        }
    }
    const url = `${baseURL}/companyReg`;


    try {
        const resp = await axios.post(url, data, config);
        if (resp.data) {
            return resp.data;
        }
    } catch (error) {
        return error;
    }
}

async function registerLimitedGuaranteeCompany(data) {
    const token = await getToken()

    for (let i = 0; i < data.directors.length; i++) {
        if (data.directors[i].signature.data) {
            let signature = await uploadImage(data.directors[i].signature)
            data.directors[i].signature = signature.data.url
        }
        if (data.directors[i].document.data) {
            let document = await uploadImage(data.directors[i].document)
            data.directors[i].document = document.data.url
        }
    }

    if (data.secretary.signature.data) {
        let signature = await uploadImage(data.secretary.signature)
        data.secretary.signature = signature.data.url
    }
    if (data.secretary.document.data) {
        let document = await uploadImage(data.secretary.document)
        data.secretary.document = document.data.url
    }

    const config = {
        headers: {
            Authorization: "Bearer " + token,
            // 'Content-Type': 'multipart/form-data',
        }
    }
    const url = `${baseURL}/companyReg`;


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

async function getBusinessObjects() {
    const token = await getToken()

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const url = `${baseURL}/businessObjects`;

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

async function getNaturesOfBusiness() {
    const token = await getToken()

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const url = `${baseURL}/companyNaturesOfBusiness`;

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

async function getArticles() {
    const articles = []

    let article = await getArticle();
    articles.push(article.data.result)

    return articles;
}

async function getArticle() {
    const token = await getToken();

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const url = `${baseURL}/article`;


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

