import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRight } from '../../asset/svg/arrow-right2.svg';
import './MenuElem.scss';

type MenuElemProp = {
    menuInfo: {
        name: string;
        link: string;
        icon?: React.ReactNode;
    }
}

function MenuElem({ menuInfo }:MenuElemProp) {
    const navigation = useNavigate();

    return (
        <div 
            className="menu-component-elem"
            onClick={()=>navigation(menuInfo?.link)}
        >
            { menuInfo.icon && menuInfo?.icon }
            <span className="menu-component-elem-name">{ menuInfo?.name }</span>
            <ArrowRight className="menu-component-elem-icon"/>
        </div>
    )
}
export default MenuElem;