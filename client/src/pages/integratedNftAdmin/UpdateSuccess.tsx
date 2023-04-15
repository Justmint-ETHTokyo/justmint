import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import './UpdateSuccess.scss';

type updateSuccessProp = {
    nftId: number;
}

function UpdateSuccess({ nftId }:updateSuccessProp) {
    const navigation = useNavigate();

    return (
        <div className="integratednft-admin-update-success">
            <Icon 
                icon="line-md:chevron-down-circle" 
                color="#ed5f8a" 
                width="60"
            />
            <h3
                className="integratednft-admin-update-success-text"
            >
                통합 NFT가<br/>
                업데이트 되었어요!
            </h3>

            <div className="success-info-wrapper flex-column-20">
                <h2 className="success-info-title eng">Info</h2>
                <div className="flex-column-20"
                    style={{width: '-webkit-fill-available'}}
                >
                    <div className="success-info-column flex-row-5">
                        <h6>Status</h6>
                        <h6 className="success-info-text">Success</h6>
                    </div>
                    <div className="success-info-column flex-row-5">
                        <h6>Update Date</h6>
                        <h6 className="success-info-text">{ new Date().toLocaleString() }</h6>
                    </div>
                </div>
            </div>
            
            <button
                className='button button--sticky'
                id='purple'
                onClick={()=>{navigation(`/integrated-nft/${nftId}`)}}
            >
                상세페이지에서 확인하기
            </button>
        </div>
    )
}
export default UpdateSuccess;