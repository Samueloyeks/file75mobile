import { combineReducers } from 'redux';

const { userReducer } = require('./userReducer');
const { alertReducer } = require('./alertReducer');
const { reservationReducer } = require('./reservationReducer');
const { taskReducer } = require('./taskReducer');
const { serviceReducer } = require('./serviceReducer');
const { businessRegReducer } = require('./businessRegReducer');
const { companyRegReducer } = require('./companyRegReducer');
const { locationReducer } = require('./locationReducer');
const { faqReducer } = require('./faqReducer');
const { feedbackEmailReducer } = require('./feedbackEmailReducer');






const rootReducer = combineReducers({
    user: userReducer,
    alert: alertReducer,
    reserve: reservationReducer,
    tasks: taskReducer,
    services: serviceReducer,
    businessReg: businessRegReducer,
    companyReg: companyRegReducer,
    location:locationReducer,
    faq:faqReducer,
    feedback:feedbackEmailReducer
});

export default rootReducer;