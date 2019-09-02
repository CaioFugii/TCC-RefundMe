import { AppTypes } from './types';

interface ToggleAlertParams {
  className?: string;
  show: boolean;
  text?: string;
}

export interface AlertParams {
  className?: 'bg-success' | 'bg-danger';
  text: string;
}
export const alert = (payload: AlertParams) => ({
  type: AppTypes.ALERT,
  payload,
});

export const toggleAlert = (payload: ToggleAlertParams) => ({
  type: AppTypes.TOGGLE_ALERT,
  payload,
});

export const toggleLoader = (payload: boolean) => ({
  type: AppTypes.TOGGLE_LOADER,
  payload,
});
