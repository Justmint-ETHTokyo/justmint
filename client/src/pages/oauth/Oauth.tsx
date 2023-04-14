import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import UserApi from "../../apis/UserApi";
import Loading from "../../components/loading";

function Oauth() {
  const userApi = new UserApi();
  const [searchParams] = useSearchParams();

  const getKakaoToken = async () => {
    const res = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${window.location.origin}/oauth&code=${searchParams.get('code')}`);
    const kakaoToken = res.data.access_token;
    userApi.loginHandler(kakaoToken);
  }

  useEffect(()=>{
      getKakaoToken();
  }, [])

  return (
    <div style={{height: '80vh'}}>
      <Loading />
    </div>

  )
}

export default Oauth;
