import { Account } from '../models/Account'

export interface Token {
    iat: number;
    exp: number;
    user: Account
  }
