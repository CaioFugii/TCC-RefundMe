import { call, put } from 'redux-saga/effects';

import {
  accountSuccess,
  accountFailure,
} from './actions';

import * as service from './services';

import { toggleLoader } from '../app/actions';
import { Account } from '../../../models';

export function* account(user: Account) {
  try {
    yield put(toggleLoader(true));
    const data = yield call(service.get, user);

    data.roles = data.roles.reduce((prev:any, next: any) => prev.concat(next.systemRoles),[]);
    // console.log(data);
    yield put(toggleLoader(false));
    yield put(accountSuccess(data));
    return
  } catch (error) {
    yield put(toggleLoader(false));
    return yield put(accountFailure(error.message));

  }
}
