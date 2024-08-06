import {
  validateEmail,
  validateNumber,
  validatePassword,
  validateText,
} from "@/utils/helpers";
import { FC, useState } from "react";

export interface InputProps {
  className?: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  id?: string;
  name?: string;
  min?: number;
  max?: number;
  required?: boolean;
  onChange?: (e: any) => void;
  onValidationChange?: (isValid: boolean) => void;
  passwordValue?: string;
}

const Input: FC<InputProps> = ({
  className = "",
  placeholder,
  min,
  max,
  type,
  id,
  value,
  name,
  required,
  onChange,
  onValidationChange,
  passwordValue,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [input, setInput] = useState(value || "");
  const [error, setError] = useState("");

  const defaultWidth = className.includes("w-") ? "" : "w-full";
  const defaultHeight = className.includes("h-") ? "" : "h-auto";
  const defaultBorderWidth = className.includes("border-")
    ? ""
    : "border border-black";
  const combinedClassName = `${className} ${defaultWidth} ${defaultHeight} ${defaultBorderWidth}`;

  const handleChange = (e: any) => {
    const value = e.target.value;
    // console.log(value);
    setInput(value);

    let isValid = true;
    let errorMessage = "";

    console.log(data);
    if (id === "email") {
      isValid = validateEmail(value);
      errorMessage = isValid ? "" : "Invalid email";
      setData((prevData) => ({ ...prevData, email: value }));
    } else if (id === "password") {
      isValid = validatePassword(value);
      errorMessage = isValid ? "" : "Invalid password";
      setData((prevData) => ({ ...prevData, password: value }));
    } else if (type === "text") {
      isValid = validateText(value, min as number, max as number);
      errorMessage = isValid ? "" : "Invalid text";
    } else if (type === "number") {
      isValid = validateNumber(value, min as number, max as number);
      errorMessage = isValid ? "" : "Invalid number";
    }
    setError(errorMessage);
    onValidationChange?.(isValid);
    onChange?.(e);
  };

  return (
    <div className="w-[100%]">
      <input
        type={type}
        className={
          "text-[16px] " +
          combinedClassName +
          " text-[#000000] placeholder-[#A9ABBD] font-normal font-Sans h-5 outline-none"
        }
        placeholder={placeholder}
        onChange={handleChange}
        min={min}
        max={max}
        id={id}
        name={name}
        value={value}
        required={required}
      />
      {error && (
        <div className="text-red-600 font-sans text-[10px]">{error}</div>
      )}
    </div>
  );
};

export default Input;
