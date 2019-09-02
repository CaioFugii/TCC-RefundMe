import { ApplicationState } from '../../models';

export const getUserLogin = (state: ApplicationState) => state.login.data;
export const getIsLoggedIn = (state: ApplicationState) => state.login.isLoggedIn;
  