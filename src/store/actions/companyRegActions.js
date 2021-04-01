import { companyRegConstants } from '../constants';
import { alertActions } from './alertActions';
import { companyRegService } from '../../services';
import { NavigationAction, NavigationActions } from 'react-navigation';

export const companyRegActions = {
    saveData,
    registerLimitedCompany,
    registerUnlimitedCompany,
    registerLimitedGuaranteeCompany,
    generateRef,
    updateType,
    getBusinessObjects,
    getNaturesOfBusiness,
    getArticles
};


function saveData(data) {
    return dispatch => {
        dispatch(save(data));
    };

    function save(data) { return { type: companyRegConstants.SAVE_DATA, data } }
}

function generateRef() {
    return async dispatch => {
        const ref = await companyRegService.generateRef()
        dispatch(saveRef(ref))
    }


    function saveRef(ref) { return { type: companyRegConstants.GENERATE_REF, ref } }
}


function registerLimitedCompany(data) {
    return dispatch => {
        dispatch(request(data));

        companyRegService.registerLimitedCompany(data)
            .then(resp => {
                if (resp && resp.data) {
                    dispatch(success(resp.data));
                } else {
                    dispatch(failure('error'));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request(data) { return { type: companyRegConstants.COMPANY_REG_REQUEST, data } }
    function success(data) { return { type: companyRegConstants.COMPANY_REG_SUCCESS, data } }
    function failure(data) { return { type: companyRegConstants.COMPANY_REG_FAILURE, data } }
}

function registerUnlimitedCompany(data) {
    return dispatch => {
        dispatch(request(data));

        companyRegService.registerUnlimitedCompany(data)
            .then(resp => {
                if (resp && resp.data) {
                    dispatch(success(resp.data));
                } else {
                    dispatch(failure('error'));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request(data) { return { type: companyRegConstants.COMPANY_REG_REQUEST, data } }
    function success(data) { return { type: companyRegConstants.COMPANY_REG_SUCCESS, data } }
    function failure(data) { return { type: companyRegConstants.COMPANY_REG_FAILURE, data } }
}

function registerLimitedGuaranteeCompany(data) {
    return dispatch => {
        dispatch(request(data));

        companyRegService.registerLimitedGuaranteeCompany(data)
            .then(resp => {
                if (resp && resp.data) {
                    dispatch(success(resp.data));
                } else {
                    dispatch(failure('error'));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request(data) { return { type: companyRegConstants.COMPANY_REG_REQUEST, data } }
    function success(data) { return { type: companyRegConstants.COMPANY_REG_SUCCESS, data } }
    function failure(data) { return { type: companyRegConstants.COMPANY_REG_FAILURE, data } }
}

function updateType(companyRegType) {
    return { type: companyRegConstants.UPDATE_TYPE, companyRegType }
}

function getBusinessObjects() {
    return dispatch => {
        dispatch(request());

        companyRegService.getBusinessObjects()
            .then(resp => {
                if (resp && resp.data) {
                    dispatch(success(resp.data.result));
                } else {
                    dispatch(failure('error'));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request() { return { type: companyRegConstants.BUSINESS_OBJ_REQUEST } }
    function success(data) { return { type: companyRegConstants.BUSINESS_OBJ_SUCCESS, data } }
    function failure(data) { return { type: companyRegConstants.BUSINESS_OBJ_FAILURE, data } }
}


function getNaturesOfBusiness() {
    return dispatch => {
        dispatch(request());

        companyRegService.getNaturesOfBusiness()
            .then(resp => {
                if (resp && resp.data) {
                    dispatch(success(resp.data.result));
                } else {
                    dispatch(failure('error'));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request() { return { type: companyRegConstants.NOB_REQUEST } }
    function success(data) { return { type: companyRegConstants.NOB_SUCCESS, data } }
    function failure(data) { return { type: companyRegConstants.NOB_FAILURE, data } }
}

function getArticles() {
    return dispatch => {
        dispatch(request());

        companyRegService.getArticles()
            .then(resp => {
                if (resp) { 
                    dispatch(success(resp));
                } else {
                    dispatch(failure('error'));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request() { return { type: companyRegConstants.GET_ARTICLES_REQUEST } }
    function success(data) { return { type: companyRegConstants.GET_ARTICLES_SUCCESS, data } }
    function failure(data) { return { type: companyRegConstants.GET_ARTICLES_FAILURE, data } }
}





