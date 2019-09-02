import apiGaia from '../../../services/apiGaia';

import { Token } from '../../../models/token';

import { Account } from '../../../models/Account';

const code = 'code=HAmvd8mGGVx8VxewVqRX6zOiIYMleG5OfOw93pJSLSQzTyZsllJsvg==';

export const get = async (token: Account) => {
  try {
    //@ts-ignore
    const { data } = await apiGaia.get(`/users/${token.id}?${code}`);
    return data as Account;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};
