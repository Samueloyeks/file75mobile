import { taskConstants } from '../constants';

const GET_TASKS_REQUEST = taskConstants.GET_TASKS_REQUEST
const GET_TASKS_FAILURE = taskConstants.GET_TASKS_FAILURE
const GET_TASKS_SUCCESS = taskConstants.GET_TASKS_SUCCESS

const GET_TASK_FILES_REQUEST = taskConstants.GET_TASK_FILES_REQUEST
const GET_TASK_FILES_FAILURE = taskConstants.GET_TASK_FILES_FAILURE
const GET_TASK_FILES_SUCCESS = taskConstants.GET_TASK_FILES_SUCCESS

const SILENTLY_GET_TASKS_REQUEST = taskConstants.SILENTLY_GET_TASKS_REQUEST
const SILENTLY_GET_TASKS_FAILURE = taskConstants.SILENTLY_GET_TASKS_FAILURE
const SILENTLY_GET_TASKS_SUCCESS = taskConstants.SILENTLY_GET_TASKS_SUCCESS

const LOAD_MORE_TASKS_REQUEST = taskConstants.LOAD_MORE_TASKS_REQUEST
const LOAD_MORE_TASKS_FAILURE = taskConstants.LOAD_MORE_TASKS_FAILURE
const LOAD_MORE_TASKS_SUCCESS = taskConstants.LOAD_MORE_TASKS_SUCCESS

const MARK_AS_VIEWED_REQUEST = taskConstants.MARK_AS_VIEWED_REQUEST
const MARK_AS_VIEWED_FAILURE = taskConstants.MARK_AS_VIEWED_FAILURE
const MARK_AS_VIEWED_SUCCESS = taskConstants.MARK_AS_VIEWED_SUCCESS

const SAVE_FILE_PATHS = taskConstants.SAVE_FILE_PATHS



export function taskReducer(state = {
    loading: false,
    loadingMore: false,
    refreshing: false,
    loadingPendingTasks: false,
    loadingMorePendingTasks: false,
    refreshingPendingTasks: false,
    loadingApprovedTasks: false,
    loadingMoreApprovedTasks: false,
    refreshingApprovedTasks: false,
    loadingDeclinedTasks: false,
    loadingMoreDeclinedTasks: false,
    refreshingDeclinedTasks: false,
    params: {
        associations: ["status", "category"],
        page: 1,
        perPage: 4,
        search: null,
        byUserId: null,
        byStatusCode: null,
        byCategorycode: null,
    },
    extraParams: {
        approvedTasksPage: 1,
        pendingTasksPage: 1,
        declinedTasksPage: 1
    },
    total: 0,
    tasks: [],
    pendingTasks: [],
    approvedTasks: [],
    declinedTasks: [],
    gettingFiles: false,
    filePaths: [],
    files: []
}, action) {
    switch (action.type) {
        case GET_TASKS_REQUEST:
            return {
                ...state,
                // loading 
                loading: true,
                loadingPendingTasks: action.taskType === 'pending' ? true : false,
                loadingApprovedTasks: action.taskType === 'approved' ? true : false,
                loadingDeclinedTasks: action.taskType === 'declined' ? true : false,
                // tasks 
                tasks: state.params.page === 1 ? [] : state.tasks,
                pendingTasks: action.taskType === 'pending' ? (state.extraParams.pendingTasksPage === 1 ? [] : state.pendingTasks) : state.pendingTasks,
                approvedTasks: action.taskType === 'approved' ? (state.extraParams.approvedTasksPage === 1 ? [] : state.approvedTasks) : state.approvedTasks,
                declinedTasks: action.taskType === 'declined' ? (state.extraParams.declinedTasksPage === 1 ? [] : state.declinedTasks) : state.declinedTasks,

                params: state.params
            }
        case GET_TASKS_FAILURE:
            return {
                ...state,
                // loading 
                loading: false,
                loadingPendingTasks: action.taskType === 'pending' ? false : false,
                loadingApprovedTasks: action.taskType === 'approved' ? false : false,
                loadingDeclinedTasks: action.taskType === 'declined' ? false : false,

                params: state.params
            }
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                // loading 
                loading: false,
                loadingMore: false,
                loadingPendingTasks: false,
                loadingApprovedTasks: false,
                loadingDeclinedTasks: false,

                loadingMorePendingTasks: action.taskType === 'pending' ? false : false,
                loadingMoreApprovedTasks: action.taskType === 'approved' ? false : false,
                loadingMoreDeclinedTasks: action.taskType === 'declined' ? false : false,
                // tasks 
                tasks: state.params.page === 1 ? action.data : [...action.data, ...state.tasks],
                pendingTasks: action.taskType === 'pending' ? (state.extraParams.pendingTasksPage === 1 ? action.data : [...action.data, ...state.pendingTasks]) : state.pendingTasks,
                approvedTasks: action.taskType === 'approved' ? (state.extraParams.approvedTasksPage === 1 ? action.data : [...action.data, ...state.approvedTasks]) : state.approvedTasks,
                declinedTasks: action.taskType === 'declined' ? (state.extraParams.declinedTasksPage === 1 ? action.data : [...action.data, ...state.declinedTasks]) : state.declinedTasks,

                params: state.params,
            }
        case SILENTLY_GET_TASKS_REQUEST:
            return {
                ...state,
                // refreshing 
                refreshing: true,
                refreshingPendingTasks: action.taskType === 'pending' ? true : false,
                refreshingApprovedTasks: action.taskType === 'approved' ? true : false,
                refreshingDeclinedTasks: action.taskType === 'declined' ? true : false,
                // tasks 
                tasks: [],
                pendingTasks: action.taskType === 'pending' ? [] : state.pendingTasks,
                approvedTasks: action.taskType === 'approved' ? [] : state.approvedTasks,
                declinedTasks: action.taskType === 'declined' ? [] : state.declinedTasks,

                params: state.params
            }
        case SILENTLY_GET_TASKS_FAILURE:
            return {
                ...state,
                // refreshing 
                refreshing: false,
                refreshingPendingTasks: false,
                refreshingApprovedTasks: false,
                refreshingDeclinedTasks: false,

                params: state.params
            }
        case SILENTLY_GET_TASKS_SUCCESS:
            return {
                ...state,
                // refreshing 
                refreshing: false,
                refreshingPendingTasks: false,
                refreshingApprovedTasks: false,
                refreshingDeclinedTasks: false,
                // loading 
                loading: false,
                loadingPendingTasks: false,
                loadingApprovedTasks: false,
                loadingDeclinedTasks: false,
                // tasks 
                tasks: state.params.page === 1 ? action.data : [...action.data, ...state.tasks],
                pendingTasks: action.taskType === 'pending' ? (state.extraParams.pendingTasksPage === 1 ? action.data : [...action.data, ...state.pendingTasks]) : state.pendingTasks,
                approvedTasks: action.taskType === 'approved' ? (state.extraParams.approvedTasksPage === 1 ? action.data : [...action.data, ...state.approvedTasks]) : state.approvedTasks,
                declinedTasks: action.taskType === 'declined' ? (state.extraParams.declinedTasksPage === 1 ? action.data : [...action.data, ...state.declinedTasks]) : state.declinedTasks,

                params: state.params,
            }
        case LOAD_MORE_TASKS_REQUEST:
            return {
                ...state,
                // loading 
                loadingMore: true,
                loadingMorePendingTasks: action.taskType === 'pending' ? true : false,
                loadingMoreApprovedTasks: action.taskType === 'approved' ? true : false,
                loadingMoreDeclinedTasks: action.taskType === 'declined' ? true : false,

                params: state.params
            }
        case LOAD_MORE_TASKS_FAILURE:
            return {
                ...state,
                // loading 
                loadingMore: false,
                loadingMorePendingTasks: false,
                loadingMoreApprovedTasks: false,
                loadingMoreDeclinedTasks: false,

                params: state.params
            }
        case LOAD_MORE_TASKS_SUCCESS:
            return {
                ...state,
                // loading 
                loadingMore: false,
                loading: false,
                loadingPendingTasks: false,
                loadingApprovedTasks: false,
                loadingDeclinedTasks: false,
                loadingMorePendingTasks: false,
                loadingMoreApprovedTasks: false,
                loadingMoreDeclinedTasks: false,
                // tasks 
                tasks: state.page === 1 ? action.data : [...action.data, ...state.tasks],
                pendingTasks: action.taskType === 'pending' ? (state.extraParams.pendingTasksPage === 1 ? action.data : [...action.data, ...state.pendingTasks]) : state.pendingTasks,
                approvedTasks: action.taskType === 'approved' ? (state.extraParams.approvedTasksPage === 1 ? action.data : [...action.data, ...state.approvedTasks]) : state.approvedTasks,
                declinedTasks: action.taskType === 'declined' ? (state.extraParams.declinedTasksPage === 1 ? action.data : [...action.data, ...state.declinedTasks]) : state.declinedTasks,

                params: state.params,
            }
        case SAVE_FILE_PATHS:
            return {
                ...state,
                filePaths: action.data
            }
        case GET_TASK_FILES_REQUEST:
            return {
                ...state,
                gettingFiles: true,
            }
        case GET_TASK_FILES_FAILURE:
            return {
                ...state,
                gettingFiles: false,
            }
        case GET_TASK_FILES_SUCCESS:
            return {
                ...state,
                gettingFiles: false,
                files: action.data
            }
        default:
            return state
    }
}
