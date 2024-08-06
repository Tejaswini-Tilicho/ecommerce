import React, { useState } from "react";
import CustomInput from "./Input";
import img from "../../public/images/searchWhite.svg";
import Image from "next/image";

interface Search {
  className: string;
  placeholder: string;
  // width: string;
  // height: string;
}

const CustomSearch = ({ className, placeholder }: Search) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex items-center justify-center">
      <Image
        src={img}
        alt="icon"
        className=""
        style={{ width: "20px", height: "20px" }}
      />
      <CustomInput
        className={`${className} pl-[12.15px] mt-3 mb-4 outline-none border-none`}
        placeholder={placeholder}
        // width={"1400px"}
        // height={"60px"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        // message=""
        min={0}
        max={100}
        type="text"
      />
    </div>
  );
};

export default CustomSearch;
