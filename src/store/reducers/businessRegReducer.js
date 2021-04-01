import { businessRegConstants } from '../constants';

const SAVE_DATA = businessRegConstants.SAVE_DATA
const GENERATE_REF = businessRegConstants.GENERATE_REF
const BUSINESS_REG_REQUEST = businessRegConstants.BUSINESS_REG_REQUEST
const BUSINESS_REG_FAILURE = businessRegConstants.BUSINESS_REG_FAILURE
const BUSINESS_REG_SUCCESS = businessRegConstants.BUSINESS_REG_SUCCESS

const BUSINESS_INDIVIDUAL_REG_REQUEST = businessRegConstants.BUSINESS_INDIVIDUAL_REG_REQUEST
const BUSINESS_INDIVIDUAL_REG_FAILURE = businessRegConstants.BUSINESS_INDIVIDUAL_REG_FAILURE
const BUSINESS_INDIVIDUAL_REG_SUCCESS = businessRegConstants.BUSINESS_INDIVIDUAL_REG_SUCCESS

const NOB_REQUEST = businessRegConstants.NOB_REQUEST
const NOB_FAILURE = businessRegConstants.NOB_FAILURE
const NOB_SUCCESS = businessRegConstants.NOB_SUCCESS

const UPDATE_TYPE = businessRegConstants.UPDATE_TYPE



export function businessRegReducer(state = {
    loading: false,
    submitted: false,
    businessRegData: {},
    businessIndividualRegData: {},
    transactionRef: '',
    businessRegType: '',
    naturesOfBusiness: [],
}, action) {
    switch (action.type) {
        case SAVE_DATA:
            return {
                ...state,
                loading: false,
                submitted: false,
                businessRegData: action.data,
                transactionRef: state.transactionRef
            }
        case GENERATE_REF:
            return {
                ...state,
                loading: false,
                submitted: false,
                businessRegData: state.businessRegData,
                transactionRef: action.ref
            }
        case BUSINESS_REG_REQUEST:
            return {
                ...state,
                loading: true,
                submitted: false,
                businessRegData: state.businessRegData,
                transactionRef: state.transactionRef
            }
        case BUSINESS_REG_FAILURE:
            return {
                ...state,
                loading: false,
                submitted: false,
                businessRegData: state.businessRegData,
                transactionRef: state.transactionRef
            }
        case BUSINESS_REG_SUCCESS:
            return {
                ...state,
                loading: false,
                submitted: true,
                businessRegData: action.data,
                transactionRef: state.transactionRef
            }
        case BUSINESS_INDIVIDUAL_REG_REQUEST:
            return {
                ...state,
                loading: true,
                submitted: false,
                businessIndividualRegData: state.businessIndividualRegData,
                transactionRef: state.transactionRef
            }
        case BUSINESS_INDIVIDUAL_REG_FAILURE:
            return {
                ...state,
                loading: false,
                submitted: false,
                businessIndividualRegData: state.businessIndividualRegData,
                transactionRef: state.transactionRef
            }
        case BUSINESS_INDIVIDUAL_REG_SUCCESS:
            return {
                ...state,
                loading: false,
                submitted: true,
                businessIndividualRegData: action.data,
                transactionRef: state.transactionRef
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
        case UPDATE_TYPE:
            return {
                ...state,
                businessRegType: action.businessRegType
            }
        default:
            return state
    }
}
