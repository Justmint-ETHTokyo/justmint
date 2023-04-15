import { useEffect, useState } from "react";
import { useCreateIntegratedNft } from "../../../hook/useCreateIntegratedNft";
import chainList from "../../../utils/data/chainList";
import ActionBox from "../../../components/actionBox/ActionBox";
import MiniHeader from "../../../components/miniHeader/MiniHeader";
import Select from "../../../components/select/Select";
import AvailableNft from "../../../components/integratedNft/AvailableNft";
import './index.scss';

type inputFormProps = {
    createIntegratedNft: Function;
}

function InputForm({ createIntegratedNft }:inputFormProps) {
    const [chain, setChain] = useState<any>(null);
    const { availableNftList, userHasNftChinList } = useCreateIntegratedNft({ chain: chain });
    const [selectedNftIdList, setSelectedNftIdList] = useState<number[]>([]);

    useEffect(()=>{
        // chain이 변경될 때마다 선택한 nft 초기화
        setSelectedNftIdList([]);
    }, [chain])

    return (
        <div>
            <MiniHeader 
                title="Integrated NFT"
            />
            <div className="create-integrated-nft-input-form">
            <ActionBox 
                title="1. 체인 선택하기"
                disabled={false}
                zIndex={1}
            >
                <Select 
                    placeholder="Select Chain"
                    value={chain}
                    setValue={setChain}
                    optionList={chainList}
                    disabledOptionList={userHasNftChinList}
                    optionNameKey="name"
                    optionValueKey="name"
                    optionIconKey="logo"
                />
            </ActionBox>
            <ActionBox 
                title="2. 통합될 NFT 선택하고 발행하기"
                disabled={!(chain)}
                initialOpened={(chain)}
            >
                <>
                    <h5 className="nft-description">
                        선택한 NFT에 대한 소유권 및 혜택 사용권이<br/>
                        통합 NFT에 포함됩니다.
                    </h5>
                    <div
                        className="nft-list-wrapper"
                    >
                    {
                        availableNftList?.map((nftElem, idx)=>(
                            <AvailableNft 
                                key={idx}
                                nftInfo={nftElem}
                                checked={selectedNftIdList.includes(nftElem.id)}
                                checkAction={()=>setSelectedNftIdList([...selectedNftIdList, nftElem.id])}
                                uncheckAction={()=>setSelectedNftIdList(selectedNftIdList.filter((id)=>id!==nftElem.id))}
                            />
                        ))
                    }
                    </div>
                    <button
                        id="purple"
                        className="button"
                        disabled={!(selectedNftIdList.length > 1)}
                        onClick={()=>{createIntegratedNft(chain, selectedNftIdList)}}
                    >
                        {
                            selectedNftIdList.length < 2
                            ? "두 개 이상의 NFT를 선택해주세요"
                            : "Intergrate"
                        }
                    </button>
                </>
            </ActionBox>
            <ActionBox 
                title="3. 업데이트 하기 (준비중)"
                disabled={true}
                initialOpened={false}
            />
            <ActionBox 
                title="4. 소각하기 (준비중)"
                disabled={true}
                initialOpened={false}
            />
            </div>
        </div>
    )
}
export default InputForm;