import apiStark from '../../../services/apiStark'
import { isAuthenticated, getUser } from '../../../services/auth'


export const getRefunds = async () => {
  const loggedUser = isAuthenticated();
  const userData = getUser();

  //@ts-ignore
  const userId = userData.user.id
  // console.log(userId);
  if (loggedUser) {
    const url = `/refunds?owner._id=${userId}&populate=refunds`;
    const result = await apiStark.get(url);
    return result.data;
  }
};

export const getAllRefunds = async () => {
  const loggedUser = isAuthenticated();

  if (loggedUser) {
    const url = `/refunds?populate=refunds`;
    const result = await apiStark.get(url);
    return result.data;
  }
}

export const updateRefund = async (id: string, refund: any) => {
  try {
    // console.log(refund);
    const data = await apiStark.put(`/refunds/update/${id}`, refund);
    return data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};