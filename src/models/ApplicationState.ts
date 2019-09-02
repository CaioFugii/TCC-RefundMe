import { LoginState } from '../store/ducks/login/types';
import { AccountState } from '../store/ducks/account/types';
import { AppReducerState } from '../store/ducks/app/types';
import { ExpenseListState } from '../store/ducks/expenses/types';
import { RefundsState } from '../store/ducks/refunds/types';

export interface ApplicationState {
  app: AppReducerState;
  login: LoginState;
  account: AccountState;
  expenses: ExpenseListState;
  refunds: RefundsState;
}
