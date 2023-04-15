import { useState, useEffect } from "react";
import { chainType } from "ChainType";
import Web3 from 'web3';
import UserApi from "../apis/UserApi";

export const useCheckAddressValidation = (chainType:chainType) => {
    const userApi = new UserApi();
    const [address, setAddress] = useState("");
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isYoursWallet, setIsYoursWallet] = useState<boolean>(false);
    
    const checkAddressValidation = async () => {
        switch(chainType) {
            case "Ethereum":
            case "Polygon":
            case "Klaytn":
                return Web3.utils.toChecksumAddress(address);
            case "Solana":
                try {
                    let _window = window as any;
                    let _solana = _window.solanaWeb3;
                    const add = new _solana.PublicKey(address);
                    return await _solana.PublicKey.isOnCurve(add.toBytes());
                } catch(e:any) {
                    return false;
                }
            case "Aptos":
                return address.length === 66 && Web3.utils.isHex(address);
            default:
        }
    }

    useEffect(() => {
        const checkAddress = async() => {
            let _valid = await checkAddressValidation();
            setIsValid(!!(_valid));
        }

        const checkYoursWallet = async () => {
            let _yours = await userApi.isYoursWalletAddress(address);
            setIsYoursWallet(_yours);
        }

        if (address.length) {
            checkAddress();
            checkYoursWallet();
        }
    }, [address]);
    
    return { address, setAddress, isValid, isYoursWallet };
}