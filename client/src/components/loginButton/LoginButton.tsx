import { useGoogleLogin } from '@react-oauth/google';
import UserApi from '../../apis/UserApi';
import { setShowAlertInfo } from '../../utils/function/showAlert';
import { ReactComponent as GoogleLogo } from '../../asset/svg/google-logo.svg';
import './LoginButton.scss';

function LoginButton() {
    const userApi = new UserApi();
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => { userApi.loginHandler(codeResponse.access_token); },
        onError: (error) => { setShowAlertInfo('로그인에 실패했습니다.\n다시 시도해주세요.', false) }
    });


    return (
        <button
            className="google-login-button button"
            id="white"
            onClick={()=>login()}
        >
            <GoogleLogo className="google-logo"/>
            Get Start with Google
        </button>
    )
}
export default LoginButton;