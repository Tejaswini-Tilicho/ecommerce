import React, { useState } from "react";
import Image from "next/image";
import car from "../../public/images/RightSide.svg";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleNextImage = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };
  console.log(imageIndex, images, "inside images");

  return (
    <div className="relative w-[556px] h-[549px] overflow-hidden">
      <Image
        src={images?.[imageIndex]}
        alt={`Image ${imageIndex + 1}`}
        layout="fill"
        objectFit="center"
        className="absolute h-40"
      />
      {imageIndex > 0 && (
        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          <Image src={car} alt={"Not found"} className="h-10 w-10 rotate-180" />
        </button>
      )}
      {imageIndex < images?.length - 1 && (
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          <Image src={car} alt={"Not found"} className="h-10 w-10 " />
        </button>
      )}
    </div>
  );
};

export default Carousel;
