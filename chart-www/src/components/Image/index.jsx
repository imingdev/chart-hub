import React from 'react';
import { useSafeState, useUpdateEffect } from 'ahooks';

const Image = ({ src, defaultSrc, ...props }) => {
  const [loadFlag, setLoadFlag] = useSafeState(false);
  const [imageSrc, setImageSrc] = useSafeState(src || defaultSrc);

  const onImageErrorHandle = (e) => {
    if (!loadFlag && defaultSrc) {
      setImageSrc(defaultSrc);
      setLoadFlag(true);
    }
    if (props.onError) props.onError(e);
  };

  useUpdateEffect(() => {
    if (src) {
      setImageSrc(src);
      setLoadFlag(false);
    }
  }, [src]);

  return (
    <img
      onError={onImageErrorHandle}
      src={imageSrc}
      {...props}
    />
  );
};

export default Image;
