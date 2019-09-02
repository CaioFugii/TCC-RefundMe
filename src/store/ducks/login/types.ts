import { Token, Account } from '../../../models';

export enum LoginTypes {
  LOGIN = '@login/LOGIN',
  LOGIN_SUCCESS = '@login/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@login/LOGIN_FAILURE',
  ONBOARDING = '@login/ONBOARDING',
  LOGOUT = '@login/LOGOUT',
  SEND_CONFIRMATION = '@login/SEND_CONFIRMATION',
}

export interface LoginState {
  readonly data: Account;
  readonly loading: boolean;
  readonly isLoggedIn: boolean,
  readonly error: string;
}
