import { combineReducers } from 'redux';

import login from './login';
import account from './account';
import app from './app';
import expenses from './expenses';
import refunds from './refunds'

export default combineReducers({
  login,
  app,
  account,
  expenses,
  refunds
});
