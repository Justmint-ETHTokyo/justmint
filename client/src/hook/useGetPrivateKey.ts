import { chainType } from "ChainType";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { decryptMnemonic } from "../utils/function/crypto";
import { generateWalletsFromMnemonic } from "../utils/function/wallet";

export const useGetPrivateKey = () => {
    const secret = useSelector((state: any) => state.userData.secret);
    const [passCode, setPassCode] = useState('');
    const [validPassCode, setValidPassCode] = useState(true);
    
    useEffect(()=>{
        setValidPassCode(true);
    }, [passCode])

    const getPrivateKey = async (chainType:chainType) => {
        try {
            const _mnemonic = await decryptMnemonic(secret, passCode);
            const wallets = generateWalletsFromMnemonic(_mnemonic);
            return wallets[chainType as chainType].privateKey;
        } catch(err) {
            setValidPassCode(false);
            throw err;
        }
    }

    return { passCode, setPassCode, validPassCode, getPrivateKey };
}