import { chainType } from "ChainType";
import chainList from "../../utils/data/chainList";
import './ChainTextIcon.scss';

type chainTextIconProp = {
    chainType: chainType;
    color?: string;
    backgroundColor?: string;
}

function ChainTextIcon ({ chainType, color="#BDBDBD", backgroundColor="transparent" }:chainTextIconProp) {

    return (
        <div 
            className="chain-text-icon-wrapper"
            style={{backgroundColor: backgroundColor}}
        >
            {chainList.find(el=>el.name===chainType)?.icon}
            <span 
                className="chain-text"
                style={{color: color}}
            >
                { chainType }
            </span>
        </div>
    )
}
export default ChainTextIcon;