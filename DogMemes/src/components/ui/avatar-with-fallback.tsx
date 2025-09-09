"use client";

import { useState } from "react";

interface AvatarWithFallbackProps {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export default function AvatarWithFallback({
  src,
  alt,
  fallbackSrc = "/imgs/head/1.jpg",
  className = "w-8 h-8 rounded-full object-cover",
}: AvatarWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
