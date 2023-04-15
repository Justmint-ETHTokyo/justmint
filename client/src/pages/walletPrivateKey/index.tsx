import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPrivateKey } from "../../hook/useGetPrivateKey";
import { chainType as ChainType } from "ChainType";
import chainList from '../../utils/data/chainList';
import MiniHeader from "../../components/miniHeader/MiniHeader";
import PassCodeInput from "./PassCodeInput";
import CheckPrivateKey from "./CheckPrivateKey";
import './index.scss';
import { setShowAlertInfo } from "../../utils/function/showAlert";

function WalletPrivateKey() {
    const navigation = useNavigate();
    const { chainType } = useParams();
    const { passCode, setPassCode, validPassCode, getPrivateKey } = useGetPrivateKey();
    const [pageMode, setPageMode] = useState('PASSCODE_INPUT');
    const [privateKey, setPrivateKey] = useState('');

    const getPrivateKeyHandler = async () => {
        try {
            const _privateKey = await getPrivateKey(chainType as ChainType);
            setPrivateKey(_privateKey);
            goToPrivateKeyCheckPage();
        } catch(err) {
            console.log(err);
        }
    }

    const goToPrivateKeyCheckPage = () => {
        setPageMode('CHECK_PRIVATE_KEY');
    }

    const pageRenderer = () => {
        switch(pageMode) {
            case 'PASSCODE_INPUT':
                return <PassCodeInput 
                    passCode={passCode}
                    setPassCode={setPassCode}
                    validPassCode={validPassCode}
                    submitAction={()=>{getPrivateKeyHandler()}}
                />
            
            case 'CHECK_PRIVATE_KEY':
                return <CheckPrivateKey 
                    privateKey={privateKey}
                />
        }
    }

    useEffect(()=>{
        let chainTypeList = [];
        for (let el of chainList) {
            chainTypeList.push(el.name);
        }
        const _chainType = chainType as ChainType;
        if (!chainTypeList.includes(_chainType)) {
            setShowAlertInfo("존재하지 않는 페이지 입니다.", false);
            navigation(-1);
        }
    }, [chainType])

    useEffect(()=>{
        // 페이지 이동시 스크롤 맨 위로
        window.scrollTo(0,0);
    }, [pageMode])

    return (
        <div className="wallet-privatekey-page">
            <MiniHeader 
                title="프라이빗키 확인하기"
            />
            { pageRenderer() }
        </div>
    )
}
export default WalletPrivateKey;