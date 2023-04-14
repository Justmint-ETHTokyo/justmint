import axios from "axios";
import store from "../../redux/store";
import { setAuth } from "../../redux/userData/userDataAction";

export const getRefreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res:any = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/auth/token`, {
            headers: {
                refreshtoken: refreshToken
            }
        });

        // refresh token 유효 -> access token 받고 현재 페이지 reload
        if (res.data.success) {
            const accessToken = res.data.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            window.location.reload();
        }
    } catch(err) {
        // refresh token도 만료되면 -> 로그아웃
        console.log(err);
        store.dispatch(setAuth(false));
    }
}