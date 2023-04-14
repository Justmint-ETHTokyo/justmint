import { ACTION_TYPES } from "./alertTypes";

const initialState = {
  showAlert: false,
  alertText: '',
  positiveState: true,
}

export const alertReducer = (state:object = initialState, action : any) => {
  let resultState:any = { ...state };

  switch (action.type) {
    case ACTION_TYPES.OPEN_ALERT:
      resultState.showAlert = true;
      break;
    case ACTION_TYPES.CLOSE_ALERT:
      resultState.showAlert = false;
      break;
    case ACTION_TYPES.SET_ALERT_INFO:
      resultState.alertText = action.data.alertText;
      resultState.positiveState = action.data.positiveState;
      break;
    default:
  }

  return resultState;
};