import { ReactComponent as LoadingIcon } from '../../asset/svg/loading.svg';
import './index.scss';

type loadingProps = {
    title?: string,
}

function Loading({ title }:loadingProps) {

    return (
        <div className="loader" title="2">
            <div className="loading-title">{ title }</div>
            <LoadingIcon />
        </div>
    )
}
export default Loading;