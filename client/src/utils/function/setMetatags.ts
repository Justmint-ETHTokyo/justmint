export const setMetaTags = ({ title="Justmint", description="Make Your Digital Asset", imageUrl="https://yours-bucket.s3.ap-northeast-2.amazonaws.com/static/og-image/og-image.png" }) => {
    //set title
    document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", `${title}`);
        
    //set description
    document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", description);
        
    //set images
    document
    .querySelector('meta[property="og:image"]')
    ?.setAttribute("content", imageUrl);
        
    //set url
    document
    .querySelector('meta[property="og:url"]')
    ?.setAttribute("content", window.location.href);
};