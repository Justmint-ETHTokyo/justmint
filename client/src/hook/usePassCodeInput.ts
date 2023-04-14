import { useEffect, useState } from "react";

export const usePassCode = () => {
    const [passCode, setPassCode] = useState("");
    const [isValid, setIsValid] = useState(false);

    useEffect(()=>{
        setIsValid(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(passCode));
    }, [passCode])
    
    return { passCode, setPassCode, isValid };
}