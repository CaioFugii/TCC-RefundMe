export enum AppTypes {
  ALERT = '@app/ALERT',
  TOGGLE_ALERT = '@app/TOGGLE_ALERT',
  TOGGLE_LOADER = '@app/LOADER',
}

export interface AppReducerState {
  showAlert: boolean;
  showLoader: boolean;
  alertText: string;
  alertClass: string;
}
