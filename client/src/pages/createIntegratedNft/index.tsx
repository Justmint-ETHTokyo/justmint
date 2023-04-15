import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NFTApi from "../../apis/NftApi";
import StarLoading from "../../components/loading/StarLoading";
import { encryptToURI } from "../../utils/function/crypto";
import InputForm from "./inputForm/index";
import Intro from "./Intro";

function CreateIntegratedNft() {
    const navigation = useNavigate();
    const nftApi = new NFTApi();
    const [status, setStatus] = useState('INTRO');
    const [chain, setChain] = useState('');

    const createIntegratedNft = async (_chain:string, _nftIdList:number[]) => {
        setStatus('LOADING');
        setChain(_chain);
        const res = await nftApi.createIntegratedNft(_chain, _nftIdList);

        setTimeout(()=>{
            // 3초 뒤에 success page로 넘어가기
            navigation(encryptToURI(res));
        }, 3000)
    }

    const renderingPage = () => {
        switch(status) {
            case 'INTRO':
                return <Intro goToInputPage={()=>{setStatus('INPUT_FORM')}}/>;
            case 'INPUT_FORM':
                return <InputForm createIntegratedNft={createIntegratedNft}/>;
            case 'LOADING':
                return <StarLoading title={<div>통합 NFT를<br/><b>{chain}</b> 체인에서<br/>생성하는 중이에요</div>}/>;
        }
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [status])

    return (
        <>
            { renderingPage() }
        </>
    )
}
export default CreateIntegratedNft;