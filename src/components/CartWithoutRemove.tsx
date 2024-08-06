/* eslint-disable react/jsx-no-undef */
import { StaticImageData } from "next/image";
import React from "react";
import NextImage from "next/image";

interface CartProps {
  image: StaticImageData;
  text: string;
  size: string;
  quantity?: number;
  cost: string;
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Cart1: React.FC<CartProps> = ({
  image,
  text,
  size,
  cost,
  onRemove,
  onIncrement,
  onDecrement,
  quantity,
}) => {
  console.log({ quantity });

  // const [quantity, setQuantity] = useState(1);
  return (
    <div className="h-24">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <NextImage
            src={image}
            alt={"Image"}
            width={129}
            height={133}
            className="p-2 w-24 h-24"
          />
        </div>
        <div className="ml-4">
          <div className="">
            <div className="font-bold">{text}</div>
            <div className="">Size:{size}</div>
            <div className="flex">
              Quantity: {quantity}
              {/* <span>
                <Counter
                  className="w-[10px] h-[10px] ml-[2px]"
                  width="80px"
                  height="15px"
                  quantity={quantity as number}
                  // setQuantity={function (
                  //   value: React.SetStateAction<number>
                  // ): void {}}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}

                  // setQuantity={setQuantity}
                />
              </span> */}
            </div>
            <div className="font-bold flex justify-between">${cost}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart1;
