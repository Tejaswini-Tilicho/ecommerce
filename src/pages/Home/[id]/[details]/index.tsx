/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useCartContext } from "@/context/context";
import { useRouter } from "next/router";
import SingleDropdown from "@/components/SingleDropdown";
import MainButton from "@/components/Button";
import Carousel from "@/components/Carousel";
import Counter from "@/components/Quantity";
import { CartObject, ProductObject } from "@/api-classes/apis";
import useSWR from "swr";

const ProductInfo: React.FC = () => {
  const { state, dispatch } = useCartContext();
  const router = useRouter();

  const queryData = router.query;
  // console.log(state, "STATE");
  const [sizeLabel, setSizelabel] = useState<string | null>(
    queryData?.sizeLabel as string
  );

  const [count, setCount] = useState<number>(Number(queryData?.quantity));

  // console.log(queryData, "quregt", count);
  const fetcher = () => {
    return ProductObject.productDetails.handleProductDetails(
      queryData?.id as string
    );
  };

  const { data } = useSWR(`products/${queryData?.id}`, fetcher);

  const handleSizeChange = (size: { label: string; value: string }) => {
    setSizelabel(size?.label);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, size: size.value },
    });
  };

  const cartAdder = (
    id: any,
    quantity: number,
    queryData: any,
    dispatch: any
  ) => {
    let res: any = CartObject.addToCart.handleAddToCart(
      id,
      quantity,
      queryData,
      dispatch
    );
    return res;
  };

  const handleBuyNow = () => {
    router.push({
      pathname: "/checkout",
      query: {
        product_name: data?.product_name,
        size: sizeLabel,
        quantity: count,
        buyNow: true,
        product_id: data?.product_id,
      },
    });
    dispatch({
      type: "SINGLE_PRODUCT_DETAILS",
      payload: {
        quantity: count,
        price: data?.price,
        size: queryData?.size,
        product_id: data?.product_id,
        color_id: queryData?.color,
      },
    });
  };

  return (
    <div className="bg-[#EFF2F6] h-[100%]">
      <div className="ml-[110px] pt-[147px] pb-[204px] flex">
        <div className="w-[50%]">
          <Carousel images={data?.images} />
        </div>

        <div className="flex-col pl-[96px] w-[50%]">
          <div className="font-sans pr-1 font-semibold text-[36px]">
            {data?.product_name}
          </div>
          <div className="font-sans font-normal text-[24px] text-[#000000]">
            ${data?.price}
          </div>
          <div className="font-sans font-normal text-[18px] w-[357px] pt-[22px]">
            {data?.description}
          </div>
          <div className="flex pt-[15px] space-x-4">
            <Counter
              width="167px"
              height="50px"
              quantity={count}
              setQuantity={setCount}
              max={0}
              onIncrement={() => {
                if (count < data?.quantity) {
                  setCount(count + 1);
                }
              }}
              onDecrement={() => {
                if (count > 1) {
                  setCount(count - 1);
                }
              }}
            />

            <SingleDropdown
              className="w-[168px] h-[50px] text-[#000] pl-[16px] py-[12px]"
              options={
                data?.sizes.map((size: any) => ({
                  label: size.size_type,
                  value: size.size_id,
                })) ?? []
              }
              // placeholder={queryData?.sizeLabel as string}
              onChange={handleSizeChange}
              selectSize={queryData?.sizeLabel as string}
              value={queryData.size as string}
            />
          </div>
          <div className="pt-[16px] text-[#979797] font-inter font-normal text-[14px] w-[350px]">
            Height of model: 189 cm./6&#39;2&#34; Size 41
          </div>
          <div className="flex items-center pt-[23px] space-x-4">
            <MainButton
              className="bg-[#0D0D0D] text-[#FFFFFF] font-sans font-semibold text-[16px] flex items-center justify-center"
              buttonName={`Add to Cart - $${data?.price * count}`}
              onClick={() =>
                cartAdder(data?.product_id, count, queryData, dispatch)
              }
              width="198px"
              height="50px"
            />
            <MainButton
              className="bg-[#2F80ED] text-[#FFFFFF] font-sans font-semibold text-[16px] flex items-center justify-center"
              buttonName="Buy Now"
              onClick={handleBuyNow}
              width="139px"
              height="50px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
