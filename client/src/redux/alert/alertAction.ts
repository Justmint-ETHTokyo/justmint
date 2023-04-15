import { ACTION_TYPES } from "./alertTypes";

// alert 보이기
export const openAlert = () => {
    return {type: ACTION_TYPES.OPEN_ALERT, data: null};
}

// alert 닫기
export const closeAlert = () => {
    return {type: ACTION_TYPES.CLOSE_ALERT, data: null};
}

// alert 정보 설정
export const setAlertInfo = (alertText:string, positiveState:boolean) => {
    return {type: ACTION_TYPES.SET_ALERT_INFO, data: {alertText:alertText, positiveState:positiveState}};
}