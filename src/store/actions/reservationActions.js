import { reservationConstants } from '../constants';
import { alertActions } from './alertActions';
import { reservationService } from '../../services';
import { NavigationAction, NavigationActions } from 'react-navigation';

export const reservationActions = {
    saveData,
    reserveName,
    generateRef,
    updateType,
    updateCompanyType
};


function saveData(data) {
    return dispatch => {
        dispatch(save(data));
    };

    function save(data) { return { type: reservationConstants.SAVE_DATA, data } }
}

function generateRef() {
    return async dispatch => {
        const ref = await reservationService.generateRef()
        dispatch(saveRef(ref))
    }


    function saveRef(ref) { return { type: reservationConstants.GENERATE_REF, ref } }
}


function reserveName(data) {
    return dispatch => {
        dispatch(request(data));

        reservationService.reserveName(data)
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


    function request(data) { return { type: reservationConstants.RESERVATION_REQUEST, data } }
    function success(data) { return { type: reservationConstants.RESERVATION_SUCCESS, data } }
    function failure(data) { return { type: reservationConstants.RESERVATION_FAILURE, data } }
}

function updateType(reservationType){
    return { type: reservationConstants.UPDATE_TYPE,reservationType }
}

function updateCompanyType(companyReservationType){
    return { type: reservationConstants.UPDATE_COMPANY_TYPE,companyReservationType }
}





