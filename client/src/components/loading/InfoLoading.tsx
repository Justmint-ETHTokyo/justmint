import { Icon } from '@iconify/react';
import './InfoLoading.scss';

type infoLoadingProp = {
    loadingText: React.ReactNode;
}

function InfoLoading({ loadingText } : infoLoadingProp) {

    return (
        <div className="info-loading">
            <Icon 
                icon="line-md:loading-alt-loop" 
                width="60"
                color="#ed5f8a"
            />
            <h3>
                { loadingText }
            </h3>
        </div>
    )
}
export default InfoLoading;