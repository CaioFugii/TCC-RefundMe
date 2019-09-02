import { Reducer } from 'redux';

import { LoginState, LoginTypes } from '../login/types';

import { Token, Account } from '../../../models';
import { isAuthenticated, getUser } from '../../../services/auth';


const INITIAL_USER: Account = {
    _id: '',
    email: '',
    username:'',
    isActive:true,
    name: '',
    roles: [],
};

const INITIAL_STATE: LoginState = {
  data: INITIAL_USER,
  loading: false,
  isLoggedIn: isAuthenticated(),
  error: '',
};

const reducer: Reducer<LoginState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoginTypes.LOGIN:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case LoginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoggedIn: true,
        loading: false,
      };
    case LoginTypes.LOGIN_FAILURE:
      return {
        ...state,
        data: INITIAL_USER,
        isLoggedIn: false,
        loading: false,
        error: action.payload,
      }
    case LoginTypes.LOGOUT:
      return {
        ...state,
        data: INITIAL_USER,
        isLoggedIn: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
