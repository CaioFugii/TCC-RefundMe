import { RefundsModel } from '../../../models/Refunds';

export enum RefundsTypes {
  LOAD_REQUEST = '@refunds/LOAD_REQUEST',
  LOAD_SUCCESS = '@refunds/LOAD_SUCCESS',
  LOAD_FAILURE = '@refunds/LOAD_FAILURE',
  LOAD_ALL_REQUEST = '@refunds/LOAD_ALL_REQUEST',
  LOAD_ALL_SUCCESS = '@refunds/LOAD_ALL_SUCCESS',
  LOAD_ALL_FAILURE = '@refunds/LOAD_ALL_FAILURE',
  UPDATE_REFUND='@refunds/UPDATE_REFUND',
  UPDATE_REFUND_SUCCESS='@refunds/UPDATE_REFUND_SUCCESS',
  UPDATE_REFUND_FAILURE='@refunds/UPDATE_REFUND_FAILURE'
}

export interface RefundsState {
  readonly data: RefundsModel[]
  readonly loading: boolean;
  readonly error: string;
}