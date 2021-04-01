import { serviceConstants } from '../constants';
import { alertActions } from './alertActions';
import { serviceService } from '../../services';
import { NavigationAction, NavigationActions } from 'react-navigation';

export const serviceActions = {
    generateRef,
    getServices,
    updateServicePayment
};


function generateRef() {
    return async dispatch => {
        const ref = await serviceService.generateRef()
        dispatch(saveRef(ref))
    }


    function saveRef(ref) { return { type: serviceConstants.GENERATE_REF, ref } }
}


function getServices(params) {
    return dispatch => {
        dispatch(request(params));

        serviceService.getServices(params)
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


    function request(params) { return { type: serviceConstants.GET_SERVICES_REQUEST,params } }
    function success(data) { return { type: serviceConstants.GET_SERVICES_SUCCESS, data } }
    function failure(data) { return { type: serviceConstants.GET_SERVICES_FAILURE, data } }
}

function updateServicePayment(service){
    return { type: serviceConstants.UPDATE_SERVICE_PAYMENT,service }
}





