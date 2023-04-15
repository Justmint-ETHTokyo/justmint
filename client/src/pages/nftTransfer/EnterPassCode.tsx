import { chainType } from "ChainType";
import { useGetPrivateKey } from "../../hook/useGetPrivateKey";
import PassCodeInput from "../walletPrivateKey/PassCodeInput";

type enterPassCodeProp = {
    nftChainType: chainType;
    makeSignature: Function;
}

function EnterPassCode({nftChainType, makeSignature}:enterPassCodeProp) {
    const { passCode, setPassCode, validPassCode, getPrivateKey } = useGetPrivateKey();

    const getPrivateKeyHandler = async () => {
        try {
            const _privateKey = await getPrivateKey(nftChainType);
            return _privateKey;
        } catch(err) {
            console.log(err);
        }
    }

    const passCodeHandler = async () => {
        try {
            const _privateKey = await getPrivateKeyHandler();
            makeSignature(_privateKey);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <PassCodeInput 
                passCode={passCode}
                setPassCode={setPassCode}
                validPassCode={validPassCode}
                submitAction={()=>{passCodeHandler()}}
            />
        </div>
    )
}
export default EnterPassCode;