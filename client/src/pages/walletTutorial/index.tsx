import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../apis/UserApi';
import MiniHeader from '../../components/miniHeader/MiniHeader';
import TutorialStep from './TutorialStep';
import magnifyingGlassImg from '../../asset/image/magnifying-glass.png';
import walletMoreInfoList from './walletMoreInfoList.json';
import TutorialMoreInfo from './TutorialMoreInfo';
import './index.scss';

function WalletTutorial() {
    const navigation = useNavigate();
    const userApi = new UserApi();
    const [completedQuest, setCompletedQuest] = useState(false);

    useEffect(()=>{
        const getUserCompletedQuest = async () => {
            const _completed = await userApi.getUserCompletedQuest();
            setCompletedQuest(_completed);
        }
        getUserCompletedQuest();
    }, [])

    return (
        <div className="yours-wallet-tutorial">
            <MiniHeader 
                title="Justmint Wallet 입문하기"
            />
            <div className="show-content-smoothly">
            <pre className="tutorial-text">
                안녕하세요!<br/>
                Justmint Wallet 과 함께 NFT 경험을 시작하신 분들<br/>
                모두 환영합니다. 😀<br/>
                <br/>
                디지털 지갑 속 자산을 보호하기 위해서는<br/>
                <b>지갑 고유의 비밀구문을 안전한 곳에 보관</b>해야<br/>
                된다는 사실을 알고 계신가요?<br/>
                <br/>
                아래 2가지의 퀘스트를 완수하고<br/>
                본격적인 NFT 경험을 시작해보세요!<br/>
                <br/>
                만약 지갑을 처음 접하시는 분이라면<br/>
                ‘더 알아보기'에서 지갑에 대한 기본 개념부터<br/>
                읽어 보시는 것을 추천드립니다.<br/>
            </pre>

            <div className="tutorial-steps-wrapper flex-column-20">
                <TutorialStep 
                    title="Quest.2"
                    description="패스코드 잊어버렸을 때를 대비해서"
                    name="비밀구문 저장하기"
                    finished={completedQuest}
                    onClick={()=>{navigation('secret')}}
                />
                <TutorialStep 
                    title="Quest.1"
                    description="내 지갑 속 자산 거래를 승인하기 위해서"
                    name="나만 아는 패스코드 설정하기"
                    finished={true}
                />
            </div>

            <h3 className="tutorial-more-info flex-row-4">
                더 알아보기
                <img src={magnifyingGlassImg}/>
            </h3>

            <div className="tutorial-more-info-container">
                {
                    walletMoreInfoList.map((walletInfo, idx)=>(
                        <TutorialMoreInfo
                            title={walletInfo.title}
                            description={walletInfo.description}
                            key={idx}
                            important={walletInfo.important}
                        />
                    ))
                }
            </div>
            </div>
            {
                !completedQuest &&
                <button
                    className="button button--sticky"
                    id="purple"
                    onClick={()=>navigation('secret')}
                >
                    Quest 2 완료하러 가기
                </button>
            }
        </div>
    )
}
export default WalletTutorial;