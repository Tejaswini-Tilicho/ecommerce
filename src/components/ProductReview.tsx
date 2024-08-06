import React from "react";
import NextImage from "next/image";
import star from "../../public/images/star.svg";

interface ReviewProps {
  starCount: number;
  text: string;
}

const ProductReview: React.FC<ReviewProps> = ({ starCount, text }) => {
  const stars = Array(starCount).fill(star);

  return (
    <div>
      <div className="flex justify-between items-center w-[823px]">
        <div className="flex">
          {stars.map((star, index) => (
            <NextImage key={index} src={star} alt="Star" />
          ))}
        </div>
        <div className="flex items-start justify-end">October 21, 2020</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="font-sans font-semibold text-[22px] pt-3.5">
          Amazing and durable jacket
        </div>
        <div className="font-sans font-bold text-[14px]">Ryan M</div>
      </div>
      <div className="font-sans w-[700px] pt-[15px] text-[16px] font-medium">
       {text}
      </div>
      <div className="flex items-center pt-[15px]">
        <div className="flex items-center font-sans font-normal text-[14px]">
          Was the review helpful? Yes(4) No (0)
        </div>
        <div className="border-black border bg-black w-px h-5 mx-[15px]"></div>
        <div className="flex items-center font-sans font-normal text-[14px]">
          Flag as inappropriate
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
