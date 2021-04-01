import { userConstants } from '../constants';

const LOGIN_REQUEST = userConstants.LOGIN_REQUEST
const LOGIN_FAILURE = userConstants.LOGIN_FAILURE
const LOGIN_SUCCESS = userConstants.LOGIN_SUCCESS

const REGISTER_REQUEST = userConstants.REGISTER_REQUEST
const REGISTER_SUCCESS = userConstants.REGISTER_SUCCESS
const REGISTER_FAILURE = userConstants.REGISTER_FAILURE

const FB_REQUEST = userConstants.FB_REQUEST
const FB_SUCCESS = userConstants.FB_SUCCESS
const FB_FAILURE = userConstants.FB_FAILURE

const GOOGLE_REQUEST = userConstants.GOOGLE_REQUEST
const GOOGLE_SUCCESS = userConstants.GOOGLE_SUCCESS
const GOOGLE_FAILURE = userConstants.GOOGLE_FAILURE

const RESET_REQUEST = userConstants.RESET_REQUEST
const RESET_SUCCESS = userConstants.RESET_SUCCESS
const RESET_FAILURE = userConstants.RESET_FAILURE

const LOGOUT_SUCCESS = userConstants.LOGOUT_SUCCESS


export function userReducer(state = {
    loading: false,
    isAuthenticated: false,
    resetTokenSent: false,
    loggedOut: false,
    userData: null,
    userToken: null
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.error
            } 
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userToken: action.token,
                userData: action.data,
                loggedOut:false
            }
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.error
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userToken: action.token,
                userData: action.data,
                loggedOut:false
            }
        case FB_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            }
        case FB_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.error
            }
        case FB_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userToken: action.token,
                userData: action.data,
                loggedOut:false
            }
        case GOOGLE_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            }
        case GOOGLE_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.error
            }
        case GOOGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userToken: action.token,
                userData: action.data,
                loggedOut:false
            }
        case RESET_REQUEST:
            return {
                ...state,
                loading: true,
                resetTokenSent: false
            }
        case RESET_FAILURE:
            return {
                ...state,
                loading: false,
                resetTokenSent: false
            }
        case RESET_SUCCESS:
            return {
                ...state,
                loading: false,
                resetTokenSent: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loggedOut: true,
                userData: null,
                userToken: null
            }
        default:
            return state
    }
}
