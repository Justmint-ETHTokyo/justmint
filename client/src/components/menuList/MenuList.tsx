import MenuElem from "./MenuElem";
import './MenuList.scss';

type menuInfo = {
    name: string;
    link: string;
    icon?: React.ReactNode;
}

function MenuList ({ menuList }: { menuList: menuInfo[] }) {

    return (
        <div className="menu-component-list">
            {
                menuList.map((menu, idx)=>(
                    <MenuElem 
                        menuInfo={menu}
                        key={idx}
                    />
                ))
            }
        </div>
    )
}
export default MenuList;