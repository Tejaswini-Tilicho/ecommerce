import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}
interface DropdownProps {
  options: Option[];
  onChange?: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  console.log(options);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
  };
  // console.log(selectedOption,"asdfgh")
  return (
    <div>
      <div className="border-[2px] border-black">
        <div className="flex justify-center text-[#000000] font-bold text-[14px] text-sans">
          <select
            className="pl-[5px] bg-[#EFF2F6] w-full h-[37px] outline-none"
            value={selectedOption}
            onChange={handleSelect}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value} hidden>
                Sort by: {option.label}
              </option>
            ))}
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

// import React, { useState } from "react";

// interface Option {
//   label: string;
//   value: string;
// }

// interface DropdownProps {
//   options: Option[];
//   onChange?: (value: string) => void;
// }

// const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     setSelectedOption(value);
//     if (onChange) {
//       onChange(value);
//     }
//   };

//   return (
//     <div>
//       <div className="border border-black">
//         <div className="flex justify-center pt-[6px] text-[#000000] font-bold text-[14px] text-sans">
//           <select
//             className="pl-[5px] bg-[#EFF2F6] w-full h-[37px] outline-none"
//             value={selectedOption}
//             onChange={handleSelect}
//           >
//             <option value={selectedOption} hidden>
//               Sort by
//             </option>
//             {options.map((option, index) => (
//               <option key={index} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dropdown;

// import React, { useState } from "react";

// interface DropdownProps {
//   options: string[];
// }

// const DropdownCheck: React.FC<DropdownProps> = ({ options }) => {
//   const [selectedOption, setSelectedOption] = useState("Popular");

//   return (
//     <div>
//       <div className="border border-black">
//         <div className="flex justify-center pt-[6px] text-[#000000] font-bold text-[14px] text-sans">
//           <span className="mr-[5px]">Sort by:</span>
//           <select
//             className="bg-[#EFF2F6] w-full h-[37px] outline-none"
//             value={selectedOption}
//             onChange={(e) => setSelectedOption(e.target.value)}
//           >
//             {options.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DropdownCheck;
