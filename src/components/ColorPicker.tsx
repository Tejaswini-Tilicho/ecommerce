import React, { useState } from "react";

interface ColorProps {
  label: string;
  value: string;
}

interface ColorPickerProps {
  // availableColors: ColorProps[];
  label: string;
  value: string;
  onChange: (size: ColorProps) => any;
  className?: string;
  initialColor?: string;
  checked?: boolean;
  multiSelect?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  checked,
  onChange,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [clickColor, setClickColor] = useState(false);

  const handleColorClick = (color: any) => {
    // console.log(color, "color");
    setSelectedColor(color);
    setClickColor(!clickColor);
    onChange(color);
  };
  console.log(clickColor, "select");

  return (
    <div>
      <div>
        {/* {availableColors.map((color) => ( */}
        <button
          // key={color.value}
          className={`border ${
            checked ? "border-[3px] font-bold border-black" : "border-black"
          } text-[#000000] m-0.5 w-[25px] h-[25px] inline-flex items-center justify-center rounded-full`}
          style={{ backgroundColor: label }}
          onClick={() => handleColorClick(value)}
        />
        {/* ))} */}
      </div>
    </div>
  );
};

export default ColorPicker;
