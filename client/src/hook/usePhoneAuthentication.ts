import { useEffect, useRef, useState } from "react";
import UserApi from "../apis/UserApi";
import { autoHyphen } from "../utils/function/stringToPhoneNumber";

const usePhoneAuthentication = () => {
    const userApi = new UserApi();
    const maxTime = 180;
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [verificationNumber, setVerificationNumber] = useState<string | null>('123456');
    const [validationTime, setValidationTime] = useState(maxTime);
    const timer = useRef<any>(null);
    const time = useRef<number>(0);

    // 인증 번호가 보내졌는 지에 대한 여부
    const [isVerificationNumberSent, setIsVerificationNumberSent] = useState<boolean>(false);
    
    // 인증 여부
    const [authentic, setAuthentic] = useState<boolean>(false);

    const getPhoneNumber = (target:HTMLInputElement) => {
        target.value = autoHyphen(target.value);
        setPhoneNumber(target.value);
    }

    const resetSetting = () => {
        setIsVerificationNumberSent(false);
        setAuthentic(false);
    }

    const sendVerificationNumber = async () => {
        // 인증 번호 보내기
        await resetSetting();
        const pn = phoneNumber.split('-')[0]+phoneNumber.split('-')[1]+phoneNumber.split('-')[2];
        const verificationRes = await userApi.sendPhoneVerificationNumber(pn);
        if (verificationRes.success) {
            setIsVerificationNumberSent(true);
        }
        setVerificationNumber(verificationRes.data.verifyCode.toString());

        return () => clearInterval(timer.current);
    }

    const checkVerifyNumber = async (userNumber: string) => {
        setAuthentic(userNumber === verificationNumber);
    }

    useEffect(()=> {
        if (validationTime === 0) {
            if (!authentic) {
                resetSetting();
            }
        }
    }, [validationTime])

    useEffect(()=>{ // 인증 번호 보내기 버튼 누르면 3분 타이머 시작
        if (isVerificationNumberSent) {
            time.current = maxTime;
            setValidationTime(time.current);
            timer.current = setInterval(()=>{
                time.current--;
                setValidationTime(time.current);
                if (time.current === 0) {
                    clearInterval(timer.current);
                }
            }, 1000)
        }
        else {
            clearInterval(timer.current);
        }

        return () => clearInterval(timer.current);

    }, [isVerificationNumberSent])

    useEffect(()=>{ // 핸드폰 번호 바뀔 때마다 설정 초기화 작업
        resetSetting();
    }, [phoneNumber])

    return { phoneNumber, getPhoneNumber, setPhoneNumber, sendVerificationNumber, isVerificationNumberSent, checkVerifyNumber, authentic, validationTime };
}

export default usePhoneAuthentication;