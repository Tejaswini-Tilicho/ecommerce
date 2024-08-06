import React from 'react'

const Switch = () => {
  return (
    <div className=''>
      <label className="switch">
  <input type="checkbox"/>
  <span className="slider round"></span>
</label>
    </div>
  )
}

export default Switch




// import { FC, useState } from "react";

// interface SwitchProps {
//   className?: string;
// }

// export const Switch: FC<SwitchProps> = ({ className }) => {
//   const [isSelected, setIsSelected] = useState(false);

//   // Toggle function to change the state
//   const toggle = () => {
//     setIsSelected((prevState) => !prevState);
//   };

//   return (
//     <div
//       onClick={toggle}
//       className={`w-[50px] mt-[100px] h-[24px] flex items-center p-[2px] rounded-full cursor-pointer transition-colors duration-200 ${
//         isSelected ? "bg-black" : "bg-gray-500"
//       } ${className}`}
//     >
//       <div
//         className={`bg-white w-[20px] h-[20px] rounded-full shadow-md transform transition-transform duration-200 ${
//           isSelected ? "translate-x-[26px]" : "translate-x-[2px]"
//         }`}
//       />
//     </div>
//   );
// };
