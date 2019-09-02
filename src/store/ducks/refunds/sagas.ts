import {
    call, put, select, take, fork
} from 'redux-saga/effects';

import {
    refundsSuccess, refundsFailure, refundsAllSuccess, refundsAllFailure
} from './actions';

import { RefundsModel } from '../../../models/Refunds'

import * as service from './services';
import { toggleLoader } from '../app/actions';


export function* getRefunds() {
    try {
        yield put(toggleLoader(true));
        const refunds = yield call(service.getRefunds);

        if (!refunds) {
            yield put(toggleLoader(false));

            yield put(refundsFailure('Falha ao carregar reembolsos'))
            return null;
        } else {
            yield put(toggleLoader(false));

            return yield put(refundsSuccess(refunds));
        }
    } catch (error) {
        yield put(refundsFailure('Falha ao carregar reembolsos'))
        return null;
    }
}

export function* getAllRefunds() {
    try {
        yield put(toggleLoader(true));
        const refunds = yield call(service.getAllRefunds);
        if (!refunds) {
            yield put(toggleLoader(false));

            yield put(refundsFailure('Falha ao carregar reembolsos'))
            return null;
        } else {
            yield put(toggleLoader(false));

            return yield put(refundsAllSuccess(refunds));
        }
    } catch (error) {
        yield put(toggleLoader(false));

        yield put(refundsAllFailure('Falha ao carregar reembolsos'))
        return null;
    }
}

export function* updateRefund(id: string, refund: RefundsModel) {
    try {
        yield put(toggleLoader(true));

        yield call(service.updateRefund, id, refund);
        const refunds = yield call(service.getRefunds)
        if (!refunds) {
            yield put(toggleLoader(false));

            yield put(refundsFailure('Falha ao carregar reembolsos'))
            return null;
        } else {
            yield put(toggleLoader(false));

            return yield put(refundsSuccess(refunds));
        }
    } catch (error) {
        yield put(toggleLoader(false));

        yield put(refundsFailure('Falha ao carregar reembolsos'))
        return null;
    }
}