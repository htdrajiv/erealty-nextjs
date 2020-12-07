import React from 'react';

const LoadImage = (imageName, alt, style, classNames) => {
    return <img className={classNames} src={`/images/${imageName}`} style={style} alt={alt} />;
}

function ImageLoader(props) {
    const { name, style, alt, classNames } = props;
    return (
        LoadImage(name, alt, style, classNames)
    )
}

export default ImageLoader;