import { locationConstants } from '../constants';


const COUNTRY_REQUEST = locationConstants.COUNTRY_REQUEST
const COUNTRY_FAILURE = locationConstants.COUNTRY_FAILURE
const COUNTRY_SUCCESS = locationConstants.COUNTRY_SUCCESS

const STATE_REQUEST = locationConstants.STATE_REQUEST
const STATE_FAILURE = locationConstants.STATE_FAILURE
const STATE_SUCCESS = locationConstants.STATE_SUCCESS

const CITY_REQUEST = locationConstants.CITY_REQUEST
const CITY_FAILURE = locationConstants.CITY_FAILURE
const CITY_SUCCESS = locationConstants.CITY_SUCCESS



export function locationReducer(state = {
    loading: false,
    countries: [],
    states: [],
    cities: []
}, action) {
    switch (action.type) {
        case COUNTRY_REQUEST:
            return {
                ...state,
                loading: true,
                countries: state.countries
            }
        case COUNTRY_FAILURE:
            return {
                ...state,
                loading: false,
                countries: state.countries
            }
        case COUNTRY_SUCCESS:
            return {
                ...state,
                loading: false,
                countries: Array.isArray(action.data) ? action.data : state.countries
            }
        case STATE_REQUEST:
            return {
                ...state,
                loading: true,
                states: state.states
            }
        case STATE_FAILURE:
            return {
                ...state,
                loading: false,
                states: state.states
            }
        case STATE_SUCCESS:
            return {
                ...state,
                loading: false,
                states: Array.isArray(action.data) ? action.data : state.states
            }
        case CITY_REQUEST:
            return {
                ...state,
                loading: true,
                cities: state.cities
            }
        case CITY_FAILURE:
            return {
                ...state,
                loading: false,
                cities: state.cities
            }
        case CITY_SUCCESS:
            return {
                ...state,
                loading: false,
                cities: Array.isArray(action.data) ? action.data : state.cities
            }
        default:
            return state
    }
}
