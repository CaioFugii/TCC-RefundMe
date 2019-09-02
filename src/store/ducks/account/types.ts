import { Account } from '../../../models/Account';


export enum AccountTypes {
  ACCOUNT = '@account/ACCOUNT_REQUEST',
  ACCOUNT_SUCCESS = '@account/ACCOUNT_SUCCESS',
  ACCOUNT_FAILURE = '@account/ACCOUNT_FAILURE',
  CLEAR_STATUS = '@account/CLEAR_STATUS',
  LOGOUT = '@account/LOGOUT'
}

export interface AccountState {
  readonly data: Account;
  readonly isLoggedIn: boolean;
  readonly updated: boolean;
  readonly loading: boolean;
  readonly error: string;
}
