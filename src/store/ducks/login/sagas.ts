import {
  call, put, select, take, fork
} from 'redux-saga/effects';
import { decode } from 'jsonwebtoken';

import {
  loginSuccess,
  loginFailure,
  onboarding,
} from './actions';
import * as service from './services';

import { login as storeLogin } from '../../../services/auth';
import { Token } from '../../../models/token';
import { Account } from '../../../models/Account'

import { LoginTypes } from '../login/types';
import { getUserLogin } from '../../selectors';
import { account, accountSuccess } from '../account/actions';
import { alert, toggleLoader } from '../app/actions';
import { DeviceInfo } from '../../../models/DeviceInfo';


function decodeToken(token: string) {
  const tokenDecoded = decode(token) as Record<string, any>;
  if (!tokenDecoded) throw Error('Invalid Token');
  return tokenDecoded;
}

function* loginCredentials(username: string, password: string, deviceInfo: DeviceInfo) {
  try {
    yield put(toggleLoader(true));

    const token = yield call(service.login, { username, password, deviceInfo });

    if (token) {
      const tokenDecoded = decodeToken(token);
      yield put(accountSuccess(tokenDecoded.user));
      yield put(loginSuccess(tokenDecoded.user));
      yield call(storeLogin, token);
      yield put(toggleLoader(false));

      return token;
    } else {
      yield put(toggleLoader(false));

      return yield put(loginFailure('No token provided'));
    }
  } catch (error) {
    yield put(toggleLoader(false));

    return yield put(loginFailure(error.message));
  }
}

export function* login(username: string, password: string, deviceInfo: DeviceInfo) {
  yield put(toggleLoader(true));
  const token = yield call(loginCredentials, username, password, deviceInfo);
  if (token.type === LoginTypes.LOGIN_FAILURE) return null;
  // const userData: Account = yield select(getUserLogin);
  // yield put(accountSuccess(userData))
  // yield put(account(userData));
  // put(toggleLoader(false))
}

// export function* sendConfirmation(data: any) {
//   try {
//     yield call(service.sendConfirmation, data);
//     return yield put(alert({ text: 'Successfully resent email!' }));
//   } catch (error) {
//     return yield put(alert({ text: error.message }));
//   }
// }
