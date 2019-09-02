import { Reducer } from 'redux';
import { AccountState, AccountTypes } from './types';
import { Account } from '../../../models';
import { isAuthenticated } from '../../../services/auth';
import { actionChannel } from 'redux-saga/effects';


const INITIAL_ACCOUNT: Account = {
  _id:'',
  name: '',
  isActive: true,
  username:'',
  email: '',
  roles: [],
  // expenses: [],
  // refunds: []
};


const INITIAL_STATE: AccountState = {
  data: INITIAL_ACCOUNT,
  isLoggedIn: isAuthenticated(),
  updated: false,
  loading: false,
  error: ''
};


const reducer: Reducer<AccountState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AccountTypes.ACCOUNT:
      return {
        ...state,
        loading: true
      };
    case AccountTypes.ACCOUNT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoggedIn: true,
        loading: false
      };
    case AccountTypes.ACCOUNT_FAILURE:
      return {
        ...state,
        data: INITIAL_ACCOUNT,
        loading: false,
        error: action.payload
      };
    case AccountTypes.CLEAR_STATUS:
      return {
        ...state,
        loading: false,
        updated: false,
        error: ''
      };
    case AccountTypes.LOGOUT:
      return {
        ...state,
        data: INITIAL_ACCOUNT,
        isLoggedIn: false,
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};

export default reducer;
