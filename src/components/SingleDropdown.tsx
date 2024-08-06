import React from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  className?: string;
  placeholder?: string;
  value?: string | undefined;
  name?: string;
  onChange?: (value: any) => void;
  selectSize?: string;
}

const SingleDropdown: React.FC<DropdownProps> = ({
  options,
  className,
  placeholder,
  value,
  name,
  onChange,
  selectSize,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    const obj = options.find((item) => {
      return item?.value === e.target.value;
    });
    if (onChange) {
      onChange(obj);
    }
  };

  return (
    <select
      className={`border border-black bg-[#EFF2F6] text-[#000000] outline-none ${className}`}
      value={value}
      onChange={handleChange}
      name={name}
    >
      <option value="" hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SingleDropdown;
