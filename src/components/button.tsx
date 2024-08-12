import Image from "next/image";
import React from "react";

interface ButtonProps {
  className: string;
  buttonName: any;
  onClick?: () => any;
  width?: string;
  height?: string;
  imageSrc?: any;
  imageAlt?: string;
  imgWidth?: number;
  imgHeight?: number;
  disabled?: boolean;
}

const MainButton: React.FC<ButtonProps> = ({
  className,
  buttonName,
  onClick = () => {},
  width,
  height,
  imageSrc,
  imgWidth,
  imgHeight,
  imageAlt = "Button image",
  ...props
}) => {
  return (
    <div>
      <button
        className={`${className} flex items-center font-sans justify-center`}
        onClick={onClick}
        style={{ width, height }}
        {...props}
        type="button"
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imgWidth}
            height={imgHeight}
            className="mr-2"
          />
        )}
        {buttonName}
      </button>
    </div>
  );
};

export default MainButton;
