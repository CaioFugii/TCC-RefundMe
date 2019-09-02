import apiGaia from '../../../services/apiGaia';

import { Login } from '../../../models/Login';
// import { OnBoarding } from './types';

const code = 'code=HAmvd8mGGVx8VxewVqRX6zOiIYMleG5OfOw93pJSLSQzTyZsllJsvg==';


export const login = async (user: Login) => {
  try {
    let response: any = await apiGaia.post(`/users/login?${code}`, user, {
      headers: { 'x-system-access': 'STARK' }
    });
    response = response.data;
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) return null;
      throw Error(error.response.data.message);
    }
    throw Error(error.message);
  }
};

// export const sendConfirmation = async (onboarding: OnBoarding) => {
//   try {
//     return await apiIsis.post(`/onboarding/${onboarding.id}/emails/${onboarding.id}/sendVerification`)
//       .then(response => response.status === 204);
//   } catch (error) {
//     const message = error.response ? error.response.data.message : error.message;
//     throw Error(message);
//   }
// };
