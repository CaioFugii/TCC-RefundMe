import { RefundsTypes } from './types';
import { ExpensesModel } from '../../../models/Expenses';
import { RefundsModel } from '../../../models/Refunds';


export const refundsRequest = () =>
    ({ type: RefundsTypes.LOAD_REQUEST });

export const refundsSuccess = (data: RefundsModel[]) =>
    ({ type: RefundsTypes.LOAD_SUCCESS, payload: data });

export const refundsFailure = (error: string) =>
    ({ type: RefundsTypes.LOAD_FAILURE, error });

export const refundsAllRequest = () =>
    ({ type: RefundsTypes.LOAD_ALL_REQUEST });

export const refundsAllSuccess = (data: RefundsModel[]) =>
    ({ type: RefundsTypes.LOAD_ALL_SUCCESS, payload: data });

export const refundsAllFailure = (error: string) =>
    ({ type: RefundsTypes.LOAD_ALL_FAILURE, error });

export const updateRefund = (data: RefundsModel) =>
    ({ type: RefundsTypes.UPDATE_REFUND, data })

export const updateRefundSuccess = (data: RefundsModel) =>
    ({type: RefundsTypes.UPDATE_REFUND_SUCCESS, data})

export const updateRefundFailure = (error: string) =>
    ({type: RefundsTypes.UPDATE_REFUND_FAILURE, error})
