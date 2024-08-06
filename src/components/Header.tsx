import React from "react";

const Header: React.FC = () => {
  return (
    <div className="bg-[#0D0D0D] w-full h-[276px] pl-[145px] flex flex-col items-start justify-center">
      <div className="font-sans pt-[34px] font-semibold text-[#FFFFFF] text-[36px]">
        <div className="h-[48px]">Shop Men&#39;s</div>
      </div>
      <div className="font-sans max-w-[476px] h-[78px] pt-[9px] text-[#FFFFFF] font-normal text-[18px]">
        Revamp your style with the latest designer trends in men’s clothing or
        achieve a perfectly curated wardrobe thanks to our line-up of timeless
        pieces.
      </div>
    </div>
  );
};

export default Header;
