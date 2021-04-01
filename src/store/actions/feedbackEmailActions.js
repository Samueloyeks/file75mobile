import { feedbackEmailConstants } from '../constants';
import { alertActions } from './alertActions';
import { feedbackEmailService} from '../../services';
import { NavigationAction, NavigationActions } from 'react-navigation';

export const feedbackEmailActions = {
    sendFeedback
};



function sendFeedback(data) {
    return dispatch => {
        dispatch(request(data));

        feedbackEmailService.sendFeedback(data)
            .then(resp => {
                if (resp && resp.data) {
                    dispatch(success(resp.data.result));
                    dispatch(alertActions.success('Message Sent'));
                } else {
                    dispatch(failure('error'));
                    dispatch(alertActions.error('Error'));
                }
            }, error => { 
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request(data) { return { type: feedbackEmailConstants.SEND_FEEDBACK_REQUEST, data } }
    function success(data) { return { type: feedbackEmailConstants.SEND_FEEDBACK_SUCCESS, data } }
    function failure(data) { return { type: feedbackEmailConstants.SEND_FEEDBACK_FAILURE, data } }
}




