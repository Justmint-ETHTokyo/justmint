import { useEffect, useRef, useState } from "react";
import UserApi from "../apis/UserApi";

const useEmailAuthentication = () => {
    const userApi = new UserApi();
    const maxTime = 180;
    const [email, setEmail] = useState<string>('');
    const [validationTime, setValidationTime] = useState(maxTime);
    const timer = useRef<any>(null);
    const time = useRef<number>(0);

    // 인증 번호가 보내졌는 지에 대한 여부
    const [isVerificationNumberSent, setIsVerificationNumberSent] = useState<boolean>(false);
    
    // 인증 여부
    const [authentic, setAuthentic] = useState<boolean>(false);

    const resetSetting = () => {
        setIsVerificationNumberSent(false);
        setAuthentic(false);
    }

    const sendVerificationNumber = async () => {
        // 인증 번호 보내기
        await resetSetting();
        const verificationRes = await userApi.sendEmailVerificationNumber(email);
        if (verificationRes.success) {
            setIsVerificationNumberSent(true);
        }

        return () => clearInterval(timer.current);
    }

    const checkVerifyNumber = async (userNumber: string) => {
        setAuthentic(await userApi.checkVerificationNumber(email, userNumber));
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

    useEffect(()=>{ // 이메일 바뀔 때마다 설정 초기화 작업
        resetSetting();
    }, [email])

    return { email, setEmail, sendVerificationNumber, isVerificationNumberSent, checkVerifyNumber, authentic, validationTime };
}

export default useEmailAuthentication;