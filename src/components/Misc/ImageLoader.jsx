import React from 'react';

const LoadImage = (baseUrl, imageName, alt, style, classNames) => {
    return <img className={classNames} src={`${baseUrl ? baseUrl : '/images'}/${imageName}`} style={style} alt={alt} />;
}

function ImageLoader(props) {
    const { baseUrl, name, style, alt, classNames } = props;
    return (
        LoadImage(baseUrl, name, alt, style, classNames)
    )
}

export default ImageLoader;