import { ExpensesModel } from '../models/Expenses'

interface Users {
  _id:string,
  name:string,
  email:string,

}

export interface RefundsModel {
  _id?: string,
  title: string,
  personInCharge: Users,
  owner: any
  refunds: string[],
  createdAt?: string,
  status?: string,
  checked?: boolean,
  datePayment?: any
}