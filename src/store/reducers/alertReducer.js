import { alertConstants } from '../constants';

const SUCCESS_ALERT = alertConstants.SUCCESS
const ERROR_ALERT = alertConstants.ERROR
const CLEAR_ALERT = alertConstants.CLEAR


export function alertReducer(state = {
    message: ''
}, action) {
    switch (action.type) {
        case SUCCESS_ALERT:
            return {
                ...state,
                message: action.message
            }
        case ERROR_ALERT:
            return {
                ...state,
                message: action.message
            }
        case CLEAR_ALERT:
            return {
                ...state,
                message: action.message
            }
        default:
            return state
    }
}
