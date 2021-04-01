import { reservationConstants } from '../constants';

const SAVE_DATA = reservationConstants.SAVE_DATA
const GENERATE_REF = reservationConstants.GENERATE_REF
const RESERVATION_REQUEST = reservationConstants.RESERVATION_REQUEST
const RESERVATION_FAILURE = reservationConstants.RESERVATION_FAILURE
const RESERVATION_SUCCESS = reservationConstants.RESERVATION_SUCCESS

const UPDATE_TYPE = reservationConstants.UPDATE_TYPE
const UPDATE_COMPANY_TYPE = reservationConstants.UPDATE_COMPANY_TYPE



export function reservationReducer(state = {
    loading: false,
    submitted: false,
    reservationData: null,
    transactionRef: '',
    reservationType:'',
    companyReservationType:''
}, action) {
    switch (action.type) {
        case SAVE_DATA:
            return {
                ...state,
                loading: false,
                submitted: false,
                reservationData: action.data,
                transactionRef: state.transactionRef
            }
        case GENERATE_REF:
            return {
                ...state,
                loading: false,
                submitted: false,
                reservationData: state.reservationData,
                transactionRef: action.ref
            }
        case RESERVATION_REQUEST:
            return {
                ...state,
                loading: true,
                submitted: false,
                reservationData: state.reservationData,
                transactionRef: state.transactionRef
            }
        case RESERVATION_FAILURE:
            return {
                ...state,
                loading: false,
                submitted: false,
                reservationData: state.reservationData,
                transactionRef: state.transactionRef
            }
        case RESERVATION_SUCCESS:
            return {
                ...state,
                loading: false,
                submitted: true,
                reservationData: action.data,
                transactionRef: state.transactionRef
            }
        case UPDATE_TYPE:
            return{
                ...state,
                reservationType:action.reservationType
            }
            case UPDATE_COMPANY_TYPE:
                return{
                    ...state,
                    companyReservationType:action.companyReservationType
                }
        default:
            return state
    }
}
