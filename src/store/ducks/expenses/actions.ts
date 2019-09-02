import { ExpensesListTypes } from "./types";
import { ExpensesModel } from "../../../models/Expenses";
import { RefundsModel } from "../../../models/Refunds";

export const loadRequest = () => ({ type: ExpensesListTypes.LOAD_REQUEST });

export const loadSuccess = (data: ExpensesModel[]) => ({
  type: ExpensesListTypes.LOAD_SUCCESS,
  payload: data
});

export const loadFailure = (error: string) => ({
  type: ExpensesListTypes.LOAD_FAILURE,
  error
});

export const expenseAllRequest = () =>
  ({ type: ExpensesListTypes.LOAD_ALL_REQUEST });

export const expenseAllSuccess = (data: ExpensesModel[]) =>
  ({ type: ExpensesListTypes.LOAD_ALL_SUCCESS, payload: data });

export const expenseAllFailure = (error: string) =>
  ({ type: ExpensesListTypes.LOAD_ALL_FAILURE, error });


export const updateExpense = (data: ExpensesModel) => ({
  type: ExpensesListTypes.UPDATE_EXPENSE,
  data
});

export const updateExpenseSuccess = (data: ExpensesModel) => ({
  type: ExpensesListTypes.UPDATE_EXPENSE_SUCCESS,
  data
});

export const updateExpenseFailure = (error: string) => ({
  type: ExpensesListTypes.UPDATE_EXPENSE_FAILURE,
  error
});

export const postExpenseRequest = (data: ExpensesModel) => ({
  type: ExpensesListTypes.POST_EXPENSE_REQUEST,
  payload: data
});

export const postRefundRequest = (data: RefundsModel) => ({
  type: ExpensesListTypes.POST_REFUND_REQUEST,
  payload: data
});

export const postApprovedRequest = (data: any) => ({
  type: ExpensesListTypes.POST_APPROVED_REQUEST,
  payload: data
});

export const removeExpense = (data: string) => ({
  type: ExpensesListTypes.REMOVE_EXPENSE,
  data
});

export const removeExpenseSuccess = (data: ExpensesModel) => ({
  type: ExpensesListTypes.REMOVE_EXPENSE_SUCCESS,
  data
});

export const removeExpenseFailure = (error: string) => ({
  type: ExpensesListTypes.REMOVE_EXPENSE_FAILURE,
  error
});

export const removeRefund = (data: string) => ({
  type: ExpensesListTypes.REMOVE_REFUND,
  data
});

export const removeRefundSuccess = (data: RefundsModel) => ({
  type: ExpensesListTypes.REMOVE_REFUND_SUCCESS,
  data
});

export const removeRefundFailure = (error: string) => ({
  type: ExpensesListTypes.REMOVE_REFUND_FAILURE,
  error
});
