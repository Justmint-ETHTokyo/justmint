import { useEffect, useState } from 'react';

type BlurryLoadingImageProp = {
    preview: string;
    image: string;
    // imageStyleClass?: string;
    // divStyleClass?: string;
    backgroundStyleClass?: string;
    backgroundStyleId?: string;
    bgColor?: string;
    children?: JSX.Element;
};

const BlurryLoadingBackground = ({
  preview,
  image,
  // imageStyleClass,
  // divStyleClass,
  backgroundStyleClass,
  backgroundStyleId,
  bgColor = 'transparent',
  children
}:BlurryLoadingImageProp) => {
  const [currentImage, setCurrentImage] = useState(preview);
  const [loading, setLoading] = useState(true);

  const fetchImage = (src:string) => {
    const loadingImage = new Image();
    loadingImage.src = src;
    loadingImage.onload = () => {
      setCurrentImage(loadingImage.src);
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchImage(image);
  }, [preview, image]);

  return (
    // <div className={divStyleClass} style={{ overflow: 'hidden' }}>
        <div
            style={{
              filter: `${loading ? 'blur(20px)' : ''}`,
              transition: '0.5s linear',
              width: '100%',
              backgroundImage: `url(${currentImage})`,
              backgroundColor: bgColor
            }}
            className={backgroundStyleClass}
            id={backgroundStyleId}
        >
          { children }
        </div>
    // {/* </div> */}
  );
};

export default BlurryLoadingBackground;