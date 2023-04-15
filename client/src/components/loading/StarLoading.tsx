import starImg from '../../asset/image/star.png';
import './StarLoading.scss';

type starLoadingProps = {
    title?: React.ReactNode,
}

function StarLoading({ title }:starLoadingProps) {

    return (
        <div className="star-loading">
            <img className="star-image" src={starImg}/>
            { title }
        </div>
    )
}
export default StarLoading;