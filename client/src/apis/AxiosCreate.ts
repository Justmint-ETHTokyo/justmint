import axios from 'axios';
import { getRefreshToken } from '../utils/function/tokenHandler';

const apiClient = axios.create({
    headers: {
        "Content-Type": 'application/json'
    },
    baseURL: `${process.env.REACT_APP_SERVER_HOST}/api`
});

// 요청 interceptor 정의
apiClient.interceptors.request.use(
    (config:any) => {
        const token = localStorage.getItem('accessToken');
        config.headers = {
            Authorization: `${token}`
        }
        return config;
    },
    (error:unknown) => {
        console.log(error);
        return Promise.reject(error);
    }
)

// 응답 interceptor 정의
apiClient.interceptors.response.use(
    (config:any) => {
        return config
    },
    async (error:any) => {
        // access token에 문제가 있다면
        if (error.response.status === 401) {
            await getRefreshToken();
        }
        return Promise.reject(error);
    }
)

const { get, post, put, patch, delete: destroy } = apiClient;
export { get, post, put, patch, destroy };