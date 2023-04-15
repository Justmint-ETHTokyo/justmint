import { useEffect, useState } from 'react';

type BlurryLoadingImageProp = {
    preview: string;
    image: string;
    alt: string;
    imageStyleClass?: string;
    bgColor?: string;
};

const BlurryLoadingImage = ({
  preview,
  image,
  alt,
  imageStyleClass,
  bgColor = 'transparent',
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
    <img
      style={{
        background: bgColor,
      }}
      src={currentImage}
      alt={alt}
      className={imageStyleClass}
    />
  );
};

export default BlurryLoadingImage;