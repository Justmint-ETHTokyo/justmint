import { chainType } from "ChainType";
import { useGetPrivateKey } from "../../hook/useGetPrivateKey";
import { setShowAlertInfo } from "../../utils/function/showAlert";

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
            setShowAlertInfo("비밀번호가 일치하지 않습니다.\n다시 입력해주세요.", false);
            throw err;
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
        <form 
            className="transfer-sign"
            onSubmit={(e)=>{e.preventDefault(); passCodeHandler()}}
        >
            <div className="transfer-sign-title">
                transaction 실행을 위해서<br/>패스코드를 입력해주세요.
            </div>
            <div className="input-box-wrapper">
                <input 
                    className="input-textbox"
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={passCode}
                    onChange={(e)=>{setPassCode(e.target.value)}}
                />
                {
                    !validPassCode &&
                    <div className="input-status" id="warning">
                        올바르지 않은 비밀번호 입니다.
                    </div>
                }
                <button
                    className="transfer-sign-submit-button button"
                    id="purple"
                    disabled={!passCode.length}
                >
                    서명하기
                </button>
            </div>

        </form>
    )
}
export default EnterPassCode;