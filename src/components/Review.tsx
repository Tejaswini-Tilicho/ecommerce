import React from "react";
import NextImage from "next/image";
import star from "../../public/images/star.svg";

const Review = () => {
  const stars = Array(5).fill(star);
  const reviews = [
    { rating: "5 stars", count: 5, color: "bg-gray-500" },
    { rating: "4 stars", count: 1, color: "bg-black" },
    { rating: "3 stars", count: 0, color: "bg-gray-500" },
    { rating: "2 stars", count: 0, color: "bg-gray-500" },
    { rating: "1 stars", count: 0, color: "bg-gray-500" },
  ];

  return (
    <div className="">
      <div className="font-semibold font-sans text-[36px] pl-[141px]">
        Reviews
      </div>
      <div className="flex pt-[44px] pb-[22px] pl-[141px]">
        {stars.map((star, index) => (
          <NextImage key={index} src={star} alt="Star" />
        ))}
      </div>
      <div className="ml-[146px] pb-[16px] font-sans font-semibold">5 reviews</div>
      {reviews.map((review, index) => (
        <div
          key={index}
          className="flex pl-[145px] py-[6.5px] font-sans font-semibold space-x-3 items-center"
        > 
          <div>{review.rating}</div>
          <div className={`border-black w-24 h-0.5 border ${review.color}`}></div>
          <div>({review.count})</div>
        </div>
      ))}
    </div>
  );
};

export default Review;
