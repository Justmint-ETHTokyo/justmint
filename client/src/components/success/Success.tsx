import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti';
import './Success.scss';
import { ReactNode } from 'react';

type successTypeProp = {
    image:string;
    title:ReactNode;
    buttonText:string;
    buttonAction:Function;
    children?: JSX.Element;
}

function Success({ image, title, buttonText, buttonAction, children }:successTypeProp) {
    const { width, height } = useWindowSize();

    return (
        <div className="success-page">
            <Confetti width={width > 430 ? 430 : width} height={height} numberOfPieces={50} className="confetti-rain"/>
            <div className="success-page-content-wrapper">
                <img className="success-page-image" src={image}/>
                <div className="success-page-text">Congratulation!</div>
                <div className="success-page-title">
                    { title }
                </div>
            </div>
            { children }
            <button
                className="button button--sticky"
                id="purple"
                onClick={()=>buttonAction()}
            >
                { buttonText }
            </button>
        </div>
    )
}
export default Success;