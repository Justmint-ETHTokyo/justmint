import { useState } from "react";
import { ReactComponent as ArrowRight } from "../../asset/svg/arrow-right.svg";
import './TutorialMoreInfo.scss';

type tutorialMoreInfoProps = {
    title: string;
    description: string;
    important: boolean;
}

function TutorialMoreInfo ({ title, description, important }:tutorialMoreInfoProps) {
    const [opened, setOpened] = useState(false);

    return (
        <div 
            className={`tutorial-more-info-wrapper ${important ? "important" : ""}`}
            id={opened ? "opened" : ""}
        >
            <div 
                className="tutorial-more-info-header"
                onClick={()=>{setOpened(!opened)}}
            >
                <h4 className="tutorial-more-info-title">{ title }</h4>
                <ArrowRight className="arrow-icon"/>
            </div>
            {
                opened && 
                <div 
                    className="tutorial-more-info-body" 
                    dangerouslySetInnerHTML={{__html: description}} 
                />
            }
        </div>
    )
}
export default TutorialMoreInfo;