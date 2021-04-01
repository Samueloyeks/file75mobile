import { feedbackEmailConstants } from '../constants';

const SEND_FEEDBACK_REQUEST = feedbackEmailConstants.SEND_FEEDBACK_REQUEST
const SEND_FEEDBACK_SUCCESS = feedbackEmailConstants.SEND_FEEDBACK_SUCCESS
const SEND_FEEDBACK_FAILURE = feedbackEmailConstants.SEND_FEEDBACK_FAILURE


export function feedbackEmailReducer(state = {
    loading: false,
    feedbackSent: false
}, action) {
    switch (action.type) {
        case SEND_FEEDBACK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SEND_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case SEND_FEEDBACK_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
