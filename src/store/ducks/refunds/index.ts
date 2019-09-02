import { Reducer } from 'redux';
import { RefundsTypes, RefundsState } from './types'
import { RefundsModel } from '../../../models/Refunds';


const INITIAL_REFUNDS: RefundsModel = {
    title: '',
    personInCharge: {
        _id: '',
        name: '',
        email: '',
    },
    owner: {
        name: '',
        email: ''
    },
    refunds: []
}

const INITIAL_STATE: RefundsState = {
    data: [],
    loading: false,
    error: ''
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RefundsTypes.LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case RefundsTypes.LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case RefundsTypes.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: ''
            };
        case RefundsTypes.LOAD_ALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case RefundsTypes.LOAD_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case RefundsTypes.LOAD_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: ''
            };
        case RefundsTypes.UPDATE_REFUND:
            return {
                ...state,
                loading: true
            };
        case RefundsTypes.UPDATE_REFUND_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            };
        case RefundsTypes.UPDATE_REFUND_FAILURE:
            return {
                ...state,
                data: INITIAL_REFUNDS,
                loading: false,
                error: action.data
            };
        default:
            return state
    };
}

export default reducer
