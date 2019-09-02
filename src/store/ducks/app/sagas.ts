import { put, delay } from 'redux-saga/effects';
import { toggleAlert, AlertParams } from './actions';

export function* alert({ text, className }: AlertParams) {
  yield put(toggleAlert({ show: true, text, className: className || 'bg-success' }));
  yield delay(5000);
  yield put(toggleAlert({ show: false }));
}
