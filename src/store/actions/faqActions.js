import { faqConstants } from '../constants';
import { alertActions } from './alertActions';
import { faqService } from '../../services';
import { NavigationAction, NavigationActions } from 'react-navigation';

export const faqActions = {
    getFaq
};



function getFaq(data) {
    return dispatch => {
        dispatch(request(data));

        faqService.getFaq(data)
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


    function request(data) { return { type: faqConstants.FAQ_REQUEST, data } }
    function success(data) { return { type: faqConstants.FAQ_SUCCESS, data } }
    function failure(data) { return { type: faqConstants.FAQ_FAILURE, data } }
}




