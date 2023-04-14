import { useNavigate } from 'react-router-dom';
import notFoundImg from '../../asset/image/not-found.png';
import './NotFound.scss';

function NotFound () {
    const navigation = useNavigate();

    return (
        <div className="not-found-page">
            <img src={notFoundImg}/>
            <h2>존재하지 않는 페이지입니다</h2>

            <button
                className="button"
                id="purple"
                onClick={()=>{navigation('/')}}
            >
                나가기
            </button>
        </div>
    )
}
export default NotFound;