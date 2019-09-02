import { Reducer } from 'redux';
import { ExpensesListTypes, ExpenseListState } from './types'
import { ExpensesModel } from '../../../models/Expenses';


const INITIAL_EXPENSE: ExpensesModel = {
    owner: {
        name: '',
        email: ''
    },
    date: new Date(),
    classification: '',
    value: 0,
    file: '',
    // description: '',
    status: ''
}

const INITIAL_STATE: ExpenseListState = {
    data: [],
    loading: false,
    error: ''
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ExpensesListTypes.LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ExpensesListTypes.LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case ExpensesListTypes.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: ''
            };
        case ExpensesListTypes.LOAD_ALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ExpensesListTypes.LOAD_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case ExpensesListTypes.LOAD_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: ''
            };
        case ExpensesListTypes.POST_EXPENSE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ExpensesListTypes.POST_REFUND_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ExpensesListTypes.POST_APPROVED_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ExpensesListTypes.REMOVE_EXPENSE:
            return {
                ...state,
                loading: true
            };
        case ExpensesListTypes.REMOVE_EXPENSE_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            };
        case ExpensesListTypes.REMOVE_EXPENSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.data
            };
        case ExpensesListTypes.UPDATE_EXPENSE:
            return {
                ...state,
                loading: true
            };
        case ExpensesListTypes.UPDATE_EXPENSE_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            };
        case ExpensesListTypes.UPDATE_EXPENSE_FAILURE:
            return {
                ...state,
                data: INITIAL_EXPENSE,
                loading: false,
                error: action.data
            };
        case ExpensesListTypes.REMOVE_REFUND:
            return {
                ...state,
                loading: true
            };
        case ExpensesListTypes.REMOVE_REFUND_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            };
        case ExpensesListTypes.REMOVE_REFUND_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.data
            };
        default:
            return state
    };
}

export default reducer
