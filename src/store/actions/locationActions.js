import { locationConstants } from '../constants';
import { alertActions } from './alertActions';
import { locationService } from '../../services';

export const locationActions = {
    getCountries,
    getStates,
    getCities
};


function getCountries(data) {
    return dispatch => {
        dispatch(request(data));

        locationService.getCountries(data)
            .then(resp => {
                if (resp) {
                    for(let i=0;i<resp.length;i++){
                        resp[i].name = resp[i].country_name
                    }
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


    function request(data) { return { type: locationConstants.COUNTRY_REQUEST, data } }
    function success(data) { return { type: locationConstants.COUNTRY_SUCCESS, data } }
    function failure(data) { return { type: locationConstants.COUNTRY_FAILURE, data } }
}

function getStates(data) {
    return dispatch => {
        dispatch(request(data));

        locationService.getStates(data)
            .then(resp => {
                if (resp) {
                    for(let i=0;i<resp.length;i++){
                        resp[i].name = resp[i].state_name
                    }
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


    function request(data) { return { type: locationConstants.STATE_REQUEST, data } }
    function success(data) { return { type: locationConstants.STATE_SUCCESS, data } }
    function failure(data) { return { type: locationConstants.STATE_FAILURE, data } }
}

function getCities(data) {
    return dispatch => {
        dispatch(request(data));

        locationService.getCities(data)
            .then(resp => {
                if (resp) {
                    for(let i=0;i<resp.length;i++){
                        resp[i].name = resp[i].city_name
                    }
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


    function request(data) { return { type: locationConstants.CITY_REQUEST, data } }
    function success(data) { return { type: locationConstants.CITY_SUCCESS, data } }
    function failure(data) { return { type: locationConstants.CITY_FAILURE, data } }
}






