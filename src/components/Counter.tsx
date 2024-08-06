import React, { useState } from "react";

export interface Quantity {
  className?: string;
  width?: string;
  height?: string;
  onChange?: any;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  max: number;
  onIncrement?: any;
  onDecrement?: any;
  // onIncreaseCount: () => void;
}

const CounterMain: React.FC<Quantity> = ({
  className,
  width = "100px",
  height = "50px",
  quantity,
}) => {
  // const [count, setCount] = useState(1);
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="">
      <div
        className={`border border-[#000000] flex items-center justify-between p-[10px] relative ${className}`}
        style={{ width, height }}
      >
        <button className="text-[#979797]" onClick={decrement}>
          -
        </button>
        <div className="px-[3px] text-center">{quantity}</div>
        <button className="text-[#979797]" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};

export default CounterMain;
