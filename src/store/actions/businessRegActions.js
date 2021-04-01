import { businessRegConstants } from '../constants';
import { alertActions } from './alertActions';
import { businessRegService } from '../../services';
import { NavigationAction, NavigationActions } from 'react-navigation';

export const businessRegActions = {
    saveData,
    registerBusiness,
    registerIndividualBusiness,
    generateRef,
    updateType,
    getNaturesOfBusiness
};


function saveData(data) {
    return dispatch => {
        dispatch(save(data));
    };

    function save(data) { return { type: businessRegConstants.SAVE_DATA, data } }
}

function generateRef() {
    return async dispatch => {
        const ref = await businessRegService.generateRef()
        dispatch(saveRef(ref))
    }


    function saveRef(ref) { return { type: businessRegConstants.GENERATE_REF, ref } }
}


function registerBusiness(data) {
    return dispatch => {
        dispatch(request(data));

        businessRegService.registerBusiness(data)
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


    function request(data) { return { type: businessRegConstants.BUSINESS_REG_REQUEST, data } }
    function success(data) { return { type: businessRegConstants.BUSINESS_REG_SUCCESS, data } }
    function failure(data) { return { type: businessRegConstants.BUSINESS_REG_FAILURE, data } }
}

function registerIndividualBusiness(data) {
    return dispatch => {
        dispatch(request(data));

        businessRegService.registerIndividualBusiness(data)
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


    function request(data) { return { type: businessRegConstants.BUSINESS_INDIVIDUAL_REG_REQUEST, data } }
    function success(data) { return { type: businessRegConstants.BUSINESS_INDIVIDUAL_REG_SUCCESS, data } }
    function failure(data) { return { type: businessRegConstants.BUSINESS_INDIVIDUAL_REG_FAILURE, data } }
}

function updateType(businessRegType){
    return { type: businessRegConstants.UPDATE_TYPE,businessRegType }
}

function getNaturesOfBusiness() {
    return dispatch => {
        dispatch(request());

        businessRegService.getNaturesOfBusiness()
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


    function request() { return { type: businessRegConstants.NOB_REQUEST } }
    function success(data) { return { type: businessRegConstants.NOB_SUCCESS, data } }
    function failure(data) { return { type: businessRegConstants.NOB_FAILURE, data } }
}





