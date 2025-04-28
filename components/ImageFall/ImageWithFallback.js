import React, { useState } from "react";
import { RiShoppingBag2Line } from "react-icons/ri";

const ImageWithFallback = ({ src, fallbackSrc = "/images/error.jpg", alt = "", ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-xl text-gray-500">
          <RiShoppingBag2Line />
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      {...rest}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        } else {
          setHasError(true);
        }
      }}
    />
  );
};

export default ImageWithFallback;
