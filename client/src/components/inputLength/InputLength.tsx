import './InputLength.scss';

type inputLengthProps = {
    currLength:number;
    maxLength:number;
}

function InputLength({currLength, maxLength}:inputLengthProps) {

    return (
        <div className="input-content-length">
            <span id={currLength >= maxLength ? "max" : (currLength ? "active" : "")}>
                { currLength }
            </span>
            /{maxLength}
        </div>
    )
}
export default InputLength;