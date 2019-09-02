import { LoginTypes } from '../login/types';

import { Login } from './../../../models/Login'

import { Account } from '../../../models';

export const login = (payload: Login) => ({
  type: LoginTypes.LOGIN, payload,
});
export const loginSuccess = (payload: Account) => ({
  type: LoginTypes.LOGIN_SUCCESS, payload,
});
export const loginFailure = (payload: string) => ({
  type: LoginTypes.LOGIN_FAILURE, payload,
});
export const onboarding = (payload: Login) => ({
  type: LoginTypes.ONBOARDING, payload,
});
export const logout = () => ({
  type: LoginTypes.LOGOUT,
});
export const sendConfirmation = (payload: Login) => ({
  type: LoginTypes.SEND_CONFIRMATION, payload,
});
