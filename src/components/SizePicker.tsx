import React, { useState } from "react";

interface SizeProps {
  label: string;
  value: string;
}

interface SizepickerProps {
  // availableSizes: SizeProps[];
  label: string;
  value: string;
  checked: boolean;
  onChange: (size: SizeProps) => any;
}

const Sizepicker: React.FC<SizepickerProps> = ({
  // availableSizes,
  label,
  value,
  checked,
  onChange,
}) => {
  // console.log(value, "val");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeClick = (size: any) => {
    // console.log(size, "size");
    setSelectedSize(size);
    onChange(size);
  };

  return (
    <div>
      <div className="flex">
        {/* {availableSizes.map((size) => ( */}
        <button
          // key={size.value}
          className={`border ${
            checked ? "border-[3px] font-bold border-black" : "border-black"
          } text-[#000000] m-1 w-12 h-12 inline-flex items-center justify-center`}
          onClick={() => handleSizeClick(value)}
        >
          {label}
        </button>
        {/* ))} */}
      </div>
    </div>
  );
};

export default Sizepicker;
