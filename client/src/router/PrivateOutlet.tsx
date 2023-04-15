import { useAsync } from "react-async";
import { Navigate, Outlet } from "react-router-dom";
import { setRedirectUrl } from "../utils/function/redirectUrl";
import UserApi from "../apis/UserApi";
import Loading from "../components/loading";
import { setShowAlertInfo } from "../utils/function/showAlert";

const userApi = new UserApi();

const authCheck = async () => {
    await userApi.getUserInfo();
}

export default function PrivateOutlet() {
    const { data, error, isPending } = useAsync({
        promiseFn: authCheck,
    })

    if (isPending) {
        return <Loading />
    }
    
    if (error) {
        // 로그인이 되어있지 않은 경우
        // redirect url 저장 후 landing으로 이동
        setShowAlertInfo('로그인이 필요한 서비스입니다.\n로그인 해주세요.', true);
        setRedirectUrl(window.location.pathname);
        return <Navigate to={'/landing'}/>;
    }
    
    return <Outlet />
}