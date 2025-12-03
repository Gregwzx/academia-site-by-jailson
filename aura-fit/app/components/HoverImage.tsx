"use client";

import Image from "next/image";
import { FC } from "react";

interface HoverImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const HoverImage: FC<HoverImageProps> = ({ src, alt, width, height, className }) => {
  return (
    <div className={`relative overflow-hidden group rounded-2xl ${className || ""}`}>
      <Image
        src={src}
        alt={alt}
        width={width || 400}
        height={height || 400}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
    </div>
  );
};

export default HoverImage;
