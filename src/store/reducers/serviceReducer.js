import { serviceConstants } from '../constants';
const GENERATE_REF = serviceConstants.GENERATE_REF

const GET_SERVICES_REQUEST = serviceConstants.GET_SERVICES_REQUEST
const GET_SERVICES_FAILURE = serviceConstants.GET_SERVICES_FAILURE
const GET_SERVICES_SUCCESS = serviceConstants.GET_SERVICES_SUCCESS

const UPDATE_SERVICE_PAYMENT = serviceConstants.UPDATE_SERVICE_PAYMENT


const all = {
    _id: '1',
    category: 'All'
}

export function serviceReducer(state = {
    loading: false,
    submitted:false,
    services: [],
    payForService: '',
    transactionRef: '',
}, action) {
    switch (action.type) {
        case GET_SERVICES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_SERVICES_FAILURE:
            return {
                ...state,
                loading: false,
            }
        case GET_SERVICES_SUCCESS:
            action.data.push(all)
            return {
                ...state,
                loading: false,
                services: action.data
            }
        case UPDATE_SERVICE_PAYMENT:
            return {
                ...state,
                payForService: action.service
            }
        case GENERATE_REF:
            return {
                ...state,
                loading: false,
                transactionRef: action.ref
            }
        default:
            return state
    }
}
