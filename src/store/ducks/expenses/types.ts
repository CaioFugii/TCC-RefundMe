import { ExpensesModel } from '../../../models/Expenses';

export enum ExpensesListTypes {
  LOAD_REQUEST = '@expensesList/LOAD_REQUEST',
  LOAD_SUCCESS = '@expensesList/LOAD_SUCCESS',
  LOAD_FAILURE = '@expensesList/LOAD_FAILURE',
  LOAD_ALL_REQUEST = '@expensesList/LOAD_ALL_REQUEST',
  LOAD_ALL_SUCCESS = '@expensesList/LOAD_ALL_SUCCESS',
  LOAD_ALL_FAILURE = '@expensesList/LOAD_ALL_FAILURE',
  POST_EXPENSE_REQUEST = '@expensesList/POST_EXPENSE_REQUEST',
  POST_REFUND_REQUEST = '@expensesList/POST_REFUND_REQUEST',
  POST_APPROVED_REQUEST = '@expensesList/POST_APPROVED_REQUEST',
  REMOVE_EXPENSE = '@expensesList/REMOVE_EXPENSE',
  REMOVE_EXPENSE_SUCCESS = '@expensesList/REMOVE_EXPENSE_SUCCESS',
  REMOVE_EXPENSE_FAILURE = '@expensesList/REMOVE_EXPENSE_FAILURE',
  UPDATE_EXPENSE = '@expensesList/UPDATE_EXPENSE',
  UPDATE_EXPENSE_SUCCESS = '@expensesList/UPDATE_EXPENSE_SUCCESS',
  UPDATE_EXPENSE_FAILURE = '@expensesList/UPDATE_EXPENSE_FAILURE',
  REMOVE_REFUND = '@expensesList/REMOVE_REFUND',
  REMOVE_REFUND_SUCCESS = '@expensesList/REMOVE_REFUND_SUCCESS',
  REMOVE_REFUND_FAILURE = '@expensesList/REMOVE_REFUND_FAILURE',
}

export interface ExpenseListState {
  readonly data: ExpensesModel[]
  readonly loading: boolean;
  readonly error: string;
}