import { ExpensesModel } from '../models/Expenses'

export interface RefundsForApproval {
    whoApproved:any
    refunds:ExpensesModel[],
    createdAt?:string,
    approved: boolean
  }