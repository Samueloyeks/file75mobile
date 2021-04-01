import { taskConstants } from '../constants';
import { alertActions } from './alertActions';
import { taskService } from '../../services';
import { NavigationAction, NavigationActions } from 'react-navigation';

export const taskActions = {
    getTasks,
    getTaskFiles,
    saveFilePaths,
    silentlyGetTasks,
    loadMoreTasks,
    getAllTasks,
    markAsViewed
};


function getAllTasks(params) {
    var taskType = "approved"
    return dispatch => {
        taskType = "approved"
        params.byStatusCode = "approved"
        dispatch(request(params, taskType));
        taskService.getTasks(params, taskType)
            .then(resp => {
                if (resp) {
                    dispatch(success(resp, taskType));
                    taskType = "pending"
                    params.byStatusCode = "pending"
                    params.page = 1;
                } else {
                    dispatch(failure('error', taskType));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()), taskType);
                dispatch(alertActions.error(error.toString()));
            }).then(() => {
                dispatch(request(params, taskType));
                taskService.getTasks(params, taskType)
                    .then(resp => {
                        if (resp) {
                            dispatch(success(resp, taskType));
                            taskType = "declined"
                            params.byStatusCode = "rejected"
                            params.page = 1;
                        } else {
                            dispatch(failure('error', taskType));
                            dispatch(alertActions.error('Error'));
                        }
                    }, error => {
                        dispatch(failure(error.toString()), taskType);
                        dispatch(alertActions.error(error.toString()));
                    }).then(() => {
                        dispatch(request(params, taskType));
                        taskService.getTasks(params, taskType)
                            .then(resp => {
                                if (resp) {
                                    dispatch(success(resp, taskType));
                                } else {
                                    dispatch(failure('error', taskType));
                                    dispatch(alertActions.error('Error'));
                                }
                            }, error => {
                                dispatch(failure(error.toString()), taskType);
                                dispatch(alertActions.error(error.toString()));
                            })
                    })
            })

    }


    function request(params, taskType) { return { type: taskConstants.GET_TASKS_REQUEST, params, taskType } }
    function success(data, taskType) { return { type: taskConstants.GET_TASKS_SUCCESS, data, taskType } }
    function failure(data, taskType) { return { type: taskConstants.GET_TASKS_FAILURE, data, taskType } }
}


function getTasks(params, taskType) {
    return dispatch => {
        dispatch(request(params, taskType));

        taskService.getTasks(params, taskType)
            .then(resp => {
                if (resp) {
                    // resp.sort(function(a,b){
                    //     return new Date(b.created_at) - new Date(a.created_at);
                    //   });
                    dispatch(success(resp, taskType));
                } else {
                    dispatch(failure('error', taskType));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()), taskType);
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request(params, taskType) { return { type: taskConstants.GET_TASKS_REQUEST, params, taskType } }
    function success(data, taskType) { return { type: taskConstants.GET_TASKS_SUCCESS, data, taskType } }
    function failure(data, taskType) { return { type: taskConstants.GET_TASKS_FAILURE, data, taskType } }
}

function silentlyGetTasks(params, taskType) {
    return dispatch => {
        dispatch(request(params, taskType));

        taskService.getTasks(params, taskType)
            .then(resp => {
                if (resp) {
                    // resp.sort(function(a,b){
                    //     return new Date(b.created_at) - new Date(a.created_at);
                    //   });
                    dispatch(success(resp, taskType));
                } else {
                    dispatch(failure('error', taskType));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()), taskType);
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request(params, taskType) { return { type: taskConstants.SILENTLY_GET_TASKS_REQUEST, params, taskType } }
    function success(data, taskType) { return { type: taskConstants.SILENTLY_GET_TASKS_SUCCESS, data, taskType } }
    function failure(data, taskType) { return { type: taskConstants.SILENTLY_GET_TASKS_FAILURE, data, taskType } }
}

function loadMoreTasks(params, taskType) {
    return dispatch => {
        dispatch(request(params, taskType));

        taskService.getTasks(params, taskType)
            .then(resp => {
                if (resp) {
                    // resp.sort(function(a,b){
                    //     return new Date(b.created_at) - new Date(a.created_at);
                    //   });
                    dispatch(success(resp, taskType));
                } else {
                    dispatch(failure('error', taskType));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()), taskType);
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request(params, taskType) { return { type: taskConstants.LOAD_MORE_TASKS_REQUEST, params, taskType } }
    function success(data, taskType) { return { type: taskConstants.LOAD_MORE_TASKS_SUCCESS, data, taskType } }
    function failure(data, taskType) { return { type: taskConstants.LOAD_MORE_TASKS_FAILURE, data, taskType } }
}

function getTaskFiles(responseFiles) {
    return dispatch => {
        dispatch(request(responseFiles));

        taskService.getTaskFiles(responseFiles)
            .then(resp => {
                if (resp) {
                    dispatch(success(resp));
                } else {
                    dispatch(failure('error'));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request(data) { return { type: taskConstants.GET_TASK_FILES_REQUEST, data } }
    function success(data) { return { type: taskConstants.GET_TASK_FILES_SUCCESS, data } }
    function failure(data) { return { type: taskConstants.GET_TASK_FILES_FAILURE, data } }
}

function saveFilePaths(data) {
    return dispatch => {
        dispatch(save(data));
    };

    function save(data) { return { type: taskConstants.SAVE_FILE_PATHS, data } }
}

function updateCategory(category) {
    return dispatch => {
        updateCategory(category);
    };

    function updateCategory(category) { return { type: taskConstants.UPDATE_CATEGORY, category } }
}

function markAsViewed(id, service) {
    return dispatch => {
        dispatch(request());

        taskService.markAsViewed(id,service)
            .then(resp => {
                if (resp) {
                    dispatch(success(resp));
                } else {
                    dispatch(failure('error'));
                    dispatch(alertActions.error('Error'));
                }
            }, error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }


    function request() { return { type: taskConstants.MARK_AS_VIEWED_REQUEST } }
    function success(data) { return { type: taskConstants.MARK_AS_VIEWED_SUCCESS, data } }
    function failure(data) { return { type: taskConstants.MARK_AS_VIEWED_FAILURE, data } }
}





