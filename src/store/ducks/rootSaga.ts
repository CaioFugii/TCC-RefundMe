import { all, call, cancel, fork, take, select, put } from "redux-saga/effects";
import { AccountTypes } from "./account/types";
import { logout as clearLogin, getUser } from "../../services/auth";
import { login } from "./login/sagas";
import { account } from "./account/sagas";
import { alert } from "./app/sagas";
import { LoginTypes } from "./login/types";
import { AppTypes } from "./app/types";
import { ExpensesListTypes } from "../ducks/expenses/types";
import { RefundsTypes } from "./refunds/types";
import { getIsLoggedIn } from "../selectors";
import { Token } from "../../models";
import {
  getExpenses,
  createExpense,
  createRefunds,
  refundsApproved,
  removeExpense,
  updateExpense,
  removeRefund,
  getAllExpenses
} from "./expenses/sagas";
import { ExpensesModel } from "../../models/Expenses";
import { RefundsModel } from "../../models/Refunds";
import { getRefunds, getAllRefunds } from "./refunds/sagas";
import { clearStatus } from "./account/actions";
import { updateRefund } from "./refunds/sagas";

function* watchLogin() {
  while (true) {
    const {
      payload: { username, password, deviceInfo }
    } = yield take(LoginTypes.LOGIN);
    const task = yield call(login, username, password, deviceInfo);
    const action = yield take([LoginTypes.LOGOUT, LoginTypes.LOGIN_FAILURE]);
    if (action.type === LoginTypes.LOGOUT) {
      yield cancel(task);
      yield call(clearLogin);
      yield call(clearStatus);
    } // yield call(clearStatus);c
  }
}

function* watchLogout() {
  while (true) {
    yield take(LoginTypes.LOGOUT);
    yield call(clearLogin);
  }
}

function* watchAccount() {
  while (true) {
    const isLoggedIn = yield select(getIsLoggedIn);
    let token: Token;
    if (isLoggedIn) {
      token = getUser() as Token;
    } else {
      ({ payload: token } = yield take(LoginTypes.LOGIN));
    }
    // console.log(token);
    yield fork(account, token.user);
    yield take(AccountTypes.LOGOUT);
    yield call(clearLogin);
  }
}

function* watchPostExpense() {
  while (true) {
    let data: ExpensesModel;
    ({ payload: data } = yield take(ExpensesListTypes.POST_EXPENSE_REQUEST));
    yield call(createExpense, data);
  }
}

function* watchPostRefund() {
  while (true) {
    let data: RefundsModel;
    ({ payload: data } = yield take(ExpensesListTypes.POST_REFUND_REQUEST));
    yield call(createRefunds, data);
  }
}

function* watchPostApprovedRefunds() {
  while (true) {
    let data: any;
    ({ payload: data } = yield take(ExpensesListTypes.POST_APPROVED_REQUEST));
    yield call(refundsApproved, data);
  }
}

function* watchExpenses() {
  while (true) {
    yield take(ExpensesListTypes.LOAD_REQUEST);
    yield call(getExpenses);
  }
}

function* watchAllExpenses() {
  while (true) {
    yield take(ExpensesListTypes.LOAD_ALL_REQUEST);
    yield call(getAllExpenses);
  }
}

function* watchUpdateExpense() {
  while (true) {
    const { data } = yield take(ExpensesListTypes.UPDATE_EXPENSE);
    const _id = data._id;
    const expense = data;

    console.log(data);
    yield fork(updateExpense, _id, expense);
  }
}


function* watchUpdateRefund() {
  while (true) {
    const { data } = yield take(RefundsTypes.UPDATE_REFUND);
    const _id = data._id;
    const refund = data;

    console.log(data);
    yield fork(updateRefund, _id, refund);
  }
}

function* watchRemoveExpense() {
  while (true) {
    const { data: id } = yield take(ExpensesListTypes.REMOVE_EXPENSE);
    yield fork(removeExpense, id);
  }
}
function* watchRemoveRefund() {
  while (true) {
    const { data: id } = yield take(ExpensesListTypes.REMOVE_REFUND);
    yield fork(removeRefund, id);
  }
}

function* watchRefunds() {
  while (true) {
    yield take(RefundsTypes.LOAD_REQUEST);
    yield call(getRefunds);
  }
}

function* watchAllRefunds() {
  while(true) {
    yield take(RefundsTypes.LOAD_ALL_REQUEST);
    yield call(getAllRefunds)
  }
}

function* watchUpdateAlert() {
  while (true) {
    const { payload } = yield take(AppTypes.ALERT);
    yield fork(alert, payload);
  }
}

export default function* rootSaga() {
  return yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchAccount),
    fork(watchExpenses),
    fork(watchAllExpenses),
    fork(watchRemoveExpense),
    fork(watchUpdateAlert),
    fork(watchPostExpense),
    fork(watchPostRefund),
    fork(watchRefunds),
    fork(watchAllRefunds),
    fork(watchPostApprovedRefunds),
    fork(watchUpdateExpense),
    fork(watchUpdateRefund),
    fork(watchRemoveRefund)
  ]);
}
