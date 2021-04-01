import { alertConstants } from '../constants';
import toast from '../../utils/SimpleToast';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    toast.show(message);
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    toast.show(message);
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}