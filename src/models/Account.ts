import { ObjectID } from 'mongodb';

export interface Account {
  _id: string;
  name: string;
  username:string;
  isActive:boolean;
  email: string;
  roles: string[];
}

export interface Expenses {
  id: string | ObjectID;
  value: number;
  classification:string;
  description:string;
  file:string;
  owner: string | ObjectID;
  createdAt: Date;
  updatedAt: Date;
}

export interface Refunds {
  id: string | ObjectID;
  value: number;
  responsible:string;
  createdAt: Date;
  updatedAt: Date;
}

