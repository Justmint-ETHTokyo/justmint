import { relative } from "node:path/win32";
import { isAbsolute } from "path";
import { useAsync } from "react-async";
import { Navigate, Outlet } from "react-router-dom";
import UserApi from "../apis/UserApi";
import Loading from "../components/loading";

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
        // 로그인 에러 난 경우
        return <Navigate to={'/landing'}/>;
    }
    
    return <Outlet />
}