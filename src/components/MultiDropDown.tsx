import React, { useState } from "react";
import Select from "react-select";
import { text } from "stream/consumers";

interface DropdownProps {
    options: { label:string[],value:string[]};
  className?: string;
  placeholder?: string;
  
}

const MultiDropdown: React.FC<DropdownProps> = ({
  options,
  className,
  placeholder,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      // "@apply bg-gray-100": {},
      color: "text-[#A9ABBD]",
      backgroundColor: "#EFF2F6",
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
      borderColor: state.isFocused ? "transparent" : "transparent",
      "&:hover": {
        borderColor: state.isFocused ? "transparent" : "transparent",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      "@apply bg-white text-black": {},
      backgroundColor: state.isSelected ? "#EFF2F6" : "white",
      "&:hover": {
        backgroundColor: "#EFF2F6",
      },
    }),
  };

  
  return (
    <div className={`relative border border-black ${className}`}>
      <Select
        className="bg-[#EFF2F6] text-[#A9ABBD] font-normal font-Sans outline-none w-[100%]"
        options={options.label}
        value={selectedOption}
        onChange={handleChange}
        isMulti={true}
        placeholder={placeholder}
        styles={customStyles}
      />
      <div className="absolute top-1/2 transform -translate-y-1/2"></div>
    </div>
  );
};

export default MultiDropdown;

// Usage example
{/* <CustomDropdown options={["Teju", "Dileep", "Niha"]} />; */}
