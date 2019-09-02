import axios from 'axios';

import { getToken } from './auth';

const apiGaia = axios.create({
    baseURL: 'https://api-gaia.azurewebsites.net/',
});


apiGaia.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default apiGaia;
