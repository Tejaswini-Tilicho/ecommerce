import React, { useEffect, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  className?: string;
  placeholder?: string;
  value?: string | string[];
  name?: string;
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  options,
  className,
  placeholder,
  value,
  name,
  multiple = false,
  onChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [availableOptions, setAvailableOptions] = useState<Option[]>(options);

  useEffect(() => {
    if (value) {
      setSelectedOptions(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  useEffect(() => {
    const updatedAvailableOptions = options.filter(
      (option) => !selectedOptions.includes(option.value)
    );
    setAvailableOptions(updatedAvailableOptions);
  }, [selectedOptions, options]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    let updatedSelectedOptions;

    if (multiple) {
      if (selectedOptions.includes(selectedValue)) {
        updatedSelectedOptions = selectedOptions.filter(
          (option) => option !== selectedValue
        );
      } else {
        updatedSelectedOptions = [...selectedOptions, selectedValue];
      }
    } else {
      updatedSelectedOptions = [selectedValue];
    }

    setSelectedOptions(updatedSelectedOptions);
    onChange &&
      onChange(multiple ? updatedSelectedOptions : updatedSelectedOptions[0]);

    e.target.value = "";
  };

  const handleDelete = (value: string) => {
    const updatedSelectedOptions = selectedOptions.filter(
      (option) => option !== value
    );
    setSelectedOptions(updatedSelectedOptions);
    onChange && onChange(multiple ? updatedSelectedOptions : "");
  };

  return (
    <div className={`relative border border-black p-2 ${className}`}>
      <div className="flex flex-grow items-center gap-2">
        {selectedOptions.map((option) => {
          const selectedOption = options.find((opt) => opt.value === option);
          return (
            <div
              key={option}
              className="text-black bg-[#A9ABBD] px-2 rounded-md flex items-center"
            >
              {selectedOption?.label}
              <button
                type="button"
                className="ml-1 text-gray-500"
                onClick={() => handleDelete(option)}
              >
                &times;
              </button>
            </div>
          );
        })}
        <select
          className="bg-[#EFF2F6] text-[#A9ABBD] text-[16px] pl-[1px] font-normal font-Sans outline-none flex-1"
          onChange={handleSelect}
          value=""
        >
          <option value="" disabled hidden>
            {selectedOptions.length === 0 && placeholder ? placeholder : ""}
          </option>
          {availableOptions?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomDropdown;
