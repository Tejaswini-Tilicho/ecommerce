/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getProductsData } from "@/utils/interface";

interface Product {
  product_id: string;
  product_name: string;
  images: string[];
  description: string;
  available_sizes: string[];
  available_colours: string[];
  price: number;
  category: string;
  rating: number;
  quantity: number;
}

interface Shopping {
  items: getProductsData[];
}

const ShopItem: React.FC<Shopping> = ({ items }) => {
  const router = useRouter();

  const handleImageClick = (product: getProductsData) => {
    // console.log(product);
    router.push(`/home/${product.product_id}`);
  };

  return (
    <div className="w-full grid grid-cols-3 gap-[20px] break-all">
      {items.map((item, index) => (
        <div key={index} className="cursor-pointer">
          <Image
            className="w-[264px] h-[264px]"
            src={item.images[0]}
            width={264}
            height={264}
            alt={"not found"}
            onClick={() => handleImageClick(item)}
          />
          <div>
            <div className="inline-block shopItem">{item.product_name}</div>
            <div className="float-right">{item.sizes[0]}</div>
          </div>
          <div>{item.price}</div>
        </div>
      ))}
    </div>
  );
};

export default ShopItem;
