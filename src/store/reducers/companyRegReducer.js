import { companyRegConstants } from '../constants';

const SAVE_DATA = companyRegConstants.SAVE_DATA
const GENERATE_REF = companyRegConstants.GENERATE_REF
const COMPANY_REG_REQUEST = companyRegConstants.COMPANY_REG_REQUEST
const COMPANY_REG_FAILURE = companyRegConstants.COMPANY_REG_FAILURE
const COMPANY_REG_SUCCESS = companyRegConstants.COMPANY_REG_SUCCESS

const COMPANY_INDIVIDUAL_REG_REQUEST = companyRegConstants.COMPANY_INDIVIDUAL_REG_REQUEST
const COMPANY_INDIVIDUAL_REG_FAILURE = companyRegConstants.COMPANY_INDIVIDUAL_REG_FAILURE
const COMPANY_INDIVIDUAL_REG_SUCCESS = companyRegConstants.COMPANY_INDIVIDUAL_REG_SUCCESS

const BUSINESS_OBJ_REQUEST = companyRegConstants.BUSINESS_OBJ_REQUEST
const BUSINESS_OBJ_FAILURE = companyRegConstants.BUSINESS_OBJ_FAILURE
const BUSINESS_OBJ_SUCCESS = companyRegConstants.BUSINESS_OBJ_SUCCESS

const NOB_REQUEST = companyRegConstants.NOB_REQUEST
const NOB_FAILURE = companyRegConstants.NOB_FAILURE
const NOB_SUCCESS = companyRegConstants.NOB_SUCCESS

const GET_ARTICLES_REQUEST = companyRegConstants.GET_ARTICLES_REQUEST
const GET_ARTICLES_FAILURE = companyRegConstants.GET_ARTICLES_FAILURE
const GET_ARTICLES_SUCCESS = companyRegConstants.GET_ARTICLES_SUCCESS

const UPDATE_TYPE = companyRegConstants.UPDATE_TYPE


export function companyRegReducer(state = {
    loading: false,
    submitted: false,
    companyRegData: {},
    transactionRef: '',
    companyRegType: '',
    businessObjects: [],
    naturesOfBusiness: [],
    gettingArticles:false,
    articles:[]
}, action) {
    switch (action.type) {
        case SAVE_DATA:
            return {
                ...state,
                loading: false,
                submitted: false,
                companyRegData: action.data,
                transactionRef: state.transactionRef
            }
        case GENERATE_REF:
            return {
                ...state,
                loading: false,
                submitted: false,
                companyRegData: state.companyRegData,
                transactionRef: action.ref
            }
        case COMPANY_REG_REQUEST:
            return {
                ...state,
                loading: true,
                submitted: false,
                companyRegData: state.companyRegData,
                transactionRef: state.transactionRef
            }
        case COMPANY_REG_FAILURE:
            return {
                ...state,
                loading: false,
                submitted: false,
                companyRegData: state.companyRegData,
                transactionRef: state.transactionRef
            }
        case COMPANY_REG_SUCCESS:
            return {
                ...state,
                loading: false,
                submitted: true,
                companyRegData: action.data,
                transactionRef: state.transactionRef
            }
        case BUSINESS_OBJ_REQUEST:
            return {
                ...state,
                businessObjects: []
            }
        case BUSINESS_OBJ_FAILURE:
            return {
                ...state,
                businessObjects: []
            }
        case BUSINESS_OBJ_SUCCESS:
            return {
                ...state,
                businessObjects: action.data
            }
        case NOB_REQUEST:
            return {
                ...state,
                naturesOfBusiness: []
            }
        case NOB_FAILURE:
            return {
                ...state,
                naturesOfBusiness: []
            }
        case NOB_SUCCESS:
            return {
                ...state,
                naturesOfBusiness: action.data
            }
        case GET_ARTICLES_REQUEST:
            return {
                ...state,
                gettingArticles: true,
            }
        case GET_ARTICLES_FAILURE:
            return {
                ...state,
                gettingArticles: false,
            }
        case GET_ARTICLES_SUCCESS:
            return {
                ...state,
                gettingArticles: false,
                articles: action.data
            }
        case UPDATE_TYPE:
            return { 
                ...state,
                companyRegType: action.companyRegType
            }
        default:
            return state
    }
}


