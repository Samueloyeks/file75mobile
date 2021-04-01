import { faqConstants } from '../constants';

const FAQ_REQUEST = faqConstants.FAQ_REQUEST
const FAQ_SUCCESS = faqConstants.FAQ_SUCCESS
const FAQ_FAILURE = faqConstants.FAQ_FAILURE


export function faqReducer(state = {
    faq: [],
    loading: false
}, action) {
    switch (action.type) {
        case FAQ_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FAQ_SUCCESS:
            return {
                ...state,
                loading: false,
                faq: action.data
            }
        case FAQ_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
