import React, { useState } from "react";

interface CollapseProps {
  headText: string;
  mainText: string;
}

const Collapse: React.FC<CollapseProps> = ({ headText, mainText }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="">
      {/* <div>Teju</div> */}
      <div className="w-full h-[30px] flex justify-between items-center relative">
        <div className="text-[#909090] text-[16px] font-semibold font-sans">
          {headText}
        </div>
        <button
          className="text-[#909090] bg-none border-none cursor-pointer"
          onClick={handleToggle}
        >
          {isCollapsed ? "+" : "-"}
        </button>
      </div>
      {!isCollapsed && (
        <div className="mt-[11px] w-[50%] text-[#909090] text-[16px] font-normal font-sans">
          {mainText}
        </div>
      )}
    </div>
  );
};

export default Collapse;
