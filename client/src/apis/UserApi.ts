import { get, patch, post } from './AxiosCreate';
import store from '../redux/store';
import { setAuth, setEmail, setId, setName, setPhoneNumber, setProfileImage, setSecret } from '../redux/userData/userDataAction';
import { setAptosWallet, setEthereumWallet, setKlaytnWallet, setPolygonWallet, setSolanaWallet } from '../redux/wallet/walletAction';
import _ from 'lodash';
import { clearRedirectUrl, getRedirectUrl } from '../utils/function/redirectUrl';

type userType = {
    id:number,
    snsId?:string,
    name:string,
    image:string,
    email:string,
    phoneNumber:string,
    social?:string,
    secret:string,
}

class UserApi {
    loginHandler = async (googleToken:string) => {
        const userInfo = await this.checkGoogleUser(googleToken);
        if (!userInfo.signUp) {
            window.location.href=`/signup?google=${googleToken}`;
        } else {
            this.setToken(userInfo.accessToken, userInfo.refreshToken);
            this.getUserInfo();
            let redirectUrl = getRedirectUrl();
            window.location.href = redirectUrl ? redirectUrl : `/mypage`;
            clearRedirectUrl();
        }
    }

    getToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await get('/auth/token', {
            headers: {
                refreshToken: refreshToken
            }
        });
        localStorage.setItem('accessToken', res.data.data.accessToken);
    }

    getSetUserInfo = async () => {
        const res = await this.getUserInfo();
        this.setUserInfo(res.data);
    }

    getUserInfo = async () => {
        const res = await get('/user/profile');
        return res.data;
    }

    setToken = (accessToken:string, refreshToken:string) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    setUserInfo = (user:userType) => {
        store.dispatch(setName(user.name));
        store.dispatch(setProfileImage(user.image));
        store.dispatch(setId(user.id));
        store.dispatch(setEmail(user.email));
        store.dispatch(setPhoneNumber(user.phoneNumber));
        store.dispatch(setSecret(user.secret));
        store.dispatch(setAuth(true));
    }

    signup = async (newUserData:object) => {
        const res = await post('auth/signup', newUserData);
        this.setToken(res.data.data.accessToken, res.data.data.refreshToken);
        await this.getSetUserInfo();
        await this.getWallets();
        return res.data;
    }

    checkGoogleUser = async (googleToken:string) => {
        const res = await post(`auth`, {
            token: googleToken,
            social: 'GOOGLE'
        });
        return res.data.data;
    }
    
    sendPhoneVerificationNumber = async (phoneNumber:string) => {
        const res = await post(`sms/send`, {
            phoneNumber: phoneNumber
        });
        return res.data;
    }

    sendEmailVerificationNumber = async (email:string) => {
        const res = await post(`user/email/send`, {
            email: email
        });
        return res.data;
    }

    checkVerificationNumber = async (authText:string, authCode:string) => {
        const res = await post(`auth/verification`, {
            authText: authText,
            authCode: authCode
        });
        return !!(res.data.data);
    }

    editUserName = async (name:string) => {
        const res = await patch(`user/profile/nickname`, {
            nickname: name
        });
        store.dispatch(setName(name));
        return res.data.data;
    }

    editUserPhoneNumber = async (phoneNumber:string) => {
        const res = await patch(`user/profile/phone`, {
            phoneNumber: phoneNumber
        });
        store.dispatch(setPhoneNumber(phoneNumber));
        return res.data.data;
    }

    editUserEmail = async (email:string) => {
        const res = await patch(`user/profile/email`, {
            email: email
        });
        store.dispatch(setEmail(email));
        return res.data.data;
    }

    editUserProfileImage = async (profileImgFormdata:any) => {
        const res = await patch(`user/profile/photo`, profileImgFormdata);
        store.dispatch(setProfileImage(res.data.data.profileImage));
        return res.data.data;
    }

    editSecret = async (secret:string) => {
        const res = await patch(`user/secret`, {
            secret: secret
        });
        store.dispatch(setSecret(secret));
        return res.data.data;
    }

    getWallets = async () => {
        const res = await get(`user/wallet`);
        const wallets = res.data.data;
        store.dispatch(setEthereumWallet(wallets.find((wallet:any) => wallet.chainType === 'Ethereum')?.walletAddress));
        store.dispatch(setPolygonWallet(wallets.find((wallet:any) => wallet.chainType === 'Polygon')?.walletAddress));
        store.dispatch(setKlaytnWallet(wallets.find((wallet:any) => wallet.chainType === 'Klaytn')?.walletAddress));
        store.dispatch(setSolanaWallet(wallets.find((wallet:any) => wallet.chainType === 'Solana')?.walletAddress));
        store.dispatch(setAptosWallet(wallets.find((wallet:any) => wallet.chainType === 'Aptos')?.walletAddress));
        return wallets;
    }

    // wallet 관련 - quest
    getUserCompletedQuest = async () => {
        const res = await get(`user/quest`);
        return res.data.data.isQuest;
    }

    completeQuest = async () => {
        const res = await patch(`user/quest`);
    }

    isYoursWalletAddress = async (walletAddress:string) => {
        const res = await get(`user/yours?address=${walletAddress}`);
        return res.data.data;
    }

    // aa wallet contract 관련
    getAAWalletCreateOp = async () => {
        const res = await get('user/aawallet');
        console.log(res.data);
        return res.data.data;
    }

    sendAAWalletCreateOp = async (userOperation:any) => {
        const res = await post('user/aawallet', {
            createOpWithSign: userOperation
        });
        return res.data.data;
    }
}
export default UserApi;