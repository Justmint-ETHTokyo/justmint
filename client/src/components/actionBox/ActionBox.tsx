import { useEffect, useState } from "react";
import { ReactComponent as ArrowDown } from "../../asset/svg/arrow-down.svg";
import './ActionBox.scss'

type actionBoxProps = {
    title: string;
    disabled?: boolean;
    children?: React.ReactNode;
    initialOpened?: boolean;
    zIndex?: number;
}

function ActionBox({ title, disabled=false, children, initialOpened=true, zIndex }:actionBoxProps) {
    const [showContent, setShowContent] = useState(disabled ? false : initialOpened);
    
    useEffect(()=>{
        if (initialOpened) {
            setShowContent(true);
        } else {
            if (disabled) {
                setShowContent(false);
            } else {
                setShowContent(initialOpened);
            }
        }
    }, [disabled, initialOpened])

    return (
        <div
            className={
                `action-box-container 
                ${disabled ? "disabled" : ""}
                ${showContent ? "opened" : ""}
                `
            }
        >
            <div 
                className="action-box-header"
                onClick={()=>setShowContent(!showContent)}
            >
                <h3 className="action-box-title">{ title }</h3>
                {
                    children &&
                    <ArrowDown 
                        className={`action-box-toggle ${showContent ? "rotate" : ""}`}
                    />
                }
            </div>
            {/* {
                showContent && */}
                <div className="action-box-content"
                    style={zIndex ? { zIndex: zIndex } : {}}
                >
                    { children }
                </div>
            {/* } */}
        </div>
    )
}
export default ActionBox;