import React from "react";

export interface Quantity {
  className?: string;
  width?: string;
  height?: string;
  onChange?: any;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  max: number;
  onIncrement?: () => void;
  onDecrement?: any;
  // onIncreaseCount: () => void;
}

const Counter: React.FC<Quantity> = ({
  className,
  width = "100px",
  height = "50px",
  quantity,
  setQuantity,
  max,
  onIncrement = () => {},
  onDecrement = () => {},
}) => {
  // const [count, setCount] = useState(1);

  return (
    <div className="">
      <div
        className={`border border-[#000000] flex items-center justify-between p-[10px] relative ${className}`}
        style={{ width, height }}
      >
        <button
          className="text-[#979797]"
          onClick={() => {
            // onDecrement();
            // console.log("dercem");
            if (quantity > 1) onDecrement();
          }}
        >
          -
        </button>
        <div className="px-[3px] text-center">{quantity}</div>
        <button
          className="text-[#979797]"
          onClick={() => {
            // console.log("insidr cmnc");
            // if (quantity < max) {
            onIncrement();
            // }
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
