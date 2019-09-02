import * as jwt from 'jsonwebtoken';
import { StorageType } from '../models/Storage';
import { Token } from '../models/token';

export const getToken = () => {
  const token = localStorage.getItem(StorageType.USER_TOKEN);
  if (!token) return null;

  const tokenDecoded = jwt.decode(token);
  const { exp } = tokenDecoded as Record<string, any>;
  const currentTime = Date.now() / 1000;
  if (currentTime > exp) {
    localStorage.removeItem('token');
    return null;
  }

  return token;
};

export const isAuthenticated = () => getToken() !== null;

export const login = (token: string) => localStorage.setItem(StorageType.USER_TOKEN, token);

export const logout = () => localStorage.removeItem('token');

export const getUser = () => {
  const token = getToken();
  if (!token) return null;

  const tokenDecoded = jwt.decode(token);
  
  if (tokenDecoded) return tokenDecoded as Token;

  return null;
};
