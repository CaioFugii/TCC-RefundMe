import { ExpensesModel } from "./Expenses";

export interface UseExpensesHook {
    loading: boolean;
    data: ExpensesModel[];
  }
  