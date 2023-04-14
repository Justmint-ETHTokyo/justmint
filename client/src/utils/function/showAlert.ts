import { setAlertInfo, openAlert } from "../../redux/alert/alertAction";
import store from "../../redux/store";

// alert 정보 설정하고 보여주기
export const setShowAlertInfo = (alertText:string, positiveState:boolean) => {
    store.dispatch(setAlertInfo(alertText, positiveState));
    store.dispatch(openAlert());
}