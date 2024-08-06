import React from "react";
import { useRouter } from "next/router";

interface Option {
  label: string;
  value: string;
  route?: string;
  action?: () => void;
}

interface DropdownProps {
  options: Option[];
  className?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (value: string) => void;
}

const NavDropdown: React.FC<DropdownProps> = ({
  options,
  className,
  placeholder,
  value,
  name,
  onChange,
}) => {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
    //   console.log(selectedValue)
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    if (selectedOption) {
      if (selectedOption.action) {
        selectedOption.action();
      }
      if (selectedOption.route) {
        router.push(selectedOption.route);
      }
      if (onChange) {
        onChange(selectedValue);
      }
    }
  };

    return (
      <div className="">
        <select
          className={` text-[#FFF] bg-[#111] w-[100px] h-[30px] outline-none ${className}`}
          value={value || ""}
          onChange={handleChange}
          name={name}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
};

export default NavDropdown;

