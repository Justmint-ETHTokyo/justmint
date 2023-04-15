import './TutorialStep.scss';

type tutorialStepProps = {
    title: string;
    description: string;
    name: string;
    finished: boolean;
    onClick?: Function
}

function TutorialStep({ title, description, name, finished, onClick }:tutorialStepProps) {

    return (
        <button 
            className="tutorial-step flex-column-left-10"
            id={finished ? "finished" : ""}
            onClick={()=>onClick && onClick()}
        >
            <h2 className="eng gn">{ title }</h2>
            <div className="flex-column-left-6">
                <h5 className="gr-5">{ description }</h5>
                <h3>{ name }</h3>
            </div>
            <div className="tutorial-step-finished eng">Finish!</div>
        </button>
    )
}
export default TutorialStep;