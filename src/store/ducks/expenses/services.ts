import apiStark from '../../../services/apiStark'
import { isAuthenticated, getUser } from '../../../services/auth'
import { ExpensesModel } from '../../../models/Expenses';
import { RefundsModel } from '../../../models/Refunds';


export const getExpenses = async () => {
  const loggedUser = isAuthenticated();
  const userData = getUser();

  //@ts-ignore
  const userId = userData.user.id
  if (loggedUser) {
    const url = `/expenses?owner._id=${userId}&sort=-date`;

    const result = await apiStark.get(url);
    return result.data;
  }
};

export const getAllExpenses = async () => {
  const loggedUser = isAuthenticated();

  if (loggedUser) {
    const url = `/expenses?populate=refunds`;
    const result = await apiStark.get(url);
    return result.data;
  }
}

export const createExpenses = async (data: ExpensesModel) => {
  const loggedUser = isAuthenticated();

  if (loggedUser) {
    const url = `/create-expenses`;
    const result = await apiStark.post(url, data);
    return result.data;
  }
}

export const createRefunds = async (data: RefundsModel) => {
  const loggedUser = isAuthenticated();

  if (loggedUser) {
    const url = `/create-refunds`;
    const result = await apiStark.post(url, data);
    return result.data;
  }
}

export const refundsApproved = async (data: any) => {
  const loggedUser = isAuthenticated();

  if (loggedUser) {
    const url = `/update-refunds`;
    const result = await apiStark.put(url, data);
    return result.data;
  }
}

export const removeExpense = async (id: string) => {
  try {
    const { data } = await apiStark.delete(`/expense/${id}`);
    return data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const updateExpense = async (id: string, expense: any) => {
  try {
    const data = await apiStark.put(`/expense/update/${id}`, expense);
    return data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const removeRefund = async (id: string) => {
  try {
    const { data } = await apiStark.delete(`/refund/${id}`);
    return data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};