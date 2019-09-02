import { AccountTypes } from './types';
import { Token, Account } from '../../../models';

export const account = (payload: Account) => ({
  type: AccountTypes.ACCOUNT,
  payload,
});

export const accountSuccess = (payload: Account) => ({
  type: AccountTypes.ACCOUNT_SUCCESS,
  payload,
});
export const accountFailure = (payload: string) => ({
  type: AccountTypes.ACCOUNT_FAILURE,
  payload,
});
export const clearStatus = () => ({
  type: AccountTypes.CLEAR_STATUS
});

