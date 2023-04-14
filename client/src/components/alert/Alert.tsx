import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import positiveImg from '../../asset/image/heart-face.png';
import negativeImg from '../../asset/image/skull.png';
import { closeAlert } from '../../redux/alert/alertAction';
import './Alert.scss';

function Alert() {
    const dispatch = useDispatch();
    const showAlert = useSelector((state:any)=>state.alert.showAlert);
    const alertText = useSelector((state:any)=>state.alert.alertText);
    const positiveState = useSelector((state:any)=>state.alert.positiveState);

    useEffect(()=>{
        let timer:any;
        if (showAlert) {
            timer = setTimeout(()=>{
                dispatch(closeAlert());
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [showAlert])

    return (
        <div 
            className={ showAlert ? "alert-container" : "alert-container alert-container--hidden" }
            id={ positiveState ? "positive" : "negative" }
        >
            <img className="alert-image" src={ positiveState ? positiveImg : negativeImg }/>
            <h4 className="alert-text">{ alertText }</h4>
        </div>
    )
}
export default Alert;