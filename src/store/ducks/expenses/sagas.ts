import {
    call, put, select, take, fork
} from 'redux-saga/effects';

import {
    loadSuccess, loadFailure, removeExpenseSuccess, removeExpenseFailure, expenseAllSuccess, expenseAllFailure
} from './actions';

import * as service from './services';
import { ExpensesModel } from '../../../models/Expenses';
import { RefundsModel } from '../../../models/Refunds';
import { RefundsForApproval } from '../../../models/RefundsForApproval';
import { refundsRequest, refundsFailure, refundsSuccess } from '../refunds/actions';
import { getRefunds } from '../refunds/services';
import { toggleLoader } from '../app/actions';

export function* getExpenses() {
    try {
        yield put(toggleLoader(true));

        const expenses = yield call(service.getExpenses);
        if (!expenses) {
            yield put(toggleLoader(false));

            yield put(loadFailure('Falha ao carregar despesas'))
            return null;
        } else {
            yield put(toggleLoader(false));

            return yield put(loadSuccess(expenses));
        }
    } catch (error) {
        yield put(toggleLoader(false));

        yield put(loadFailure('Falha ao carregar despesas'))
        return null;
    }
}

export function* getAllExpenses() {
    try {
        yield put(toggleLoader(true));

        const expenses = yield call(service.getAllExpenses);
        if (!expenses) {
            yield put(toggleLoader(false));

            yield put(expenseAllFailure('Falha ao carregar todas as despesas'))
            return null;
        } else {
            yield put(toggleLoader(false));

            return yield put(expenseAllSuccess(expenses));
        }
    } catch (error) {
        yield put(toggleLoader(false));

        yield put(expenseAllFailure('Falha ao carregar todas as despesas'))
        return null;
    }
}

export function* createExpense(data: ExpensesModel) {
    try {
        yield call(service.createExpenses, data);
        yield put(toggleLoader(true));

        const expenses = yield call(service.getExpenses)
        if (!expenses) {
            yield put(toggleLoader(false));

            yield put(loadFailure('Falha ao carregar despesas'))
            return null;
        } else {
            yield put(toggleLoader(false));

            return yield put(loadSuccess(expenses));
        }
    } catch (error) {
        yield put(toggleLoader(false));

        yield put(loadFailure('Falha ao carregar despesas'))
        return null;
    }
}

export function* createRefunds(data: RefundsModel) {
    try {
        yield put(toggleLoader(true));

        yield call(service.createRefunds, data);
        const expenses = yield call(service.getExpenses)
        if (!expenses) {
            yield put(toggleLoader(false));

            yield put(loadFailure('Falha ao carregar despesas'))
            return null;
        } else {
            yield put(toggleLoader(false));

            return yield put(loadSuccess(expenses));
        }
    } catch (error) {
        yield put(toggleLoader(false));

        yield put(loadFailure('Falha ao carregar despesas'))
        return null;
    }
}

export function* refundsApproved(data: any) {
    try {
        yield put(toggleLoader(true));

        yield call(service.refundsApproved, data);
        const refunds = yield call(getRefunds);
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

export function* removeExpense(id: string) {
    try {
        yield put(toggleLoader(true));
        yield call(service.removeExpense, id);
        const expenses = yield call(service.getExpenses)
        if (!expenses) {
            yield put(toggleLoader(false));
            yield put(loadFailure('Falha ao carregar despesas'))

            return null;
        } else {
            yield put(toggleLoader(false));

            return yield put(loadSuccess(expenses));
        }
    } catch (error) {
        yield put(toggleLoader(false));

        return yield put(removeExpenseFailure(error.message));
    }
}

export function* updateExpense(id: string, expense: ExpensesModel) {
    try {
        yield put(toggleLoader(true));

        yield call(service.updateExpense, id, expense);
        const expenses = yield call(service.getExpenses)
        if (!expenses) {
            yield put(toggleLoader(false));

            yield put(loadFailure('Falha ao carregar despesas'))
            return null;
        } else {
            yield put(toggleLoader(false));

            return yield put(loadSuccess(expenses));
        }
    } catch (error) {
        yield put(toggleLoader(false));
        yield put(loadFailure('Falha ao carregar despesas'))
        return null;
    }
}

export function* removeRefund(id: string) {
    try {
        yield put(toggleLoader(true));
        yield call(service.removeRefund, id);
        const refunds = yield call(getRefunds);
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

        return yield put(removeExpenseFailure(error.message));
    }
}
